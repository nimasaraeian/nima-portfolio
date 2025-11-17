import { Metadata } from 'next';
import Image from 'next/image';
import PageShell from "./PageShell";
import { articleJsonLd } from "../lib/pageJsonLd";
import { SITE } from "../lib/site";

type Section = { h2?: string; h3?: string; p?: string; image?: { src: string; alt: string } };

type PageConfig = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  keywords: string[];
  urlBase: string;
  sections: Section[];
  trParagraph: string;
  faParagraph: string;
  cta?: { label: string; href: string; utmCampaign: string };
  relatedLinks?: { href: string; label: string }[];
  image?: { src: string; alt: string };
};

export function generateMetadata(cfg: PageConfig): Metadata {
  const url = `${SITE.baseUrl}/${cfg.slug}`;
  return {
    title: cfg.metaTitle,
    description: cfg.metaDesc,
    keywords: cfg.keywords,
    openGraph: {
      title: cfg.metaTitle,
      description: cfg.metaDesc,
      url: url,
      type: 'article',
      images: [
        {
          url: cfg.image?.src || SITE.ogImage,
          width: 1200,
          height: 630,
          alt: cfg.image?.alt || cfg.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cfg.metaTitle,
      description: cfg.metaDesc,
      images: [cfg.image?.src || SITE.ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function PageBuilder(cfg: PageConfig) {
  const url = `${SITE.baseUrl}/${cfg.slug}`;
  const jsonLd = articleJsonLd({ title: cfg.metaTitle, description: cfg.metaDesc, url });
  const ctaUrl = cfg.cta ? `${cfg.cta.href}?utm_source=site&utm_medium=cta&utm_campaign=${cfg.cta.utmCampaign}` : '/contact';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageShell>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{cfg.title}</h1>
        
        {cfg.image && (
          <div className="my-8 flex justify-center">
            <Image
              src={cfg.image.src}
              alt={cfg.image.alt}
              width={600}
              height={315}
              className="w-1/2 h-auto rounded-lg"
              priority
            />
          </div>
        )}

        {cfg.sections.map((s, i) => (
          <section key={i} className="mb-8">
            {s.h2 && <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white mt-8">{s.h2}</h2>}
            {s.h3 && <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-200 mt-6">{s.h3}</h3>}
            {s.p && <p className="text-lg leading-relaxed mb-4 text-gray-300">{s.p}</p>}
            {s.image && (
              <div className="my-6">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  width={800}
                  height={450}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
          </section>
        ))}
        
        <hr className="my-8 border-gray-700" />
        
        <h3 className="text-2xl font-semibold mb-4 text-white">Türkçe</h3>
        <p lang="tr" className="text-lg leading-relaxed mb-6 text-gray-300">{cfg.trParagraph}</p>
        
        <h3 className="text-2xl font-semibold mb-4 text-white">فارسی</h3>
        <p lang="fa" dir="rtl" className="text-lg leading-relaxed mb-6 text-gray-300">{cfg.faParagraph}</p>
        
        {cfg.relatedLinks && cfg.relatedLinks.length > 0 && (
          <div className="mt-8 p-4 bg-gray-900 rounded-lg">
            <p className="text-gray-300 mb-3">Related Services:</p>
            <div className="flex flex-wrap gap-3">
              {cfg.relatedLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-blue-400 hover:text-blue-300 underline font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
        
        {cfg.cta && (
          <div className="mt-8 text-center">
            <a
              href={ctaUrl}
              className="inline-block rounded-xl border border-white px-6 py-3 hover:bg-white hover:text-black transition text-white font-semibold"
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            >
              {cfg.cta.label}
            </a>
          </div>
        )}
      </PageShell>
    </>
  );
}

