import { Suspense } from "react";
import AlgorithmDetail from "@/components/algorithm-detail";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AlgorithmDetailSkeleton() {
  return (
    <main className="min-h-screen bg-muted/30 dark:bg-background">
      <section className="border-b bg-background pt-30 pb-15">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-3">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-full max-w-2xl" />
            <Skeleton className="h-6 w-48" />
            <div className="mt-4">
              <Skeleton className="h-3 w-12 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card className="self-start">
            <CardHeader>
              <CardTitle className="text-base">Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <div className="grid grid-cols-3 gap-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="h-px bg-border" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Implementations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-24" />
                </div>
                <Skeleton className="h-64 w-full rounded-md" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default function AlgorithmInfo({
  params,
}: PageProps<"/algorithms/[id]">) {
  return (
    <Suspense fallback={<AlgorithmDetailSkeleton />}>
      <AlgorithmDetail params={params} />
    </Suspense>
  );
}
