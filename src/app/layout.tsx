import { type ReactNode } from "react";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar";

import "@/styles/globals.css";

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <Navbar />
          <main>{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Sajilo News",
  description: "A news website built with Next.js",
};
