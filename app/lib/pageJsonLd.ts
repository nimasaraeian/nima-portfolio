export function articleJsonLd(args: {
  title: string;
  description: string;
  url: string;
  date?: string;
}) {
  const { title, description, url, date } = args;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": "Nima Saraeian",
      "url": "https://www.nimasaraeian.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "datePublished": date || new Date().toISOString(),
    "dateModified": date || new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "Nima Saraeian",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.nimasaraeian.com/image/nima-bw.jpg"
      }
    }
  };
}

































