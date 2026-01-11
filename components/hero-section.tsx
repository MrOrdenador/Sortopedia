import { Suspense } from "react";
import { ChevronDown } from "lucide-react";
import StatsSection from "@/components/stats";
import { Skeleton } from "./ui/skeleton";

function StatsSectionSkeleton() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          <div className="space-y-4">
            <Skeleton className="h-12 w-24 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-12 w-16 mx-auto" />
            <Skeleton className="h-4 w-44 mx-auto" />
          </div>

          <div className="flex flex-col items-center space-y-2 relative">
            <Skeleton className="h-4 w-24 absolute -top-5" />
            <Skeleton className="h-12 w-12 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-muted dark:bg-background px-6">
      <div className="text-center mx-auto max-w-4xl mt-8">
        <h1 className="text-balance text-4xl font-bold md:text-5xl lg:text-6xl xl:text-6xl">
          <span className="text-primary">
            The Encyclopedia of <u>Sorting Algorithms</u>
          </span>
        </h1>

        <Suspense fallback={<StatsSectionSkeleton />}>
          <StatsSection />
        </Suspense>
      </div>
      <div className="absolute bottom-8 animate-pulse">
        <ChevronDown className="size-8 text-muted-foreground" />
      </div>
    </section>
  );
}
