import { Suspense } from "react";
import DecisionBrainClient from "./DecisionBrainClient";

export default function DecisionBrainPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-gray-100">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="p-6 text-white/70">Loading...</div>
        </div>
      </div>
    }>
      <DecisionBrainClient />
    </Suspense>
  );
}
