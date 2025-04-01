import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";

import { articles, formatDate } from "@/lib/utils";

export async function RelatedArticles({ id }: { id: string }) {
  const relatedArticles = articles;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {relatedArticles.map((article) => (
        <div key={article._id.$oid} className="group">
          <Link href={`/article/${article._id}`} className="block">
            <div className="relative mb-3 aspect-video overflow-hidden rounded-lg">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                fill
              />
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-2 py-0.5">
                {article.category.charAt(0).toUpperCase() +
                  article.category.slice(1)}
              </Badge>
              <div className="text-muted-foreground flex items-center text-sm">
                <CalendarIcon className="mr-1 h-3 w-3" />
                <time dateTime={article.publishedAt.$date}>
                  {formatDate(article.publishedAt.$date)}
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
