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
  tags: string[];
  pdf: string;
  doi?: string;
  code?: string;
  abstract?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "papers");

export function getAllPapers(): Paper[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(
    (f) => f.endsWith(".md") || f.endsWith(".mdx")
  );

  const papers = files.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return {
      slug: filename.replace(/\.mdx?$/, ""),
      title: data.title || "",
      authors: data.authors ?? [],
      year: Number(data.year) || new Date().getFullYear(),
      venue: data.venue ?? "",
      type: (data.type ?? "preprint") as "preprint" | "working" | "published",
      tags: data.tags ?? [],
      pdf: data.pdf ?? "",
      doi: data.doi ?? "",
      code: data.code ?? "",
      abstract: data.abstract ?? "",
    } as Paper;
  });

  // مرتب‌سازی: جدیدتر اول
  return papers.sort((a, b) => b.year - a.year);
}
