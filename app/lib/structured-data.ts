/**
 * Structured Data Helpers
 * Utilities for generating consistent JSON-LD schemas
 */

import { getSiteBase } from './seo'

const SITE_BASE = getSiteBase()

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema({
  name,
  description,
  url,
  isPartOf = SITE_BASE,
}: {
  name: string
  description: string
  url: string
  isPartOf?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Nima Saraeian",
      "url": isPartOf
    },
    "about": {
      "@type": "Thing",
      "name": "AI Marketing"
    }
  }
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nima Saraeian",
    "url": SITE_BASE,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_BASE}/image/nima-bw.jpg`,
      "width": 512,
      "height": 512
    },
    "sameAs": [
      "https://www.linkedin.com/in/nimasaraian/",
      "https://x.com/NSaraeian",
      "https://www.instagram.com/nima.saraeian",
      "https://www.youtube.com/@nimasaraeian8664",
    ]
  }
}


















