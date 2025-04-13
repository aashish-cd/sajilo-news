import { type ReactNode } from "react";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Lexend } from "next/font/google";

import "@/styles/globals.css";

import Navbar from "@/components/navbar";
import { Toaster } from "~/components/ui/sonner";
import Footer from "~/components/footer";

type LayoutProps = {
  children: ReactNode;
};

const inter = Lexend({ subsets: ["latin"] });

export default function RootLayout({ children }: LayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

export const metadata: Metadata = {
  title: "Sajilo News",
  description: "A news website built with Next.js",
};
