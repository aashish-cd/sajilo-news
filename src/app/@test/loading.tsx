import { Skeleton } from "@/components/ui/skeleton";
import Modal from "./(.)article/[slug]/modal";

export default function Loading() {
  return (
    <Modal>
      <div className="mx-auto w-full">
        {/* Article Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Article Title */}
          <Skeleton className="mb-4 h-12 w-3/4" />

          {/* Article Metadata */}
          <div className="text-muted-foreground mb-8 flex items-center gap-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Article Content Paragraphs */}
          <div className="mb-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[98%]" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[92%]" />
          </div>

          {/* Social Share */}
          <div className="mb-8 flex gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-full" />
            ))}
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-10 w-32" />
          </div>
        </main>
      </div>
    </Modal>
  );
}
