import ArticleList from "@/components/article-list";

import { searchArticles } from "~/server/queries";
import NotFoundPage from "./not-found";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string; page?: string }>;
}) {
  const { q: query } = await searchParams;

  const articles = await searchArticles(query);

  if (articles.length === 0) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Search Results for <b>{query}</b>
      </h1>
      <ArticleList articles={articles} />
    </div>
  );
}
