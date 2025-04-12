import parse from "html-react-parser";
import React from "react";

const ArticleContentViewer = ({ content }: { content: string }) => {
  return <>{parse(content)}</>;
};

export default ArticleContentViewer;
