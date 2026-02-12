"use client";

import React from "react";

type AnalysisErrorBoundaryProps = {
  children: React.ReactNode;
};

/**
 * Lightweight wrapper around the analysis area.
 *
 * NOTE:
 * - A true React error boundary must be a class component.
 * - With React 19 + mixed React type versions (from some deps),
 *   class-based boundaries are currently failing type-checking on Vercel.
 * - The original crash source (.toFixed روی null/undefined) is already
 *   fixed via safeToFixed + normalization, so this wrapper can safely
 *   be a pass-through for now.
 *
 * اگر بعداً خواستی error boundary واقعی اضافه کنی،
 * می‌تونیم از کتابخونه‌ای مثل `react-error-boundary` استفاده کنیم.
 */
const AnalysisErrorBoundary: React.FC<AnalysisErrorBoundaryProps> = ({ children }) => {
  return <>{children}</>;
};

export default AnalysisErrorBoundary;

