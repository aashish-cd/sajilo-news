import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="max-w-3xl mx-auto">
            {/* Article Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Article Title */}
                <Skeleton className="h-12 w-3/4 mb-4" />

                {/* Article Metadata */}
                <div className="flex items-center gap-2 text-muted-foreground mb-8">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                </div>

                {/* Article Content Paragraphs */}
                <div className="space-y-4 mb-8">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[98%]" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[92%]" />
                </div>

                {/* Social Share */}
                <div className="flex gap-2 mb-8">
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
    );
}
