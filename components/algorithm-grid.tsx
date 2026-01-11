import { connection } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Algorithm from "@/models/Algorithm";
import type { IAlgorithm } from "@/models/Algorithm";
import AlgorithmCard from "@/components/ui/algorithm-card";

export default async function AlgorithmGrid() {
  await connection();
  await connectDB();

  const tierOrder = ["S", "A", "B", "C", "D"];
  const algorithmsUnsorted = await Algorithm.find().lean();
  const algorithms = algorithmsUnsorted.sort(
    (a, b) => tierOrder.indexOf(a.info.tier) - tierOrder.indexOf(b.info.tier)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {algorithms.map((algorithm: IAlgorithm) => (
        <AlgorithmCard
          key={algorithm._id}
          title={algorithm.name}
          description={algorithm.description}
          link={`/algorithms/${algorithm._id}`}
        />
      ))}
    </div>
  );
}
