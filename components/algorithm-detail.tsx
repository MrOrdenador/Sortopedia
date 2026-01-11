import { connection } from "next/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { connectDB } from "@/lib/mongoose";
import Algorithm from "@/models/Algorithm";
import { notFound } from "next/navigation";
import { Impls } from "@/components/impls";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function AlgorithmDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connection();
  await connectDB();

  const algorithm = await Algorithm.findById(id).lean();
  if (!algorithm) return notFound();

  return (
    <main className="min-h-screen">
      <section className="border-b bg-background pt-30 pb-15">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="size-6 md:size-8" />
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold md:text-5xl">
                {algorithm.name}
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
                {algorithm.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8 pb-2">
              <div className="flex flex-col gap-1 font-medium">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Paradigm
                </p>
                <p className="text-lg capitalize">{algorithm.stats.paradigm}</p>
              </div>

              <div className="flex flex-col gap-1 font-medium">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Author
                </p>
                <p className="text-lg">{algorithm.info.createdBy}</p>
              </div>

              <div className="flex flex-col gap-1 items-center font-medium">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Tier
                </p>
                <span className="inline-flex items-center justify-center size-10 text-lg font-bold rounded-full border-2 border-primary/20 bg-primary/5">
                  {algorithm.info.tier}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card className="self-start">
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <div className="space-y-2 font-medium">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Tier
                </p>
                <span
                  className="
                    inline-flex items-center justify-center 
                    w-9 h-9 text-sm font-bold 
                    rounded-full border
                    "
                >
                  {algorithm.info.tier}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Time Complexity
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Best</p>
                    {algorithm.stats?.timeComplexity?.best}
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Avg</p>
                    {algorithm.stats?.timeComplexity?.average}
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Worst</p>
                    {algorithm.stats?.timeComplexity?.worst}
                  </div>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex justify-between items-center">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Space
                </p>
                <code className="text-xs">
                  {algorithm.stats?.spaceComplexity}
                </code>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Properties
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <div className="flex items-center gap-1.5">
                    {algorithm.stats?.stable ? (
                      <CheckCircle2 className="size-3.5 text-emerald-500" />
                    ) : (
                      <XCircle className="size-3.5 text-muted-foreground/50" />
                    )}
                    <span className="text-xs">Stable</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {algorithm.stats?.inPlace ? (
                      <CheckCircle2 className="size-3.5 text-emerald-500" />
                    ) : (
                      <XCircle className="size-3.5 text-muted-foreground/50" />
                    )}
                    <span className="text-xs">In-Place</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {algorithm.stats?.adaptive ? (
                      <CheckCircle2 className="size-3.5 text-emerald-500" />
                    ) : (
                      <XCircle className="size-3.5 text-muted-foreground/50" />
                    )}
                    <span className="text-xs">Adaptive</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Implementations</CardTitle>
            </CardHeader>
            <CardContent>
              <Impls
                implementations={(algorithm.code || []).map(
                  (c: { language: string; code: string }) => ({
                    language: c.language,
                    code: c.code,
                  })
                )}
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
