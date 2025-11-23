import Link from "next/link";
import { ReactNode } from "react";

export default function PageShell({ children }: { children: ReactNode }) {
  const nav = [
    { href: "/ai-content-creation-specialist", label: "AI Content Creation Specialist" },
    { href: "/ai-business-automation", label: "AI Business Automation Specialist" },
    { href: "/ai-marketing-specialist", label: "AI Marketing Specialist" },
    { href: "/ai-automation-consultant", label: "AI Automation Specialist" },
    { href: "/consumer-behavior-analyst", label: "Consumer Behavior Analyst" },
    { href: "/consumer-psychology-predictive-ai", label: "Consumer Psychology & Predictive Behavior Analyst" },
    { href: "/ai-branding-specialist", label: "AI Branding Specialist" },
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {nav.map(i => (
          <Link
            key={i.href}
            href={i.href}
            className="rounded-2xl border border-gray-700 p-3 shadow-sm hover:shadow-md transition text-white hover:text-blue-300"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            {i.label}
          </Link>
        ))}
      </nav>
      <article className="prose prose-invert prose-lg max-w-none text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        {children}
      </article>
      <footer className="mt-12 text-sm text-gray-400 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
        © {new Date().getFullYear()} Nima Saraeian — AI Content Strategist
      </footer>
    </main>
  );
}









