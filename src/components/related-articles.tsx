import Image from "next/image";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getRelatedArticles } from "~/server/queries";
import { ArticleCard } from "./article-card";

export async function RelatedArticles({ title }: { title: string }) {
  const relatedArticles = await getRelatedArticles(title);

  if (!relatedArticles.length) {
    return (
      <div className="text-center">
        <h2 className="mb-6 text-2xl font-bold">No Related Articles Found</h2>
        <p className="text-muted-foreground mb-8">
          We couldn't find any articles related to this one.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {relatedArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
