import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.nimasaraeian.com";
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
    "seminars",
    "contact",
    "research"
  ];

  // Add individual seminar image pages
  const seminarPages = Array.from({ length: 29 }, (_, i) => ({
    url: `${base}/seminars/${i + 2}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  const mainRoutes = routes.map(r => ({
    url: `${base}/${r}`,
    lastModified: new Date().toISOString(),
    changeFrequency: r === "" ? "daily" as const : "weekly" as const,
    priority: r === "" ? 1 : 0.8
  }));

  return [...mainRoutes, ...seminarPages];
}

