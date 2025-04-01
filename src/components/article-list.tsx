import { ArticleCard } from "./article-card";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article: any) => (
        <ArticleCard key={article.title} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
