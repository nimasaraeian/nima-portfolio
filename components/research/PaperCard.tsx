"use client";
import Link from "next/link";

export default function PaperCard({
  title,
  authors,
  venue,
  year,
  tags,
  pdf,
  doi,
  code,
  abstract,
  type,
}: {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  tags: string[];
  pdf: string;
  doi?: string;
  code?: string;
  abstract?: string;
  type: "preprint" | "working" | "published";
}) {
  const typeColors: Record<string, string> = {
    published: "bg-green-500/20 text-green-400 border-green-500/30",
    preprint: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    working: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  return (
    <div className="rounded-2xl border border-gray-700 bg-black/40 p-6 hover:shadow-lg hover:border-gray-600 transition-all">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="text-xl font-semibold text-white flex-1" style={{ fontFamily: 'Times New Roman, serif' }}>
          {title}
        </h3>
        <span
          className={`text-xs px-2 py-1 rounded-full border ${typeColors[type] || typeColors.working}`}
        >
          {type}
        </span>
      </div>
      
      <p className="text-sm text-gray-400 mt-2 mb-3" style={{ fontFamily: 'Times New Roman, serif' }}>
        {authors.join(", ")} · {venue} · {year}
      </p>
      
      {abstract && (
        <p className="mt-3 text-sm leading-6 text-gray-300 line-clamp-3" style={{ fontFamily: 'Times New Roman, serif' }}>
          {abstract}
        </p>
      )}
      
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded-full border border-gray-600 text-gray-400"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        {pdf && (
          <Link
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 underline transition-colors"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            PDF
          </Link>
        )}
        {doi && (
          <Link
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 underline transition-colors"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            DOI
          </Link>
        )}
        {code && (
          <Link
            href={code}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 underline transition-colors"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            Code
          </Link>
        )}
      </div>
    </div>
  );
}
