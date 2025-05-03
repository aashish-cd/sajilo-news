"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const ShareButtons = ({ url, title }: { url: string; title: string }) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;

  return (
    <div className="flex items-center gap-4 p-4">
      <p className="text-2xl italic">SHARE: </p>
      <FacebookShareButton url={fullUrl} title={title}>
        <p className="rounded-full">
          <Facebook className="size-10 rounded-full p-2 transition-all duration-500 hover:bg-gray-200" />
          <span className="sr-only">Share on Facebook</span>
        </p>
      </FacebookShareButton>

      <TwitterShareButton url={fullUrl} title={title}>
        <p className="rounded-full">
          <Twitter className="size-10 rounded-full p-2 transition-all duration-500 hover:bg-gray-200" />
          <span className="sr-only">Share on Twitter</span>
        </p>
      </TwitterShareButton>

      <LinkedinShareButton url={fullUrl} title={title}>
        <p className="rounded-full">
          <Linkedin className="size-10 rounded-full p-2 transition-all duration-500 hover:bg-gray-200" />
          <span className="sr-only">Share on LinkedIn</span>
        </p>
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;
