"use client";

import React from "react";
import { AlertTriangle, Sparkles } from "lucide-react";

type BlockerItem = {
  name: string;
  feedback: string;
  score?: number; // Optional, we won't display it
};

type BoosterItem = {
  name: string;
  feedback: string;
  score?: number; // Optional, we won't display it
};

type Props = {
  blockers?: BlockerItem[] | string[] | null;
  boosters?: BoosterItem[] | string[] | null;
};

export default function KeyInsights({ blockers, boosters }: Props) {
  // Normalize blockers - handle both object array and string array
  const normalizedBlockers: BlockerItem[] = React.useMemo(() => {
    if (!blockers || blockers.length === 0) return [];
    
    return blockers.map((item) => {
      if (typeof item === 'string') {
        // If it's a string, use it as both name and feedback
        return {
          name: item,
          feedback: item,
        };
      }
      // If it's an object, use it as-is
      return item as BlockerItem;
    });
  }, [blockers]);

  // Normalize boosters - handle both object array and string array
  const normalizedBoosters: BoosterItem[] = React.useMemo(() => {
    if (!boosters || boosters.length === 0) return [];
    
    return boosters.map((item) => {
      if (typeof item === 'string') {
        // If it's a string, use it as both name and feedback
        return {
          name: item,
          feedback: item,
        };
      }
      // If it's an object, use it as-is
      return item as BoosterItem;
    });
  }, [boosters]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Hidden Friction */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">⚠️ Hidden Friction</h3>
          </div>
          
          {normalizedBlockers.length === 0 ? (
            <p className="text-sm text-gray-400 italic">
              No critical psychological barriers detected.
            </p>
          ) : (
            <ul className="space-y-3">
              {normalizedBlockers.map((blocker, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-300 mb-1">
                      {blocker.name}
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {blocker.feedback}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: Winning Elements */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">💎 Winning Elements</h3>
          </div>
          
          {normalizedBoosters.length === 0 ? (
            <p className="text-sm text-gray-400 italic">
              No winning elements identified yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {normalizedBoosters.map((booster, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-300 mb-1">
                      {booster.name}
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {booster.feedback}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}




