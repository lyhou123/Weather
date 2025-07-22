import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const LoadingCard: React.FC = () => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          <div className="h-12 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export const LoadingGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
};
