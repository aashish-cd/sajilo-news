import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

type ArticleCardProps = {
  article: any;
};

export function ArticleCard({ article }: ArticleCardProps) {
  // const categoryLabel =
  //     article.category.charAt(0).toUpperCase() + article.category.slice(1);

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        {/* <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
        /> */}
      </div>
      <CardContent className="flex-1 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-2 py-0.5 capitalize">
            {article.category}
          </Badge>
          <div className="text-muted-foreground flex items-center text-sm">
            <CalendarIcon className="mr-1 h-3 w-3" />
            <time dateTime={article.publishedAt.$date}>
              {formatDate(article.publishedAt.$date)}
            </time>
          </div>
        </div>
        <h3 className="mb-2 line-clamp-2 text-xl font-bold">
          <Link href={`/article/${article._id.$oid}`}>{article.title}</Link>
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {article.content}
        </p>
      </CardContent>
      <CardFooter className="px-5 pt-0 pb-5">
        <Link
          href={`/article/${article._id.$oid}`}
          className="text-primary text-sm font-medium hover:underline"
        >
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
}
