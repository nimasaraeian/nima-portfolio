"use client";

import React from "react";
import { ActionItem, Driver, Report } from "@/lib/typesDecisionReport";

type FixThisFirstActionsProps = {
  report: Report | any; // Allow any to work with normalized report
};

export default function FixThisFirstActions({ report }: FixThisFirstActionsProps) {
  // Collect actions in priority order
  const actions: Array<{
    action: string;
    why?: string;
    expected_shift?: string;
  }> = [];

  // Priority a) report.fix_first (if exists)
  if (report?.fix_first) {
    const fixFirst = report.fix_first;
    const actionText = fixFirst.title || fixFirst.what || "";
    if (actionText && actionText.trim() !== "") {
      actions.push({
        action: actionText,
        why: fixFirst.why,
        expected_shift: fixFirst.expected_shift,
      });
    }
  }

  // Priority b) primary driver actions (driver.actions[0])
  let drivers: Driver[] = [];
  if (report?.decision?.drivers && Array.isArray(report.decision.drivers)) {
    drivers = report.decision.drivers;
  } else if (report?.decision_model?.drivers && Array.isArray(report.decision_model.drivers)) {
    drivers = report.decision_model.drivers;
  } else if (report?.raw?.decision?.drivers && Array.isArray(report.raw.decision.drivers)) {
    drivers = report.raw.decision.drivers;
  } else if (report?.raw?.decision_model?.drivers && Array.isArray(report.raw.decision_model.drivers)) {
    drivers = report.raw.decision_model.drivers;
  }

  if (drivers.length > 0) {
    const primaryDriver = drivers.find((d: any) => d.role === "primary") || 
      drivers.sort((a: any, b: any) => (b.score || 0) - (a.score || 0))[0];
    
    if (primaryDriver?.actions && Array.isArray(primaryDriver.actions) && primaryDriver.actions.length > 0) {
      const primaryAction = primaryDriver.actions[0];
      const actionText = primaryAction.action || "";
      // Only add if not already in actions (avoid duplicates) and action text is valid
      if (actionText && actionText.trim() !== "" && !actions.some(a => a.action === actionText)) {
        actions.push({
          action: actionText,
          why: primaryAction.why,
          expected_shift: primaryAction.expected_shift,
        });
      }
    }
  }

  // Priority c) fallback report.quick_wins.slice(0,2)
  if (actions.length < 3) {
    const quickWins = report?.quick_wins || report?.raw?.quick_wins || [];
    const remaining = 3 - actions.length;
    
    quickWins.slice(0, remaining).forEach((win: any) => {
      const actionText = win.title || win.what || "";
      // Only add if not already in actions and action text is valid
      if (actionText && actionText.trim() !== "" && !actions.some(a => a.action === actionText)) {
        actions.push({
          action: actionText,
          why: win.why,
          expected_shift: win.expected_shift,
        });
      }
    });
  }

  // Limit to max 3
  const displayActions = actions.slice(0, 3);

  // If no actions, don't render
  if (displayActions.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        Fix this first
      </h2>

      <div className="space-y-4">
        {displayActions.map((action, index) => (
          <div key={index} className="p-4 rounded-lg border border-white/5 bg-white/5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-xs font-semibold text-green-300">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="text-white font-medium mb-1">
                  {action.action}
                </p>
                {action.why && (
                  <p className="text-sm text-white/60 mb-2">
                    {action.why}
                  </p>
                )}
                {action.expected_shift && (
                  <p className="text-xs text-white/50 italic">
                    Expected shift: {action.expected_shift}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

