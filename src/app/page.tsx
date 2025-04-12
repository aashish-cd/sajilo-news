import ArticleList from "@/components/article-list";
import { getArticles } from "~/server/queries";

export const revalidate = 60;

export default async function Home() {
  const articles = await getArticles();
  return (
    <div>
      <ArticleList articles={articles} />
    </div>
  );
}
