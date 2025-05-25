import React from "react";
import Modal from "./(.)article/[slug]/modal";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Modal>{children}</Modal>;
};

export default layout;
