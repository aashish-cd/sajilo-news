import ArticleList from "@/components/article-list";
import { CategoryFilter } from "@/components/category-filter";
import ImageTest from "~/components/test";
import { articles } from "~/lib/utils";
import { db } from "~/server/db";
import { UploadButton } from "~/utils/uploadthing";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const articles = await db.query.articles.findMany();
  console.log("articles", articles);
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Latest News</h1>
      <CategoryFilter />
      <ArticleList articles={articles} />
      {/* <UploadButton endpoint={"imageUploader"} /> */}
      <ImageTest />
    </div>
  );
}
