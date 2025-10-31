import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Paper = {
  slug: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  type: "preprint" | "working" | "published";
  status: "draft" | "submitted" | "under_review" | "accepted" | "published";
  tags: string[];
  pdf: string;
  doi?: string;
  code?: string;
  datasets?: string[];
  methods?: string[];
  key_findings?: string[];
  target_journal?: string;
  last_updated?: string; // ISO date
  abstract?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "papers");

export function getAllPapers(): Paper[] {
  const files = fs.existsSync(CONTENT_DIR)
    ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    : [];

  const papers = files.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return {
      slug: filename.replace(/\.mdx?$/, ""),
      title: data.title ?? "",
      authors: data.authors ?? [],
      year: Number(data.year ?? 0),
      venue: data.venue ?? "",
      type: data.type ?? "preprint",
      status: data.status ?? "draft",
      tags: data.tags ?? [],
      pdf: data.pdf ?? "",
      doi: data.doi ?? "",
      code: data.code ?? "",
      datasets: data.datasets ?? [],
      methods: data.methods ?? [],
      key_findings: data.key_findings ?? [],
      target_journal: data.target_journal ?? "",
      last_updated: data.last_updated ?? "",
      abstract: data.abstract ?? "",
    } as Paper;
  });

  return papers.sort((a, b) => b.year - a.year);
}
