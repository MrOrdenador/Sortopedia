import { connection } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Algorithm from "@/models/Algorithm";

export default async function StatsSection() {
  await connection();
  await connectDB();

  const algorithmlength = await Algorithm.countDocuments();
  const languages = await Algorithm.distinct("code.language");
  const languageCount = languages.length;

  const githubRepoData = await fetch(
    "https://api.github.com/repos/MrOrdenador/Sortopedia",
    {
      next: { revalidate: 3600 },
    }
  );

  const parsedData = await githubRepoData.json();
  const starsOnGitHub = parsedData.stargazers_count;

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          <div className="space-y-4">
            <div className="text-4xl md:text-5xl font-bold">
              +{starsOnGitHub ?? "?"}
            </div>
            <p>Stars on GitHub</p>
          </div>

          <div className="space-y-4">
            <div className="text-4xl md:text-5xl font-bold">
              {algorithmlength}
            </div>
            <p>Different sorting algorithms</p>
          </div>

          <div className="space-y-4">
            <div className="text-4xl md:text-5xl font-bold">
              +{languageCount}
            </div>
            <p className="text-center">different programming languages</p>
          </div>
        </div>
      </div>
    </section>
  );
}
