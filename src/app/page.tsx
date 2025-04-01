import ArticleList from "@/components/article-list";
import { CategoryFilter } from "@/components/category-filter";
import { db } from "~/server/db";

export default async function Home() {
  const articles = await db.query.articles.findMany();
  console.log("articles", articles);
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Latest News</h1>
      <CategoryFilter />
      <ArticleList articles={articles} />
    </div>
  );
}
