// Shared types and utilities for AI Marketing page variants
import type { CognitiveFrictionResult } from '../brain-types';

export type { CognitiveFrictionResult };

export type RewriteInputPayload = {
  text: string;
  platform: string;
  goal: string[];
  audience: string;
  language: string;
};

export type RewriteOutput = {
  soft_version: string;
  value_version: string;
  proof_version: string;
  emotional_version: string;
  direct_version: string;
  cta: string;
};

