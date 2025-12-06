'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const tocItems = [
  { id: 'part-1', label: 'Part 1 — New Era' },
  { id: 'part-2', label: 'Part 2 — Foundations' },
  { id: 'part-3', label: 'Part 3 — Tech Stack' },
  { id: 'part-4', label: 'Part 4 — Content Systems' },
  { id: 'part-5', label: 'Part 5 — AI SEO' },
  { id: 'part-6', label: 'Part 6 — AI Advertising' },
  { id: 'part-7', label: 'Part 7 — Personalization' },
  { id: 'part-8', label: 'Part 8 — AI CRO' },
  { id: 'part-9', label: 'Part 9 — Automation' },
  { id: 'part-10', label: 'Part 10 — 2030 Outlook' },
];

interface Props {
  className?: string;
}

export default function SuperPillarToc({ className = '' }: Props) {
  const [activeId, setActiveId] = useState<string>('part-1');

  useEffect(() => {
    const elements = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label="Super Pillar Navigation"
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 ${className}`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Super Pillar Navigation</p>
      <ul className="mt-4 space-y-2">
        {tocItems.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className={`text-sm transition-colors ${
                activeId === item.id
                  ? 'text-white font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
              aria-current={activeId === item.id ? 'true' : undefined}
              scroll={false}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

