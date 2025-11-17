import { Metadata } from "next";
import { SITE } from "../lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Marketing & Content Strategy Services | Nima Saraeian",
  description:
    "Strategic, AI-powered services across content creation, marketing, automation, consumer psychology and branding. Data-driven, psychology-backed, outcomes focused.",
  alternates: { canonical: `${SITE.baseUrl}/services` },
  openGraph: {
    title: "AI Marketing & Content Strategy Services | Nima Saraeian",
    description:
      "Strategic, AI-powered services across content creation, marketing, automation, consumer psychology and branding.",
    url: `${SITE.baseUrl}/services`,
    type: "website",
    images: [{ url: `${SITE.baseUrl}${SITE.ogImage}` }]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing & Content Strategy Services | Nima Saraeian",
    description:
      "Strategic, AI-powered services across content creation, marketing, automation, consumer psychology and branding.",
    images: [`${SITE.baseUrl}${SITE.ogImage}`]
  }
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Marketing & Content Strategy Services",
    description:
      "A comprehensive suite of AI-powered services for content strategy, marketing, automation and behavioral analysis.",
    provider: {
      "@type": "Person",
      name: "Nima Saraeian",
      url: SITE.baseUrl
    },
    areaServed: { "@type": "Place", name: "Global" },
    url: `${SITE.baseUrl}/services`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Content Creation Specialist",
            url: `${SITE.baseUrl}/ai-content-creation-specialist`
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Business Automation Specialist",
            url: `${SITE.baseUrl}/ai-business-automation`
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Marketing Specialist",
            url: `${SITE.baseUrl}/ai-marketing-expert`
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Automation Specialist",
            url: `${SITE.baseUrl}/ai-automation-consultant`
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Consumer Behavior Analyst",
            url: `${SITE.baseUrl}/consumer-behavior-analyst`
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Consumer Psychology & Predictive Behavior Analyst",
            url: `${SITE.baseUrl}/consumer-psychology-predictive-ai`
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Branding Specialist",
            url: `${SITE.baseUrl}/ai-branding-specialist`
          }
        }
      ]
    }
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "http://schema.org/ItemListUnordered",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: `${SITE.baseUrl}/ai-content-creation-specialist`,
        name: "AI Content Creation Specialist"
      },
      {
        "@type": "ListItem",
        position: 2,
        url: `${SITE.baseUrl}/ai-business-automation`,
        name: "AI Business Automation Specialist"
      },
      {
        "@type": "ListItem",
        position: 3,
        url: `${SITE.baseUrl}/ai-marketing-expert`,
        name: "AI Marketing Specialist"
      },
      {
        "@type": "ListItem",
        position: 4,
        url: `${SITE.baseUrl}/ai-automation-consultant`,
        name: "AI Automation Specialist"
      },
      {
        "@type": "ListItem",
        position: 5,
        url: `${SITE.baseUrl}/consumer-behavior-analyst`,
        name: "Consumer Behavior Analyst"
      },
      {
        "@type": "ListItem",
        position: 6,
        url: `${SITE.baseUrl}/consumer-psychology-predictive-ai`,
        name: "Consumer Psychology & Predictive Behavior Analyst"
      },
      {
        "@type": "ListItem",
        position: 7,
        url: `${SITE.baseUrl}/ai-branding-specialist`,
        name: "AI Branding Specialist"
      }
    ]
  };

  const services = [
    {
      title: "AI Content Creation Specialist",
      href: "/ai-content-creation-specialist",
      description: "End-to-end content systems that align behavioral storytelling with platform logic. From research and creative direction to AI caption engines and performance loops.",
      keywords: ["Content Strategy", "AI Content", "Social Media", "Behavioral Storytelling"]
    },
    {
      title: "AI Business Automation Specialist",
      href: "/ai-business-automation",
      description: "CRM, lead capture, onboarding, support, and reporting—automated with AI agents and integrations. Reduce cost, increase speed, and scale operations.",
      keywords: ["Automation", "CRM", "Workflow", "Operations"]
    },
    {
      title: "AI Marketing Specialist",
      href: "/ai-marketing-expert",
      description: "Predictive segmentation, creative intelligence, and multi-variant testing across Instagram, TikTok, LinkedIn, YouTube, Email, and SEO.",
      keywords: ["Marketing", "Growth", "Strategy", "Predictive Analytics"]
    },
    {
      title: "AI Automation Specialist",
      href: "/ai-automation-consultant",
      description: "Assistants and workflows that connect Email → CRM → Calendar → Analytics. Memory, tone, escalation, and compliance built-in.",
      keywords: ["Chatbots", "AI Assistants", "Integration", "Workflows"]
    },
    {
      title: "Consumer Behavior Analyst",
      href: "/consumer-behavior-analyst",
      description: "Decision science applied to content and UX. Analyze the triggers that make audiences stop, feel, and act using qualitative, quantitative, and AI-based observation.",
      keywords: ["Behavior Analysis", "Psychology", "UX", "Decision Science"]
    },
    {
      title: "Consumer Psychology & Predictive Behavior Analyst",
      href: "/consumer-psychology-predictive-ai",
      description: "Forecast likely actions using psychological signals, content traces, and AI models. Transparent, ethical personalization that respects users.",
      keywords: ["Predictive Analytics", "Psychology", "Forecasting", "Ethical AI"]
    },
    {
      title: "AI Branding Specialist",
      href: "/ai-branding-specialist",
      description: "Build distinctive brand identity, voice libraries, visual systems, and governance with AI. Consistency, memorability, and clear positioning.",
      keywords: ["Branding", "Identity", "Positioning", "Visual Systems"]
    }
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        AI Marketing & Content Strategy Services
      </h1>
      <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        I help brands, clinics, and startups design <strong className="text-white">AI-powered systems</strong> that
        combine content architecture, behavioral psychology, and measurable growth.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            className="group block p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              {service.title}
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {service.keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-gray-800 text-gray-400 rounded-full border border-gray-700"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className="text-blue-400 group-hover:text-blue-300 font-medium transition-colors flex items-center gap-2">
              Learn more
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>

      <hr className="my-12 border-gray-700" />

      {/* Turkish + Persian blocks */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Türkçe Paragraf</h3>
        <p lang="tr" className="text-lg leading-relaxed mb-8 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          Türkiye'de dijital büyüme artık yapay zekâ ile tasarlanıyor. Bu hizmetler; içerik
          mimarisi, pazarlama otomasyonu, tüketici psikolojisi ve marka stratejisini tek
          çatı altında birleştirerek ölçülebilir sonuçlar üretir.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>پاراگراف فارسی</h3>
        <p lang="fa" dir="rtl" className="text-lg leading-relaxed mb-8 text-gray-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          رشد دیجیتال امروز بر پایهٔ هوش مصنوعی است. این خدمات، از معماری محتوا تا
          اتوماسیون، تحلیل رفتار و برندینگ را یکپارچه می‌کند تا خروجی‌های قابل اندازه‌گیری
          و ماندگار بسازد.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/contact?utm_source=site&utm_medium=cta&utm_campaign=services"
          className="inline-block rounded-2xl border-2 border-white px-8 py-4 text-lg hover:bg-white hover:text-black transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl"
          style={{ fontFamily: 'Times New Roman, Times, serif' }}
        >
          Contact Nima
        </Link>
      </div>

      {/* Internal links */}
      <p className="mt-8 text-sm text-gray-400 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        Related:{" "}
        <Link href="/ai-content-creation-specialist" className="text-blue-400 hover:text-blue-300 underline">
          AI Content Creation Specialist
        </Link>{" "}
        ·{" "}
        <Link href="/ai-marketing-expert" className="text-blue-400 hover:text-blue-300 underline">
          AI Marketing Specialist
        </Link>{" "}
        ·{" "}
        <Link href="/ai-branding-specialist" className="text-blue-400 hover:text-blue-300 underline">
          AI Branding Specialist
        </Link>
      </p>
    </main>
  );
}
