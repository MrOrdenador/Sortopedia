import { connectDB } from "@/lib/mongoose"
import Algorithm from "@/models/Algorithm"
import type { IAlgorithm } from "@/models/Algorithm"
import AlgorithmCard from "@/components/ui/algorithm-card"
import Link from "next/link"

export default async function AlgorithmGrid() {
  await connectDB()

  const tierOrder = ["S", "A", "B", "C", "D"]
  const algorithmsUnsorted = await Algorithm.find().lean()
  const algorithms = algorithmsUnsorted.sort((a, b) => tierOrder.indexOf(a.info.tier) - tierOrder.indexOf(b.info.tier))

  return (
    <main className="overflow-x-hidden">
      <section className="bg-muted dark:bg-background py-24" >
        <div className="mx-auto max-w-xl space-y-6 text-center py-16">
          <h2 className="text-4xl font-semibold">Find the best algorithm for your project in our large codebase!</h2>
        </div>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithms.map((algorithm: IAlgorithm) => (
              <AlgorithmCard
                key={algorithm._id}
                title={algorithm.name}
                description={algorithm.description}
                link={`./${algorithm._id}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
