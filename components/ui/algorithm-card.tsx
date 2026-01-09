import { Button } from "@/components/ui/button"
import { MagicCard } from "@/components/ui/shine"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface AlgorithmCardParams {
  title: string
  description: string
  link: string
}

export default function AlgorithmCard({
  title,
  description,
  link,
}: AlgorithmCardParams) {
  return (
    <MagicCard className="p-4 card">
      <div className="relative">
        <div className="space-y-2 py-2">
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {description}
          </p>
        </div>

        <div className="flex gap-3 border-t border-dashed pt-6">
          <Button asChild variant="outline" size="sm" className="gap-1 pr-2 shadow-none">
            <Link href={link}>
              Learn More
              <ChevronRight className="ml-0 size-3.5 opacity-50" />
            </Link>
          </Button>
        </div>
      </div>
    </MagicCard>
  )
}
