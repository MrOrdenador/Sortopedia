import HeroSection from "@/components/hero-section"
import AlgorithmGrid from "@/components/algorithm-grid"

const tierColors: Record<string, string> = {
  S: "bg-red-600",
  A: "bg-orange-500",
  B: "bg-yellow-400",
  C: "bg-yellow-200",
  D: "bg-green-300",
}

export default async function Home() {


  return (
    <>
      <HeroSection></HeroSection>
      <AlgorithmGrid></AlgorithmGrid>
    </>
  )
}
