"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent className="h-3/4 w-full min-w-[80vw] overflow-y-scroll">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
