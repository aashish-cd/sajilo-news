"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Search, Menu, X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Sajilo <span className="text-primary"> Articles</span>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Search and Auth */}
          <div className="hidden items-center space-x-4 md:flex">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[200px] pl-9 lg:w-[300px]"
              />
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-full"
              >
                <span className="sr-only">Search</span>
              </Button>
            </form>
            <SignedIn>
              <UserButton />
              <Link className={buttonVariants()} href={`/publish/new`}>
                Publish
              </Link>
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-4 space-x-4">
                <SignInButton />
                <SignUpButton />
              </div>
            </SignedOut>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="pt-4 pb-2 md:hidden">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9"
              />
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-full"
              >
                <span className="sr-only">Search</span>
              </Button>
            </form>

            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-4 space-x-2">
                <SignInButton />
                <SignUpButton />
              </div>
            </SignedOut>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
