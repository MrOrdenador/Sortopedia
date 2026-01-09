import { Header } from "./header"
import { connectDB } from "@/lib/mongoose"
import Algorithm from "@/models/Algorithm"
import { ChevronDown } from "lucide-react"
import StatsSection from "@/components/stats"

export default async function HeroSection() {
  await connectDB()
  const algorithmCount = await Algorithm.countDocuments()

  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <section className="relative flex min-h-screen flex-col items-center justify-center bg-muted dark:bg-background px-6">          <div className="text-center">
          <h1 className="text-balance text-4xl font-bold md:text-5xl lg:text-6xl xl:text-6xl">
            Sortopedia: <br>
            </br><span className="text-primary">The Encyclopedia of <u>Sorting Algorithms</u>!</span>
          </h1>

          <StatsSection></StatsSection>
        </div>

          <div className="absolute bottom-8 animate-pulse">
            <ChevronDown className="size-8 text-muted-foreground" />
          </div>
        </section>
      </main>
    </>
  )
}
