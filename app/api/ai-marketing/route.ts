import { jsonResponse } from "@/lib/jsonResponse";

export async function POST(req: Request) {
  try {
    // Read the body so we don't break anything later if frontend sends data
    const body = await req.json().catch(() => null);

    // You can log or inspect body here if needed:
    console.log("AI Marketing mock API called with:", body);

    // Return a simple, fast, deterministic mock response
    return jsonResponse({
      campaign:
        "Mock Campaign Audit:\n- Hook is descriptive, not disruptive.\n- Offer is vague and not outcome-based.\n- CTA is generic.\n\nActions:\n- Use a transformation hook.\n- Add 1–2 concrete outcomes.\n- Change CTA to a future-oriented action.",
      content:
        "Mock Content Intelligence:\n- Tone is neutral, lacks emotional pull.\n- Structure does not lead to a clear decision.\n\nSuggestions:\n- Start with a strong problem statement.\n- Use a 3-step narrative: Problem → Transformation → Proof.\n- Finish with one focused CTA.",
      audience:
        "Mock Audience & Behavior:\n- Persona A: Busy professional, high curiosity, low trust.\n- Persona B: Student, motivated by status and future identity.\n\nTriggers:\n- Show real stories and numbers.\n- Reduce risk with guarantees or trials.",
      conversion:
        "Mock Conversion & UX:\n- Above-the-fold does not state the main value clearly.\n- Few trust elements (no logos, testimonials, or numbers).\n\nFixes:\n- Add 3 quick stats above the fold.\n- Place 2–3 testimonials near the main CTA.\n- Simplify the form to max 3 fields at first step.",
    });
  } catch (error) {
    console.error("AI Marketing mock API error:", error);
    return jsonResponse(
      { error: "Internal error in mock AI marketing API." },
      { status: 500 }
    );
  }
}

