import Link from "next/link";
import Image from "next/image";

type Article = {
  title: string;
  href: string;
  description: string;
  label?: string;
  image?: string;
  alt?: string;
};

type ArticleSection = {
  id: string;
  title: string;
  subtitle?: string;
  articles: Article[];
};

const SECTIONS: ArticleSection[] = [
  {
    id: "super-pillar",
    title: "Super Pillar – Behavioral & Predictive AI Marketing",
    subtitle:
      "The core operating system guide for AI-first, behavior-aware growth.",
    articles: [
      {
        title: "AI Marketing 2026 — The Behavioral & Predictive Growth Engine",
        href: "/articles/ai/ai-marketing-new-era-2026",
        description:
          "15,000-word super pillar on behavioral AI, cognitive friction, predictive growth loops, and the AI marketing operating system.",
        label: "Super Pillar",
        image: "/image/ai-marketing-human-and-ai-collaboration-professional-woman-robot.jpg",
        alt: "AI Marketing 2026 super pillar guide with marketing leader and AI assistant"
      }
    ]
  },
  {
    id: "behavioral-ai-cro",
    title: "Behavioral AI & Conversion Optimization",
    subtitle:
      "Guides that show how cognitive friction, trust, and behavior data reshape CRO.",
    articles: [
      {
        title:
          "Cognitive Friction AI CRO — How Behavioral AI Becomes the #1 Conversion Advantage",
        href: "/articles/ai/cognitive-friction-ai-cro",
        description:
          "Explains the psychology of hesitation, Decision Friction Score, and how AI detects and removes cognitive blockers in your funnel.",
        label: "Behavioral CRO",
        image: "/image/conversion-rate-cognitive-friction-ai-cover.png",
        alt: "Marketer reviewing AI behavioral dashboards for cognitive friction insights"
      },
      {
        title:
          "Predictive Buyer Intent AI — Why Marketing Fails Without Behavioral Signals",
        href: "/articles/ai/predictive-buyer-intent-ai-2026",
        description:
          "Deep dive into intent states, micro-signals, and how AI uses behavioral traces to predict who is ready to buy — and who will never convert.",
        label: "Buyer Intent",
        image: "/image/predictive-buyer-intent-ai-real-person-smiling-cover-image.png",
        alt: "Predictive Buyer Intent AI - How AI reads customer behavior signals before purchase decisions"
      },
      {
        title:
          "The Ultimate Guide to CRO Copywriting (2025–2030) — Skills, Salary, A/B Tests & 90+ Examples",
        href: "/articles/ai/cro-copywriting-guide-2025",
        description:
          "Hands-on guide to conversion-focused copywriting with real examples, tests, and a skill map for CRO copywriters.",
        label: "CRO Copywriting",
        image: "/image/cro-copywriter-working-with-ai-real-image.jpg",
        alt: "CRO Copywriter working with AI - Professional copywriter optimizing conversion copywriting"
      }
    ]
  },
  {
    id: "ai-marketing-strategy-tools",
    title: "AI Marketing Strategy, Tools & Operating Systems",
    subtitle:
      "From foundations to full-stack AI marketing systems and tool stacks.",
    articles: [
      {
        title:
          "AI Marketing 2026 — The Complete Guide to Tools, Strategy, Behavioral Data, and Conversion Psychology",
        href: "/articles/ai-marketing-2026",
        description:
          "Strategic overview of how tools, behavioral data, and conversion psychology fuse into a real AI marketing engine.",
        label: "Strategy Guide",
        image: "/image/ai-marketing-2026.png?v=2",
        alt: "AI Marketing 2026 Complete Guide - Tools, strategy, behavioral data, and conversion psychology"
      },
      {
        title:
          "How to Use AI in Marketing (2026 Guide to Tools, Strategy & Behavior-Driven Growth)",
        href: "/articles/ai/how-to-use-ai-in-marketing-2026",
        description:
          "Practical guide to applying AI across content, funnels, CRO, and growth — without losing sight of human behavior.",
        label: "How-To",
        image: "/image/how-to-use-ai-in-marketing-prediction-automation.png",
        alt: "How to Use AI in Marketing 2026 - Complete guide to AI marketing tools, strategy, and behavior-driven growth"
      },
      {
        title:
          "AI Marketing Tools 2026: The Complete Guide to the Tools Every Modern Marketer Must Use",
        href: "/articles/ai/marketing-tools-2026",
        description:
          "Map of the AI tools landscape for marketers — from LLMs and automation to behavior analytics and predictive engines.",
        label: "Tool Stack",
        image: "/image/ai-marketing-tools-2026.jpg",
        alt: "AI Marketing Tools 2026 - Complete guide to essential AI marketing tools and modern marketing stack"
      },
      {
        title:
          "AI Marketing Strategy — How Humans Decide When Machines Are Watching",
        href: "/articles/ai/ai-marketing-strategy",
        description:
          "Master AI marketing strategy with decision intelligence. Learn why 60% of strategies fail and how to build frameworks that understand human behavior, not just clicks. 10,500-word guide.",
        label: "Strategy Guide",
        image: "/image/ai-marketing-strategy.jpg",
        alt: "AI Marketing Strategy — How Humans Decide When Machines Are Watching | Decision Intelligence Framework by Nima Saraeian"
      }
    ]
  },
  {
    id: "roles-skills-careers",
    title: "AI Marketing Roles, Skills & Careers",
    subtitle:
      "For marketers who want to upgrade their careers into AI-powered roles.",
    articles: [
      {
        title:
          "AI Marketing Roles in 2026: Specialist vs Strategist vs Expert vs Consultant vs Engineer",
        href: "/articles/marketing/ai-marketing-roles-2026",
        description:
          "Clarifies the real differences between modern AI marketing roles and how they fit together inside growth teams.",
        label: "Roles Map",
        image: "/image/ai-marketing-specialist-cover-2026.png",
        alt: "AI Marketing Roles 2026 - Complete guide to understanding differences between AI Marketing roles"
      },
      {
        title:
          "AI Marketing Skills 2025 – The Essential Skill Map for the Next Generation of Marketing Specialists",
        href: "/articles/ai/ai-marketing-skills-2025",
        description:
          "Skill map for marketers who want to transition into AI-first roles — from prompt engineering to behavioral analytics.",
        label: "Skill Map",
        image: "/image/A_promotional_digital_photograph_with_text_overlay.png",
        alt: "AI Marketing Skills 2025 - Essential skill map for the next generation of marketing specialists"
      },
      {
        title:
          "What Does an AI Marketing Specialist Do? (2025 Full Guide)",
        href: "/what-does-an-ai-marketing-specialist-do",
        description:
          "Defines the day-to-day work, responsibilities, and growth path of an AI Marketing Specialist.",
        label: "Career Guide",
        image: "/image/ai-marketing-specialist-real-hero-image.jpg",
        alt: "AI Marketing Specialist 2025 - Professional guide to AI marketing roles and responsibilities"
      }
    ]
  },
  {
    id: "creative-emotion-future",
    title: "Emotion, Creativity & the Future of AI",
    subtitle:
      "Where emotional intelligence, creativity, and personality models meet AI marketing.",
    articles: [
      {
        title:
          "Generative AI for Creative Marketing — Emotional Engineering & Predictive Behavior",
        href: "/articles/ai/generative-ai-creative-marketing",
        description:
          "Explores how generative AI, emotional hooks, and predictive behavior models shape creative marketing campaigns.",
        label: "Creative AI",
        image: "/image/Generative AI for Creative Marketing.png",
        alt: "Generative AI for Creative Marketing - AI-powered content creation and marketing automation"
      },
      {
        title:
          "Emotion AI in 2025: How Artificial Emotional Intelligence Is Transforming Human–Machine Interaction",
        href: "/articles/ai/emotion-ai",
        description:
          "Looks at Emotion AI, affective computing, and how emotional signals can be used ethically in growth systems.",
        label: "Emotion AI",
        image: "/image/emotion-ai-human-machine-interaction-emotional-analysis-2025.jpg",
        alt: "Emotion AI 2025 - Artificial emotional intelligence transforming human-machine interaction"
      },
      {
        title:
          "AI Personalities: Will Artificial Intelligence Develop a Real Personality by 2026?",
        href: "/articles/ai/personality-models",
        description:
          "Speculative–analytical guide on personality models in AI and what they mean for branding, UX, and trust.",
        label: "Future of AI",
        image: "/image/ai-personality-human-ai-interaction-artificial-emotion-analysis.jpg",
        alt: "AI Personalities 2026 - Artificial intelligence personality development and human-AI interaction"
      }
    ]
  }
];

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Static background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.04),transparent_50%)] pointer-events-none" />
      
      <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Page header */}
          <header className="text-center mb-16 space-y-4">
            <div className="inline-flex">
              <span className="inline-flex px-4 py-1.5 bg-emerald-600/20 border border-emerald-500/30 rounded-full text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                AI Marketing Insights
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              AI Marketing Articles
            </h1>
            <p className="text-sm md:text-base text-neutral-300/90 max-w-2xl mx-auto leading-relaxed">
              Deep, long-form guides on AI-driven marketing, behavioral psychology,
              cognitive friction, and predictive analytics. Start from the super
              pillar, then dive into the category that matches your current
              question.
            </p>
          </header>

          {/* Sections */}
          <div className="space-y-10">
            {SECTIONS.map((section, index) => (
              <section key={section.id} className="space-y-4">
                {/* Section Header */}
                <div className="space-y-1.5 pb-2 border-b border-neutral-800/50">
                  <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
                      {section.subtitle}
                    </p>
                  )}
                </div>

                {/* Articles Grid */}
                <div
                  className={`grid gap-4 ${
                    section.articles.length > 1
                      ? "md:grid-cols-2"
                      : "md:grid-cols-1 max-w-2xl"
                  }`}
                >
                  {section.articles.map((article, articleIndex) => (
                    <Link
                      key={article.href}
                      href={article.href}
                      className="group block h-full"
                    >
                      <article className="h-full flex flex-col rounded-lg border border-neutral-800/80 bg-neutral-950/70 overflow-hidden shadow-sm shadow-black/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/70 hover:shadow-md hover:shadow-emerald-500/10">
                        {/* Image Container */}
                        {article.image && (
                          <div className="relative w-full bg-neutral-900/50 overflow-hidden flex items-center justify-center py-3 px-2">
                            <Image
                              src={article.image}
                              alt={article.alt || article.title}
                              width={800}
                              height={600}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="w-full h-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                              loading={articleIndex < 2 ? "eager" : "lazy"}
                              quality={90}
                              priority={section.id === "super-pillar" && articleIndex === 0}
                            />
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="flex flex-col flex-1 px-4 py-3.5">
                          <div className="flex items-start justify-between gap-2.5 mb-2">
                            <h3 className="text-xs md:text-sm font-semibold leading-snug group-hover:text-emerald-300 text-white transition-colors flex-1 min-w-0">
                              {article.title}
                            </h3>
                            {article.label && (
                              <span className="shrink-0 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-emerald-300 whitespace-nowrap">
                                {article.label}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] md:text-xs leading-relaxed text-neutral-400 line-clamp-2 mb-3 flex-1">
                            {article.description}
                          </p>
                          <div className="flex items-center gap-1.5 text-[9px] font-medium text-neutral-500 group-hover:text-emerald-300 transition-colors mt-auto">
                            <span>Read article</span>
                            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Footer note */}
          <footer className="pt-4 border-t border-neutral-900/80">
            <p className="text-xs md:text-sm text-neutral-500 text-center">
              More articles on AI marketing, cognitive friction, and behavioral
              growth systems are being published. Start with the super pillar, then
              bookmark this hub as your reference map.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
