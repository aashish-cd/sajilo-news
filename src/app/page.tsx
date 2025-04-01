import ArticleList from "@/components/article-list";
import { CategoryFilter } from "@/components/category-filter";
import { articles } from "~/lib/utils";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Latest News</h1>
      <CategoryFilter />
      <ArticleList articles={articles} />
    </div>
  );
}
