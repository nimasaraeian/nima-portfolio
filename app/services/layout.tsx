import { Metadata } from "next";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: "AI Systems & Services | Decision Intelligence, Automation, CRO | Nima Saraeian",
  description:
    "AI Decision Systems Builder: decision systems, workflow automation, CRO, behavioral analysis, and custom AI tools. Diagnosis first, then systems.",
  alternates: { canonical: `${SITE.baseUrl}/services` },
  openGraph: {
    title: "AI Systems & Services | Decision Intelligence, Automation, CRO | Nima Saraeian",
    description:
      "AI Decision Systems Builder: decision systems, workflow automation, CRO, behavioral analysis, and custom AI tools.",
    url: `${SITE.baseUrl}/services`,
    type: "website",
    images: [{ url: `${SITE.baseUrl}${SITE.ogImage}` }]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Systems & Services | Decision Intelligence, Automation, CRO | Nima Saraeian",
    description:
      "AI Decision Systems Builder: decision systems, workflow automation, CRO, behavioral analysis, and custom AI tools.",
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

