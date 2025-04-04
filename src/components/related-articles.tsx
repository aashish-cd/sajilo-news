import Image from "next/image";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getRelatedArticles } from "~/server/queries";

export async function RelatedArticles({ id }: { id: string }) {
  const relatedArticles = await getRelatedArticles(id);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {relatedArticles.map((article) => (
        <div key={article.slug} className="group">
          <Link href={`/article/${article.slug}`} className="block">
            <div className="relative mb-3 aspect-video overflow-hidden rounded-lg">
              <Image
                src={article.coverImage || "/placeholder.svg"}
                alt={article.title}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                fill
              />
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-2 py-0.5">
                {article.category ?? "News"}
              </Badge>
              <div className="text-muted-foreground flex items-center text-sm">
                <CalendarIcon className="mr-1 h-3 w-3" />
                <time dateTime={article.createdAt.toDateString()}>
                  {formatDate(article.createdAt.toDateString())}
                </time>
              </div>
            </div>
            <h3 className="group-hover:text-primary line-clamp-2 font-semibold transition-colors">
              {article.title}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
