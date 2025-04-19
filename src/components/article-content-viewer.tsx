import React from "react";
import Markdown from "react-markdown";

const ArticleContentViewer = ({ content }: { content: string }) => {
  return (
    <div className="prose lg:prose-xl">
      <Markdown>{content}</Markdown>
    </div>
  );
};

export default ArticleContentViewer;
