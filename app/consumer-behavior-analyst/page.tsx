import { generateMetadata, default as PageBuilder } from "../components/PageBuilder";
import { SITE } from "../lib/site";
import type { Metadata } from 'next';

const pageConfig = {
  slug: "consumer-behavior-analyst",
  urlBase: SITE.baseUrl,
  title: "Consumer Behavior Analyst — Decisions, Biases, and Digital Triggers",
  metaTitle: "Consumer Behavior Analyst | Decision Science & UX Signals",
  metaDesc: "Analyze how people decide, what persuades them, and which content triggers action across platforms.",
  keywords: ["Consumer Behavior Analyst", "decision science", "cognitive biases", "behavioral triggers", "UX signals", "consumer psychology", "behavioral analysis"],
  sections: [
    {
      h2: "Methods",
      p: "As a Consumer Behavior Analyst, I combine qualitative research, quantitative analysis, and AI-powered observation across cohorts and contexts. By analyzing user interactions, engagement patterns, and conversion paths, I identify the psychological triggers that drive decisions. This multi-method approach ensures insights are both statistically significant and contextually relevant, providing a complete picture of how your audience thinks and behaves."
    },
    {
      h3: "Qualitative Research",
      p: "I conduct in-depth interviews, focus groups, and user testing sessions to understand the 'why' behind behaviors. These qualitative methods reveal motivations, pain points, and emotional drivers that quantitative data alone can't capture. I analyze conversation patterns, body language cues, and emotional responses to build comprehensive behavioral profiles."
    },
    {
      h3: "Quantitative Analysis",
      p: "I analyze large datasets of user behavior to identify patterns, correlations, and statistical significance. This includes click-through rates, time-on-page, scroll depth, conversion funnels, and engagement metrics. The quantitative data provides the 'what' and 'how much' that complements qualitative insights."
    },
    {
      h3: "AI-Powered Observation",
      p: "I use AI to observe and analyze behavior at scale, identifying patterns that would be impossible to detect manually. The system tracks micro-interactions, attention patterns, and engagement signals across thousands of users simultaneously. This AI observation reveals subconscious behaviors and decision patterns that users themselves might not be aware of."
    },
    {
      h2: "Models",
      h3: "Fogg Behavior Model",
      p: "I apply the Fogg Behavior Model (B = MAT: Behavior = Motivation × Ability × Trigger) to content strategy. This model helps identify why some content drives action while other content doesn't. I analyze whether users have sufficient motivation, whether the action is easy enough (ability), and whether the trigger is well-timed. This framework guides content optimization to maximize conversions."
    },
    {
      h3: "COM-B Framework",
      p: "I use the COM-B model (Capability, Opportunity, Motivation, Behavior) to understand what's preventing desired behaviors. This framework helps identify whether users lack capability (knowledge/skills), opportunity (environment/context), or motivation (desire). By addressing these barriers, I design content and experiences that make desired actions more likely."
    },
    {
      h3: "Prospect Theory",
      p: "I apply Prospect Theory's insights about loss aversion and framing effects to messaging strategy. People feel losses more strongly than equivalent gains, so I frame messages to emphasize what users might lose by not acting rather than just what they'll gain. This psychological principle significantly increases conversion rates when applied correctly."
    },
    {
      h2: "Outcomes",
      h3: "Messaging Clarity",
      p: "My analysis leads to clearer, more persuasive messaging that resonates with how people actually think. I identify which words, phrases, and concepts trigger positive responses and which create confusion or resistance. This clarity reduces cognitive load and makes it easier for users to understand and act on your message."
    },
    {
      h3: "Friction Removal",
      p: "I identify and eliminate friction points that prevent conversions. This includes removing unnecessary steps, simplifying forms, clarifying instructions, and reducing decision paralysis. By understanding the cognitive load required for each action, I design experiences that feel effortless and natural."
    },
    {
      h3: "Conversion Uplift",
      p: "The combination of clearer messaging and reduced friction results in measurable conversion uplift. I've helped clients increase conversion rates by 30-150% through behavioral optimization. These improvements come from understanding and aligning with how people actually make decisions, not how we assume they do."
    },
    {
      h2: "FAQ",
      p: "Q: How is this different from market research? A: I focus on digital behavior and decision psychology, not just demographics. I analyze how people actually interact with content and what triggers actions. Q: How long does analysis take? A: Initial analysis: 2-3 weeks. Ongoing monitoring: continuous. Q: What data do you need? A: Analytics data, user recordings, survey responses, and access to test different variations. Q: Can you work with existing content? A: Yes, I analyze what's working and what's not, then provide specific recommendations for improvement."
    }
  ],
  trParagraph: "Karar verme psikolojisini içerik ve deneyim tasarımına uygular, ikna gücünü artırırız. Bilişsel önyargılar ve davranışsal tetikleyiciler ile dönüşüm oranlarını yükseltiyoruz.",
  faParagraph: "روان‌شناسی تصمیم‌گیری و سوگیری‌های شناختی را به استراتژی محتوا تبدیل می‌کنیم تا نرخ تبدیل رشد کند. تحلیل رفتار مشتری به ما می‌گوید چه محتوایی عمل می‌کند.",
  cta: { label: "Request a Behavior Audit", href: "/contact", utmCampaign: "behavior" },
  relatedLinks: [
    { href: "/consumer-psychology-predictive-ai", label: "Consumer Psychology & Predictive Behavior Analyst" },
    { href: "/ai-marketing-specialist", label: "AI Marketing Specialist" }
  ],
  image: {
    src: "/image/Nima-saraeian-Consumer-Behavior-Analyst-Decisions-Biases-and-Digital-Triggers.jpg",
    alt: "Consumer Behavior Analyst Nima Saraeian – decision science and behavioral triggers"
  }
};

export const metadata: Metadata = generateMetadata(pageConfig);

export default function Page() {
  return PageBuilder(pageConfig);
}
