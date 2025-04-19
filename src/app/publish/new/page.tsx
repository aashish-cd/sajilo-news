import type React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import PublishForm from "./publish-form";

export default function NewArticle() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Create New Article
        </h1>
      </div>
      <PublishForm />
    </div>
  );
}
