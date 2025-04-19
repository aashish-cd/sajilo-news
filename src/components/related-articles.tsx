import Image from "next/image";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getRelatedArticles } from "~/server/queries";
import { ArticleCard } from "./article-card";

export async function RelatedArticles({ title }: { title: string }) {
  const relatedArticles = await getRelatedArticles(title);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {relatedArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
