"use client";

import React from "react";

type Action = {
  action?: string;
  description?: string;
  reason?: string;
  where?: {
    section?: string;
    selector?: string;
  };
};

type PrimaryActionsProps = {
  actions: Action[];
};

export default function PrimaryActions({ actions }: PrimaryActionsProps) {
  const displayActions = actions.slice(0, 3);

  if (displayActions.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">What to change</h2>

      <div className="space-y-6">
        {displayActions.map((action, index) => {
          const whatToChange = action.action || action.description || `Action ${index + 1}`;
          const where = action.where?.section || action.where?.selector || null;

          return (
            <div key={index} className="border-l-4 border-green-500/50 pl-4 py-2">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">{whatToChange}</h3>

                {where && (
                  <p className="text-sm text-white/70">
                    <span className="font-medium">Where:</span> {where}
                  </p>
                )}

                {action.reason && (
                  <p className="text-base text-white/80">
                    <span className="font-medium">Why it matters:</span> {action.reason}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}










