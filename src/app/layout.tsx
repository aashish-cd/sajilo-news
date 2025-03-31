import { type ReactNode } from "react";
import { type Metadata } from "next";

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Sajilo News",
  description: "A news website built with Next.js",
};
