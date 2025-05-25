"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Dialog, DialogContent } from "~/components/ui/dialog";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent className="h-full min-w-[90vw] overflow-y-scroll">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
