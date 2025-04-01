import { cn } from "@/lib/utils";
import Link from "next/link";

const categories = [
  { name: "All", slug: "all" },
  { name: "Technology", slug: "technology" },
  { name: "Health", slug: "health" },
  { name: "Business", slug: "business" },
  { name: "Science", slug: "science" },
  { name: "Politics", slug: "politics" },
  { name: "Entertainment", slug: "entertainment" },
];

export async function CategoryFilter({
  activeCategory = "All",
}: {
  activeCategory?: string;
}) {
  // const categories = await getCategories();

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex space-x-2 pb-2">
        {[...categories].map((category) => (
          <Link
            href={`/category/${category.slug}`}
            key={category.slug}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap capitalize transition-colors",
              activeCategory === category.slug
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80",
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
