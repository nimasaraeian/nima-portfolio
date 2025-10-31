import PaperCard from "@/components/research/PaperCard";
import { getAllPapers } from "@/lib/papers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research & Publications – Nima Saraeian",
  description: "Working papers, preprints, and publications by Nima Saraeian.",
};

export default function ResearchPage() {
  const papers = getAllPapers();
  const counts = {
    all: papers.length,
    published: papers.filter((p) => p.type === "published").length,
    preprint: papers.filter((p) => p.type === "preprint").length,
    working: papers.filter((p) => p.type === "working").length,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          Research & Publications
        </h1>
        <p
          className="text-lg text-gray-400 mb-8"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          My research focuses on AI-based modeling of the consumer mind — decoding
          cognitive and aesthetic patterns to predict digital behavior. Working papers
          and preprints are shared here for feedback.
        </p>

        <div
          className="mt-6 flex flex-wrap gap-4 text-sm text-gray-400 mb-8"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          <span>All: {counts.all}</span>
          <span>Published: {counts.published}</span>
          <span>Preprints: {counts.preprint}</span>
          <span>Working: {counts.working}</span>
        </div>

        {papers.length === 0 ? (
          <div
            className="text-center py-12 text-gray-500"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            <p>No papers available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6">
            {papers.map((p) => (
              <PaperCard key={p.slug} {...p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
