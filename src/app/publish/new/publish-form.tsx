"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Form from "next/form";

import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Switch } from "~/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import RichTextEditor from "~/components/rich-text-editor";
import { UploadButton } from "~/utils/uploadthing";
import { createArticle } from "~/server/actions";
import { ImageIcon, Save } from "lucide-react";

const PublishForm = () => {
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  // Mock categories for demo purposes
  const categories = [
    { id: "article", name: "Article" },
    { id: "news", name: "News" },
  ];

  return (
    <Form
      action={async (e) => {
        "server only";
        const title = e.get("title");
        const excerpt = e.get("excerpt");
        const category = e.get("category");
        if (!title?.toString().trim() || !content.trim()) {
          toast.error("Validation Error", {
            description: "Please fill in all required fields",
          });
          return;
        }
        try {
          setIsSubmitting(true);
          await createArticle({
            coverImage,
            author: user?.fullName,
            title,
            excerpt,
            category,
            featured: e.get("featured") ?? false,
            content,
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
              error instanceof Error
                ? error.message
                : "Failed to create article",
          });
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
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
              <Label htmlFor="title">
                Title
                <span className="text-xs text-red-500">* required</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter article title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                placeholder="Brief summary of the article (optional)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={categories[0]?.name}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name}>
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
                  <img src={coverImage} alt="Cover Image" className="h-36" />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              <div className="flex items-center space-x-2">
                <Switch id="featured" name="featured" />
                <Label htmlFor="featured">Featured article</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Article Content{" "}
              <span className="text-xs text-red-500">* required</span>
            </CardTitle>
            <CardDescription>
              Write and format your article content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RichTextEditor onChange={setContent} />
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
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Publish
        </Button>
      </div>
    </Form>
  );
};

export default PublishForm;
