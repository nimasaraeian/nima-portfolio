"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import SignatureInsightCard from "@/components/report/SignatureInsightCard";
import CTARecommendationsCard from "@/components/report/CTARecommendationsCard";
import CostOfInactionCard from "@/components/report/CostOfInactionCard";
import MindsetPersonasCard from "@/components/report/MindsetPersonasCard";
import { ScreenshotOnlyATF } from "@/components/ScreenshotOnlyATF";

type DecisionReportViewProps = {
  result: any;
  inputMode: "url" | "image" | "text";
};

// Helper to convert relative URLs to absolute
const toAbsolute = (u: string | undefined): string => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  return u.startsWith("/") ? u : `/${u}`;
};

// Format report text
function formatReport(text?: string): string {
  if (!text) return "";
  return text.trim();
}

// Report component with ReactMarkdown + GFM support
function Report({ text }: { text: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-sm prose-headings:text-white prose-p:text-white/90 prose-strong:text-white prose-a:text-blue-400 prose-code:text-blue-300 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
        {text || ""}
      </ReactMarkdown>
    </div>
  );
}

export default function DecisionReportView({
  result,
  inputMode,
}: DecisionReportViewProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!result) {
    return null;
  }

  const report = formatReport(result.human_report);
  const hasReport = !!report;

  const handleCopyReport = async () => {
    const textToCopy = report || JSON.stringify(result, null, 2);
    await navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Inputs Analyzed */}
      <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
        <span className="font-medium">Inputs analyzed:</span> Mode: {inputMode.toUpperCase()}
        {result.goal && (
          <span className="ml-2">
            • Goal: {result.goal}
          </span>
        )}
      </div>

      {/* Screenshots */}
      {result.screenshots || result.screenshot ? (
        <ScreenshotOnlyATF data={result} />
      ) : null}

      {/* Decision State Card */}
      {result.decision_state && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            Decision State
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Label:</span>
              <span className="text-sm font-medium text-white">
                {result.decision_state.label || "—"}
              </span>
            </div>
            {result.decision_state.confidence !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Confidence:</span>
                <span className="text-sm font-medium text-white">
                  {typeof result.decision_state.confidence === "number"
                    ? `${(result.decision_state.confidence * 100).toFixed(1)}%`
                    : result.decision_state.confidence}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Evidence Bullets */}
      {result.evidence && Array.isArray(result.evidence) && result.evidence.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Evidence</h3>
          <ul className="space-y-2">
            {result.evidence.map((item: any, index: number) => (
              <li key={index} className="text-sm text-white/90 flex items-start">
                <span className="mr-2">•</span>
                <span>{typeof item === "string" ? item : JSON.stringify(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Human Report */}
      {hasReport ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold text-white">Report</h2>
            <button
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
              onClick={handleCopyReport}
            >
              {copySuccess ? "Copied!" : "Copy report"}
            </button>
          </div>

          {/* Report Summary Anchor Navigation */}
          {(result.decision_psychology_insight ||
            result.cta_recommendations ||
            result.cost_of_inaction ||
            result.mindset_personas) && (
            <div className="mb-4 pb-4 border-b border-white/10">
              <div className="flex flex-wrap gap-2 text-xs">
                {result.decision_psychology_insight && (
                  <button
                    onClick={() => {
                      document
                        .getElementById("report-insight")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="px-3 py-1 rounded border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition"
                  >
                    Insight
                  </button>
                )}
                {result.cta_recommendations && (
                  <button
                    onClick={() => {
                      document
                        .getElementById("report-ctas")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="px-3 py-1 rounded border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition"
                  >
                    CTAs
                  </button>
                )}
                {result.cost_of_inaction && (
                  <button
                    onClick={() => {
                      document
                        .getElementById("report-cost")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="px-3 py-1 rounded border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition"
                  >
                    Cost
                  </button>
                )}
                {result.mindset_personas &&
                  result.mindset_personas.length > 0 && (
                    <button
                      onClick={() => {
                        document
                          .getElementById("report-personas")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="px-3 py-1 rounded border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition"
                    >
                      Personas
                    </button>
                  )}
              </div>
            </div>
          )}

          <div className="mt-4 text-sm leading-7 text-white/90">
            <Report text={report} />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
          <p className="text-sm font-medium text-yellow-400 mb-2">
            ⚠️ Report not available
          </p>
          <p className="text-xs text-yellow-300">
            The API response did not include a human-readable report.
          </p>
        </div>
      )}

      {/* Signature Layers */}
      {result.decision_psychology_insight && (
        <div id="report-insight" className="mt-6">
          <SignatureInsightCard data={result.decision_psychology_insight} />
        </div>
      )}

      {result.cta_recommendations && (
        <div id="report-ctas" className="mt-6">
          <CTARecommendationsCard data={result.cta_recommendations} />
        </div>
      )}

      {result.cost_of_inaction && (
        <div id="report-cost" className="mt-6">
          <CostOfInactionCard data={result.cost_of_inaction} />
        </div>
      )}

      {result.mindset_personas && result.mindset_personas.length > 0 && (
        <div id="report-personas" className="mt-6">
          <MindsetPersonasCard data={result.mindset_personas} />
        </div>
      )}

      {/* Issues List */}
      {result.issues && Array.isArray(result.issues) && result.issues.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Issues</h3>
          <div className="space-y-4">
            {result.issues.map((issue: any, index: number) => (
              <div
                key={index}
                className="border-l-4 border-yellow-500/50 pl-4 py-2"
              >
                {issue.title && (
                  <h4 className="text-sm font-medium text-white mb-1">
                    {issue.title}
                  </h4>
                )}
                {issue.why && (
                  <p className="text-sm text-white/80 mb-2">{issue.why}</p>
                )}
                {issue.fix && (
                  <p className="text-sm text-white/70">
                    <span className="font-medium">Fix:</span> {issue.fix}
                  </p>
                )}
                {issue.location && (
                  <p className="text-xs text-white/60 mt-1">
                    Location: {issue.location}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screenshot URLs (if present as separate fields) */}
      {result.screenshot_urls && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Screenshots</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.screenshot_urls.desktop && (
              <div>
                <p className="text-xs text-white/70 mb-2">Desktop</p>
                <img
                  src={toAbsolute(result.screenshot_urls.desktop)}
                  alt="Desktop screenshot"
                  className="w-full rounded-lg border border-white/10"
                />
              </div>
            )}
            {result.screenshot_urls.mobile && (
              <div>
                <p className="text-xs text-white/70 mb-2">Mobile</p>
                <img
                  src={toAbsolute(result.screenshot_urls.mobile)}
                  alt="Mobile screenshot"
                  className="w-full rounded-lg border border-white/10"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}



