"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
// import { RichTextEditor } from "@/components/admin/rich-text-editor";
// import { ArticlePreview } from "@/components/admin/article-preview";
import { toast } from "sonner";
import { UploadButton } from "~/utils/uploadthing";

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories] = useState<{ _id: string; name: string }[]>([]);
  const [featuredImage, setFeaturedImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading] = useState(true);
  const router = useRouter();

  // Fetch categories on component mount
  // useEffect(() => {
  //     const fetchCategories = async () => {
  //         try {
  //             const response = await fetch('/api/admin/categories');
  //             if (response.ok) {
  //                 const data = await response.json();
  //                 setCategories(data);
  //             }
  //         } catch (error) {
  //             console.error('Failed to fetch categories:', error);
  //             toast({
  //                 title: 'Error',
  //                 description: 'Failed to load categories',
  //                 variant: 'destructive',
  //             });
  //         } finally {
  //             setIsLoading(false);
  //         }
  //     };

  //     // Simulate fetching categories
  //     setTimeout(() => {
  //         setCategories([
  //             { _id: '1', name: 'Technology' },
  //             { _id: '2', name: 'Health' },
  //             { _id: '3', name: 'Business' },
  //             { _id: '4', name: 'Science' },
  //             { _id: '5', name: 'Politics' },
  //             { _id: '6', name: 'Entertainment' },
  //         ]);
  //         setIsLoading(false);
  //     }, 500);
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields",
      });
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Authentication Error", {
        description: "You must be logged in to create an article",
      });
      router.push("/login");
      return;
    }

    try {
      // In a real app, you would get the author ID from your auth system
      const authorId = "current-user-id";

      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          category,
          featuredImage,
          authorId,
        }),
      });

      if (response.ok) {
        toast.success("Success", {
          description: "Article created successfully",
        });
        router.push("/admin");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create article");
      }
    } catch (error) {
      console.error("Failed to create article:", error);
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to create article",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Create New Article
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Details</CardTitle>
              <CardDescription>
                Enter the basic information for your article
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={setCategory}
                  disabled={isLoading}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Featured Image</Label>
                <UploadButton
                  endpoint={"imageUploader"}
                  //   onClientUploadComplete={setFeaturedImage}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
              <CardDescription>
                Write and format your article content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-2">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                {/* <TabsContent value="editor">
                  <RichTextEditor value={content} onChange={setContent} />
                </TabsContent>
                <TabsContent value="preview">
                  <ArticlePreview
                    title={title}
                    content={content}
                    category={category}
                    featuredImage={featuredImage}
                  />
                </TabsContent> */}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/admin")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Publish Article
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
