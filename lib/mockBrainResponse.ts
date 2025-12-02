// Mock API response for AI Content & Landing Page Analysis
// This will be replaced with a real API call later

export interface BrainAnalysisResponse {
  score: number
  aiConfidence: number
  summary: string
  topIssues: string[]
  quickWins: string[]
  copyVariants: {
    hooks: string[]
    body: string[]
    ctas: string[]
  }
}

export function mockBrainResponse(): BrainAnalysisResponse {
  // Simulate API delay
  return {
    score: 72,
    aiConfidence: 87,
    summary: "Your content shows strong engagement potential with clear value propositions. However, there are opportunities to improve conversion rates by optimizing your call-to-action placement and enhancing emotional triggers in your messaging.",
    topIssues: [
      "CTA is placed too low on the page, reducing visibility",
      "Headline lacks emotional urgency or specific benefit",
      "Social proof elements are missing or not prominent enough",
      "Mobile experience has slow loading times affecting bounce rate",
      "Value proposition could be more specific to target audience"
    ],
    quickWins: [
      "Move primary CTA above the fold for immediate visibility",
      "Add urgency elements like 'Limited time' or 'Only X spots left'",
      "Include customer testimonials or trust badges near the CTA",
      "Optimize images for faster mobile loading (compress to <200KB)",
      "A/B test headline variations with specific numbers or benefits"
    ],
    copyVariants: {
      hooks: [
        "Transform Your Business in 30 Days (Without the Overwhelm)",
        "The #1 Mistake 90% of Marketers Make (And How to Avoid It)",
        "From Struggling to Thriving: How [Client Name] 3X'd Their Revenue",
        "Stop Losing Customers: The Simple Fix That Changed Everything",
        "Why Top Brands Use This Strategy (And You Should Too)"
      ],
      body: [
        "Imagine waking up to a business that runs itself. Where leads flow in consistently, and your team knows exactly what to do. That's not a dream—it's what happens when you align your marketing with how people actually make decisions.",
        "You've tried everything: new platforms, different ad formats, hiring more people. But nothing seems to stick. The problem isn't your strategy—it's that you're speaking the wrong language to your audience.",
        "Here's what most businesses get wrong: they focus on features instead of feelings. Your customers don't buy your product—they buy the transformation it creates. Let's show them that transformation clearly.",
        "Think about the last time you made a big purchase. What convinced you? It wasn't the specs or the price tag—it was how you imagined your life would improve. That's the story your content needs to tell."
      ],
      ctas: [
        "Get Your Free Analysis →",
        "Start Your 30-Day Trial (No Credit Card Required)",
        "Book a Free Strategy Call",
        "Download the Free Guide",
        "See How It Works (2-Min Demo)"
      ]
    }
  }
}










