import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import { connectDB } from "@/lib/mongoose"
import Algorithm from "@/models/Algorithm"
import { notFound } from "next/navigation"
import { Impls } from "@/components/impls"

interface AlgorithmProps {
  params: { id: string }
}

export default async function AlgorithmInfo({ params }: AlgorithmProps) {
  const { id } = await params

  await connectDB()
  const algorithm = await Algorithm.findById(id).lean()
  if (!algorithm) return notFound()

  return (
    <>
      <Header />

      <main className="min-h-screen bg-muted/30 dark:bg-background">
        <section className="border-b bg-background pt-30 pb-15">
          <div className="mx-auto max-w-5xl px-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold md:text-4xl">{algorithm.name}</h1>
              <p className="max-w-2xl text-lg text-muted-foreground">{algorithm.description}</p>
              <p className="text-sm text-muted-foreground capitalize">
                Paradigm: <u className="text-lg">{algorithm.stats.paradigm}</u>
              </p>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">Author</p>
                <p className="text-sm font-medium">{algorithm.info.createdBy}</p>
              </div>



            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-5xl px-6 grid gap-6 grid-cols-3">
            <Card className="self-start">
              <CardHeader>
                <CardTitle className="text-base">Stats</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Tier</p>
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
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Time Complexity</p>
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
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Space</p>
                  <code className="text-xs">{algorithm.stats?.spaceComplexity}</code>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Properties</p>
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

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Implementations</CardTitle>
              </CardHeader>
              <CardContent>
                <Impls
                  implementations={(algorithm.code || []).map((c: { language: string; code: string }) => ({
                    language: c.language,
                    code: c.code,
                  }))}
                />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  )
}
