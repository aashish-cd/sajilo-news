import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="bg-muted mb-8 flex h-24 w-24 items-center justify-center rounded-full">
        <FileQuestion className="text-muted-foreground h-12 w-12" />
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        No Article Found
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        We couldn't find the article you were looking for. It might have been
        removed, renamed, or is temporarily unavailable.
      </p>
      <Button asChild variant="default" size="lg" className="gap-2">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Articles</span>
        </Link>
      </Button>
    </div>
  );
}
