import React from "react";
import { getArticles } from "~/server/queries";
import AdminArticleList from "./admin-article-list";

const AdminPage = async () => {
  const articles = await getArticles();

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Article Management</h1>
      <AdminArticleList initialArticles={articles} />
    </div>
  );
};

export default AdminPage;
