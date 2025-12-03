'use client';

import type { PsychologyDashboard } from '@/app/ai-marketing/brain-types';

const clampValue = (value: number) => Math.max(0, Math.min(100, value));

export const computeCognitiveFit = (dash: PsychologyDashboard) => {
  const { clarity_score = 0, overload_score = 0, ambiguity_score = 0 } = dash.cognitive_load ?? {};
  const raw = clarity_score - 0.5 * overload_score - 0.3 * ambiguity_score;
  return clampValue(Math.round(isNaN(raw) ? 0 : raw));
};

export const computeEmotionalFit = (dash: PsychologyDashboard) => {
  const { curiosity = 0, motivation = 0, trust = 0, anxiety = 0, confusion = 0 } =
    dash.emotional_response ?? {};
  const positive = (curiosity + motivation + trust) / 3;
  const negative = (anxiety + confusion) / 2;
  const raw = positive - 0.7 * negative;
  return clampValue(Math.round(isNaN(raw) ? 0 : raw));
};

