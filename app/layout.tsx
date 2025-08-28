// app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SideMenu from '../components/SideMenu'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nimasaraeian.com'),
  title: {
    default: 'Nima Saraeian | AI & Digital Psychology Expert',
    template: '%s | Nima Saraeian'
  },
  description: 'Nima Saraeian - AI-driven psychological researcher, digital psychology expert, and founder of Selphlyze. Specializing in consumer behavior, psychometrics, and AI-powered psychological analysis.',
  keywords: ['Nima Saraeian', 'AI Psychology', 'Digital Psychology', 'Selphlyze', 'Consumer Behavior', 'Psychometrics', 'AI Research', 'Psychological Analysis', 'UX Psychology', 'Behavioral Analytics'],
  authors: [{ name: 'Nima Saraeian' }],
  creator: 'Nima Saraeian',
  publisher: 'Nima Saraeian',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.nimasaraeian.com',
    title: 'Nima Saraeian | AI & Digital Psychology Expert',
    description: 'AI-driven psychological researcher and digital psychology expert. Founder of Selphlyze platform for psychological analysis.',
    siteName: 'Nima Saraeian',
    images: [
      {
        url: '/image/nima-bw.jpg',
        width: 1200,
        height: 630,
        alt: 'Nima Saraeian - AI & Psychology Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nima Saraeian | AI & Digital Psychology Expert',
    description: 'AI-driven psychological researcher and digital psychology expert. Founder of Selphlyze platform.',
    images: ['/image/nima-bw.jpg'],
    creator: '@nimasaraeian',
  },
  verification: {
    google: 'googlea749cf479c48223f',
  },
  alternates: {
    canonical: 'https://www.nimasaraeian.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nima Saraeian",
    "url": "https://www.nimasaraeian.com",
    "image": "https://www.nimasaraeian.com/image/nima-bw.jpg",
    "jobTitle": "AI & Digital Psychology Expert",
    "description": "AI-driven psychological researcher and digital psychology expert. Founder of Selphlyze platform.",
    "knowsAbout": [
      "Artificial Intelligence",
      "Digital Psychology", 
      "Consumer Behavior",
      "Psychometrics",
      "UX Psychology",
      "Behavioral Analytics"
    ],
    "founder": {
      "@type": "Organization",
      "name": "Selphlyze",
      "description": "AI-powered psychological analysis platform"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Master's in E-Commerce"
    },
    "sameAs": [
      "https://www.nimasaraeian.com"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="bg-black text-white font-sans">

        {/* Header with Signature */}
        <header className="bg-black py-8 px-6 flex flex-col items-center shadow-md border-b border-gray-800 relative z-40">
          <Link href="/" className="block mb-4">
            <Image
              src="/image/signature-white.png"
              alt="Nima Saraeian Signature"
              width={200}
              height={70}
              className="object-contain max-h-[70px]"
              priority
            />
          </Link>
          
          {/* Navigation Menu */}
          <SideMenu />
        </header>

        {/* Main Content */}
        <main className="min-h-screen px-4 md:px-12 py-12">
          {children}
        </main>

        {/* Footer with Signature */}
        <footer className="bg-black py-12 text-center border-t border-gray-800">
          <div className="flex justify-center items-center">
            <Image
              src="/image/signature-white.png"
              alt="Nima Signature"
              width={200}
              height={80}
              className="opacity-90"
            />
          </div>
        </footer>

      </body>
    </html>
  )
}