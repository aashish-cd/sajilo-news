import { CalendarIcon, Clock, UserIcon } from "lucide-react";
import readingTime from "reading-time";
import Image from "next/image";
import { unstable_cache } from "next/cache";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RelatedArticles } from "@/components/related-articles";
import { ReadingProgressBar } from "@/components/reading-progress-bar";
import ShareButtons from "@/components/share-buttons";
import { formatDate } from "@/lib/utils";
import { getArticleById } from "~/server/queries";
import ArticleContentViewer from "~/components/article-content-viewer";
import NotFound from "~/app/not-found";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const id = Number(slug);

  if (isNaN(id)) {
    return <NotFound />;
  }

  const article = await unstable_cache(
    async () => await getArticleById(id),
    [`${id}`],
  )();

  if (!article) {
    return <NotFound />;
  }

  return (
    <>
      <ReadingProgressBar />
      <main className="bg-background min-h-screen">
        <article className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
          {/* Article Header */}
          <header className="mb-8 md:mb-12">
            <div className="mb-4 flex items-center gap-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-2 py-0.5 capitalize">
                {article.category ?? "News"}
              </Badge>
              <div className="text-muted-foreground flex items-center text-sm">
                <CalendarIcon className="mr-1 h-3 w-3" />
                <time dateTime="2023-04-01">
                  {formatDate(new Date(article.createdAt).toDateString())}
                </time>
              </div>
              <div className="text-muted-foreground flex items-center text-sm">
                <Clock className="mr-1 h-3 w-3" />
                <span>{readingTime(article.content).text}</span>
              </div>
              <div className="text-muted-foreground flex items-center text-sm">
                <UserIcon className="mr-1 h-3 w-3" />
                <span>{article.author}</span>
              </div>
            </div>

            <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <ShareButtons
              url={`/article/${article.id}`}
              title={article.title}
            />
            <Separator className="my-8" />
            <p className="text-muted-foreground mb-6 text-xl">
              {article.excerpt}
            </p>
          </header>
          {article.coverImage && (
            <Image
              src={article.coverImage}
              alt={article.title}
              className="object-cover p-4 transition-transform duration-300 group-hover:scale-105"
              height={800}
              width={800}
            />
          )}

          {/* Article Content */}
          <ArticleContentViewer content={article.content} />
          {/* Article Footer */}
          <footer className="mt-8 md:mt-12">
            <Separator className="mb-8" />

            {/* Social Sharing */}
            <ShareButtons
              url={`/article/${article.id}`}
              title={article.title}
            />
            <Separator className="my-8" />

            {/* Related Articles */}
            <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
            <RelatedArticles title={article.title} />
          </footer>
        </article>
      </main>
    </>
  );
}
