"use client";
import Link from "next/link";
import { Paper } from "@/lib/papers";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full border border-gray-600 text-gray-400">
      {children}
    </span>
  );
}

export default function PaperCard(p: Paper) {
  const statusColors: Record<Paper["status"], string> = {
    draft: "border-yellow-400 text-yellow-300",
    submitted: "border-blue-400 text-blue-300",
    under_review: "border-purple-400 text-purple-300",
    accepted: "border-emerald-400 text-emerald-300",
    published: "border-white text-white",
  };
  
  const statusColor = statusColors[p.status] || "border-gray-500 text-gray-300";

  return (
    <div className="rounded-2xl border border-gray-700 bg-black/40 p-6 hover:shadow-lg hover:border-gray-600 transition-all">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h3 className="text-xl font-semibold text-white" style={{ fontFamily: 'Times New Roman, serif' }}>
            {p.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1" style={{ fontFamily: 'Times New Roman, serif' }}>
            {p.authors?.join(", ")} · {p.venue} · {p.year}
          </p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${statusColor}`}>
          {p.type} · {p.status.replace("_", " ")}
        </span>
      </div>

      {p.abstract ? (
        <p className="mt-3 text-sm leading-6 text-gray-300" style={{ fontFamily: 'Times New Roman, serif' }}>
          {p.abstract}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        {p.tags?.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      <div className="mt-4 grid gap-2 text-sm">
        {p.datasets?.length ? (
          <p>
            <strong>Datasets:</strong> {p.datasets.join(" · ")}
          </p>
        ) : null}
        {p.methods?.length ? (
          <p>
            <strong>Methods:</strong> {p.methods.join(" · ")}
          </p>
        ) : null}
        {p.key_findings?.length ? (
          <div>
            <strong>Key Findings:</strong>
            <ul className="list-disc ml-5 mt-1">
              {p.key_findings.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {p.target_journal ? (
          <p>
            <strong>Target Journal:</strong> {p.target_journal}
          </p>
        ) : null}
        {p.last_updated ? (
          <p className="text-xs text-gray-500 mt-1">Last updated: {p.last_updated}</p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        {p.pdf && (
          <Link
            href={p.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 underline transition-colors"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            PDF
          </Link>
        )}
        {p.doi && (
          <Link
            href={`https://doi.org/${p.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 underline transition-colors"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            DOI
          </Link>
        )}
        {p.code && (
          <Link
            href={p.code}
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
