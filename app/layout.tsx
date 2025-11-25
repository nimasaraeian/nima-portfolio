// app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaSquareXTwitter, FaYoutube } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import SideMenu from '../components/SideMenu'

export const metadata: Metadata = {
  metadataBase: new URL('https://nimasaraeian.com'),
  title: 'Nima Saraeian | AI Marketing Specialist & Behavioral Marketing Strategist',
  description: 'Nima Saraeian is an AI Marketing Specialist who builds AI-powered marketing systems that combine consumer psychology, data, and automation to predict behavior and drive measurable growth.',
  keywords: ['Nima Saraeian', 'AI Marketing', 'Marketing Strategy', 'Selflyzer', 'Consumer Behavior', 'AI-Driven Marketing', 'Digital Marketing', 'Marketing Analytics', 'Behavioral Analytics', 'Data Science'],
  authors: [{ name: 'Nima Saraeian' }],
  creator: 'Nima Saraeian',
  publisher: 'Nima Saraeian',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://nimasaraeian.com',
    siteName: 'Nima Saraeian',
    title: 'Nima Saraeian | AI Marketing Specialist & Behavioral Marketing Strategist',
    description: 'Nima Saraeian is an AI Marketing Specialist who builds AI-powered marketing systems that combine consumer psychology, data, and automation to predict behavior and drive measurable growth.',
    images: [
      {
        url: 'https://nimasaraeian.com/nima-pic.png',
        width: 512,
        height: 512,
        alt: 'Nima Saraeian — AI Marketing Strategist',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nima Saraeian | AI Marketing Specialist & Behavioral Marketing Strategist',
    description: 'Nima Saraeian is an AI Marketing Specialist who builds AI-powered marketing systems that combine consumer psychology, data, and automation to predict behavior and drive measurable growth.',
    images: ['https://nimasaraeian.com/nima-pic.png'],
    creator: '@nimasaraeian',
  },
  icons: {
    icon: [
      { url: '/nima-pic.png', sizes: '16x16', type: 'image/png' },
      { url: '/nima-pic.png', sizes: '32x32', type: 'image/png' },
      { url: '/nima-pic.png', sizes: '96x96', type: 'image/png' },
      { url: '/nima-pic.png', sizes: '192x192', type: 'image/png' },
      { url: '/nima-pic.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/nima-pic.png',
    apple: [
      { url: '/nima-pic.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 'googlea749cf479c48223f',
  },
  other: {
    'google-site-verification': 'googlea749cf479c48223f',
    'google-analytics': 'G-XXXXXXXXXX',
  },
}

const socialLinks: { name: string; href: string; icon: IconType }[] = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/nimasaraian/', icon: FaLinkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/nima.saraeian?igsh=YWN5d2s5bmRlY2xm&utm_source=qr', icon: FaInstagram },
  { name: 'YouTube', href: 'http://www.youtube.com/@nimasaraeian8664', icon: FaYoutube },
  { name: 'Facebook', href: 'https://www.facebook.com/nima.saraeian', icon: FaFacebook },
  { name: 'X', href: 'https://x.com/NSaraeian', icon: FaSquareXTwitter },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nima Saraeian",
    "url": "https://www.nimasaraeian.com",
    "image": [
      "https://www.nimasaraeian.com/image/nima-pic.png",
      "https://www.nimasaraeian.com/image/nima-bw.jpg"
    ],
    "jobTitle": "AI Marketing Strategist",
    "description": "AI Marketing Strategist and researcher at the intersection of artificial intelligence and digital marketing. Founder of Selflyzer platform.",
    "knowsAbout": [
      "Artificial Intelligence",
      "Digital Marketing", 
      "Consumer Behavior",
      "Marketing Strategy",
      "Data Science",
      "Behavioral Analytics"
    ],
    "founder": {
      "@type": "Organization",
      "name": "Selflyzer",
      "description": "AI-powered marketing strategy platform"
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/nima-pic.png" />
        <link rel="shortcut icon" type="image/png" href="/nima-pic.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/nima-pic.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="bg-black text-white font-sans">
          {/* Header with Signature */}
          <header className="bg-black py-3 sm:py-5 md:py-8 px-2 sm:px-3 md:px-6 flex flex-col items-center shadow-md border-b border-gray-800 relative z-40 w-full overflow-hidden">
            <Link href="/" className="block mb-1.5 sm:mb-2 md:mb-4">
              <Image
                src="/image/signature-white.png"
                alt="Nima Saraeian Signature"
                width={200}
                height={70}
                className="object-contain max-h-[45px] sm:max-h-[55px] md:max-h-[70px] w-auto"
                priority
                quality={90}
                sizes="(max-width: 640px) 140px, (max-width: 768px) 170px, 200px"
              />
            </Link>
            
            {/* Navigation Menu */}
            <div className="w-full max-w-full overflow-hidden">
            <SideMenu />
            </div>
          </header>

          {/* Main Content */}
          <main className="min-h-screen px-3 sm:px-4 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 bg-black w-full overflow-x-hidden">
            {children}
          </main>

          {/* Footer with Signature */}
          <footer className="bg-black py-6 sm:py-8 md:py-12 text-center border-t border-gray-800 w-full">
            <div className="flex justify-center items-center">
              <Image
                src="/image/signature-white.png"
                alt="Nima Signature"
                width={200}
                height={80}
                className="opacity-90 max-h-[60px] sm:max-h-[70px] md:max-h-[80px] w-auto"
                loading="lazy"
                quality={90}
                sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 200px"
              />
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
              <p className="text-sm text-gray-400 uppercase tracking-[0.3em]">Social</p>
              <div className="flex items-center gap-4 sm:gap-5">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <Link
                    key={name}
                    href={href || '#'}
                    aria-label={name}
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 bg-gray-900/40 transition hover:border-white/70 hover:bg-white/10"
                  >
                    <span className="text-lg text-gray-300 transition group-hover:text-white">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </footer>
      </body>
    </html>
  )
}