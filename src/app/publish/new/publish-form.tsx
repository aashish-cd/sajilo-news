"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Form from "next/form";
import ReactMarkdown from "react-markdown";

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
import { ImageIcon, Loader2, Save } from "lucide-react";

const PublishForm = () => {
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { user, isLoaded } = useUser();

  console.log("user", user);

  // Mock categories for demo purposes
  const categories = [
    { id: "article", name: "Article" },
    { id: "news", name: "News" },
  ];

  return (
    <Form
      action={async (e) => {
        "server only";
        console.log("action from server", e.get("featured"));
        await createArticle({
          coverImage,
          authorId: user?.id,
          author: user?.fullName,
          title: e.get("title"),
          excerpt: e.get("excerpt"),
          category: e.get("category"),
          featured: e.get("featured") ?? false,
          content,
          // TODO: add images
        });
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
              <Label htmlFor="title">Title</Label>
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
              <Select name="category">
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
                <Switch id="featured" name="featured" />
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
