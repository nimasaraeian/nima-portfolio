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
  const lastUpdated = papers
    .map((p) => p.last_updated)
    .filter(Boolean)
    .sort()
    .slice(-1)[0];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Research & Publications</h1>
      <p className="mt-2 text-muted-foreground">
        AI Psychology · Aesthetics · Consumer Behavior
      </p>

      {/* Research Focus */}
      <section className="mt-6 rounded-2xl border p-5">
        <h2 className="text-xl font-semibold">Research Focus</h2>
        <p className="mt-2 text-sm leading-7">
          My PhD-oriented research agenda centers on building an AI-psychometric framework that connects
          cognitive (<em>Selphlyze</em>), aesthetic (<em>Aesthlyzer</em>), and behavioral (<em>Contlyze</em>) layers to explain and predict
          digital consumer decisions using public, anonymized datasets.
        </p>
        <div className="mt-3 text-xs text-muted-foreground">
          {lastUpdated ? <>Last updated: {lastUpdated}</> : null}
        </div>
      </section>

      {/* Counters */}
      <div className="mt-6 flex gap-4 text-sm">
        <span>All: {counts.all}</span>
        <span>Published: {counts.published}</span>
        <span>Preprints: {counts.preprint}</span>
        <span>Working: {counts.working}</span>
      </div>

      {/* Empty state for Published */}
      {counts.published === 0 && (
        <div className="mt-3 text-xs text-muted-foreground">
          Publications forthcoming. A working-paper pipeline is in preparation.
        </div>
      )}

      <div className="mt-8 grid gap-4">
        {papers.map((p) => (
          <PaperCard key={p.slug} {...p} />
        ))}
      </div>
    </main>
  );
}
