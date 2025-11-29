"use client";

import { useEffect, useState } from "react";
import AiMarketingPageVariantA from "./components/VariantA";
import AiMarketingPageVariantB from "./components/VariantB";

type Variant = "A" | "B";

const VARIANT_KEY = "aiMarketingVariant";

export default function AiMarketingPage() {
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    // Check if variant is already stored
    const stored = window.localStorage.getItem(VARIANT_KEY) as Variant | null;
    if (stored === "A" || stored === "B") {
      setVariant(stored);
      return;
    }

    // Assign variant randomly (50/50 split)
    const newVariant: Variant = Math.random() < 0.5 ? "A" : "B";
    window.localStorage.setItem(VARIANT_KEY, newVariant);
    setVariant(newVariant);
  }, []);

  // Show nothing while determining variant (prevents flash)
  if (!variant) {
    return null;
  }

  return variant === "A" ? <AiMarketingPageVariantA /> : <AiMarketingPageVariantB />;
}
