"use client";

import { useState, useOptimistic, startTransition } from "react";
import { deleteArticle } from "~/server/actions";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import type { Article } from "~/server/db/types";

export default function ArticleList({
  initialArticles,
}: {
  initialArticles: Article[];
}) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [open, setOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  // Optimistic UI update
  const [optimisticArticles, addOptimisticArticle] = useOptimistic(
    articles,
    (state, articleIdToRemove: number) =>
      state.filter((article) => article.id !== articleIdToRemove),
  );

  const handleDeleteClick = (article: Article) => {
    setArticleToDelete(article);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!articleToDelete) return;

    // Apply optimistic update
    startTransition(() => {
      addOptimisticArticle(articleToDelete.id);
    });

    try {
      // Call server action to delete the article
      await deleteArticle(articleToDelete.id);

      // Update local state after successful deletion
      setArticles((prev) =>
        prev.filter((article) => article.id !== articleToDelete.id),
      );
    } catch (error) {
      // If there's an error, revert to the actual state
      console.error("Failed to delete article:", error);
      setArticles(initialArticles);
    } finally {
      setOpen(false);
      setArticleToDelete(null);
    }
  };

  return (
    <div>
      {optimisticArticles.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No articles found. Create some articles to get started.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {optimisticArticles.map((article) => (
              <li
                key={article.id}
                className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="text-lg font-medium">{article.title}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteClick(article)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              article &quot;{articleToDelete?.title}
              &quot; and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
