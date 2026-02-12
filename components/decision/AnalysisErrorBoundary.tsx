"use client";

import React from "react";

type AnalysisErrorBoundaryProps = {
  children: React.ReactNode;
};

type AnalysisErrorBoundaryState = {
  hasError: boolean;
};

export default class AnalysisErrorBoundary extends React.Component<
  AnalysisErrorBoundaryProps,
  AnalysisErrorBoundaryState
> {
  constructor(props: AnalysisErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): AnalysisErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    // Log error but prevent full-page crash
    // eslint-disable-next-line no-console
    console.error("[AnalysisErrorBoundary] Caught error rendering analysis view:", {
      error,
      info,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
          <p className="text-sm font-medium text-red-300 mb-1">
            Something went wrong while rendering the analysis.
          </p>
          <p className="text-xs text-red-200/80">
            Please try running the analysis again. If the problem persists, refresh the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

