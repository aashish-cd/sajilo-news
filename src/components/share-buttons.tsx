"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const ShareButtons = ({ url, title }: { url: string; title: string }) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;
  console.log("fullUrl", fullUrl);
  return (
    <div className="flex items-center gap-2">
      <FacebookShareButton url={fullUrl} title={title}>
        <p className="h-10 w-10 rounded-full">
          <Facebook className="h-5 w-5" />
          <span className="sr-only">Share on Facebook</span>
        </p>
      </FacebookShareButton>

      <TwitterShareButton url={fullUrl} title={title}>
        <p className="h-10 w-10 rounded-full">
          <Twitter className="h-5 w-5" />
          <span className="sr-only">Share on Twitter</span>
        </p>
      </TwitterShareButton>

      <LinkedinShareButton url={fullUrl} title={title}>
        <p className="h-10 w-10 rounded-full">
          <Linkedin className="h-5 w-5" />
          <span className="sr-only">Share on LinkedIn</span>
        </p>
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;
