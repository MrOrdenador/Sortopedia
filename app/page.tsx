import { Suspense } from "react";
import HeroSection from "@/components/hero-section";
import AlgorithmGrid from "@/components/algorithm-grid";
import { Skeleton } from "@/components/ui/skeleton";

const AlgorithmGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-4 rounded-lg border bg-card">
          <div className="relative">
            <div className="space-y-2 py-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="flex gap-3 border-t border-dashed pt-6">
              <Skeleton className="h-8 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="bg-muted dark:bg-background py-24">
        <div className="mx-auto max-w-xl space-y-6 text-center py-16">
          <h2 className="text-4xl font-semibold">
            Find the best algorithm for your project
          </h2>
        </div>
        <div className="mx-auto max-w-5xl px-6">
          <Suspense fallback={<AlgorithmGridSkeleton />}>
            <AlgorithmGrid />
          </Suspense>
        </div>
      </section>
    </>
  );
}
