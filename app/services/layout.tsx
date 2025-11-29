import { Metadata } from "next";
import { SITE } from "../lib/site";

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

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

