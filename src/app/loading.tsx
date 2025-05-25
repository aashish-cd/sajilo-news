import React from "react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const loading = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(10)].map((_, i) => (
          <Card className="group flex h-full flex-col overflow-hidden">
            <Skeleton className="relative aspect-video overflow-hidden" />

            <Skeleton className="w-full object-cover transition-transform duration-300 group-hover:scale-105" />

            <CardContent className="flex- p-5">
              <Skeleton className="bg-primary/10 text-primary hover:bg-primary/20 w-full px-2 py-0.5 capitalize" />
              <Skeleton className="text-muted-foreground mb-2 line-clamp-3 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default loading;
