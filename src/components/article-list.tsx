import { ArticleCard } from "./article-card";
import type { Article } from "~/server/db/types";

const ArticleList = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article: any) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
