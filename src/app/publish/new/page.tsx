"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Loader2, ImageIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import RichTextEditor from "@/components/rich-text-editor";
import { slugify } from "@/lib/utils";
import { createArticle } from "~/server/actions";
import { UploadButton, UploadDropzone } from "~/utils/uploadthing";

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user, isLoaded } = useUser();

  // Mock categories for demo purposes
  const categories = [
    { id: "technology", name: "Technology" },
    { id: "business", name: "Business" },
    { id: "health", name: "Health" },
    { id: "science", name: "Science" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields",
      });
      return;
    }

    if (!isLoaded || !user) {
      toast.error("Authentication Error", {
        description: "You must be logged in to create an article",
      });
      router.push("/sign-in");
      return;
    }

    setIsSubmitting(true);

    try {
      const slug = slugify(title);

      await createArticle({
        title,
        slug,
        content,
        excerpt: excerpt || title.substring(0, 150),
        coverImage,
        published,
        featured,
        category,
        authorId: user.id,
      });

      toast.success("Success", {
        description: "Article created successfully",
      });

      router.push("/");
      router.refresh();
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
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Create New Article
        </h1>
      </div>

      <div>
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
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of the article (optional)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Upload Cover</Label>
                <div className="flex gap-2">
                  <UploadButton
                    endpoint={"imageUploader"}
                    onClientUploadComplete={(res) => {
                      const ufsUrl = res[0]?.ufsUrl;
                      setCoverImage(ufsUrl!);
                    }}
                  />

                  {coverImage && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(coverImage, "_blank")}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={published}
                    onCheckedChange={setPublished}
                  />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                  <Label htmlFor="featured">Featured article</Label>
                </div>
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
              <RichTextEditor initialContent={content} onChange={setContent} />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/articles")}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {published ? "Publish" : "Save Draft"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
