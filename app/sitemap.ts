import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nimasaraeian.com";
  
  // Only include indexable, canonical, 200 pages
  // Exclude: tool pages, dashboards, dev routes, API routes
  const routes = [
    "",
    "services",
    "ai-content-creation-specialist",
    "ai-business-automation",
    "ai-marketing-specialist",
    "ai-automation-consultant",
    "consumer-behavior-strategist",
    "consumer-psychology-predictive-ai",
    "ai-branding-specialist",
    "ai-marketing",
    "about",
    "articles",
    "projects",
    "decision-intelligence",
    "ai-system-design",
    "systems/dental-clinic-ai",
    "systems/selphlyze",
    "seminars",
    "contact",
    "research",
    "performance-marketing",
    "cro-copywriting",
    "what-does-an-ai-marketing-specialist-do",
  ];

  // Add individual seminar image pages (only indexable ones)
  const seminarPages = Array.from({ length: 29 }, (_, i) => ({
    url: `${base}/seminars/${i + 2}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  const mainRoutes = routes.map(r => ({
    url: r === "" ? base : `${base}/${r}`,
    lastModified: new Date().toISOString(),
    changeFrequency: r === "" ? "daily" as const : "weekly" as const,
    priority: r === "" ? 1 : 0.8
  }));

  return [...mainRoutes, ...seminarPages];
}

