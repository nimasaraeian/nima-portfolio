import Image from "next/image";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nima Saraeian | AI Marketing Strategist',
  description: 'Official website of Nima Saraeian, AI Marketing Strategist, founder of Selflyzer, and expert in AI-driven marketing and consumer behavior analysis.',
  keywords: 'Nima Saraeian, AI Marketing, Marketing Strategy, Selflyzer, Consumer Behavior, AI-Driven Marketing, Digital Marketing',
  openGraph: {
    title: 'Nima Saraeian | AI Marketing Strategist',
    description: 'AI Marketing Strategist and researcher at the intersection of artificial intelligence and digital marketing.',
    url: 'https://www.nimasaraeian.com',
    siteName: 'Nima Saraeian',
    images: [
      {
        url: '/image/nima-pic.png',
        width: 1200,
        height: 630,
        alt: 'Nima Saraeian - AI & Psychology Expert',
      },
    ],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="flex items-center justify-center px-4 py-16 min-h-screen">
        <div className="relative max-w-4xl w-full">
          
          {/* Main Content Card */}
          <div className="relative bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl transition-colors duration-300">
            
            {/* Profile Image - Simple Black and White */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image
                  src="/image/nima-pic.png"
                  alt="Nima Saraeian نیما سرائیان - AI Marketing Strategist"
                  width={200}
                  height={200}
                  className="rounded-full grayscale border-2 border-black/20 dark:border-white/20 shadow-xl transition-all duration-300"
                  priority
                  sizes="200px"
                  unoptimized
                />
              </div>
            </div>

            {/* Name and Title */}
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-4 italic transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Nima Saraeian
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light tracking-wide transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                AI Marketing Strategist
              </h2>
            </div>

            {/* Main Description */}
            <div className="prose prose-lg max-w-none text-center space-y-6">
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed italic transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                I'm a strategist and researcher at the intersection of <span className="text-black dark:text-white font-semibold transition-colors duration-300">artificial intelligence and digital marketing</span>. 
                My mission is to help businesses harness the power of AI to create smarter campaigns, predict consumer behavior, and drive sustainable growth.
              </p>
              
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                As the founder of <span className="font-bold text-black dark:text-white transition-colors duration-300">Selflyzer</span>, 
                I've developed AI-powered psychometric tools that decode emotional and behavioral patterns, turning complex data into actionable marketing strategies.
              </p>

              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                With more than a decade of leadership in marketing, branding, and business strategy, I've led cross-functional teams, 
                built innovative campaigns, and spoken at industry events about the future of AI-driven marketing. My work combines data science, 
                psychology, and strategy to deliver human-centered, high-impact results.
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Explore Research
              </button>
              <button className="px-8 py-3 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black rounded-full font-semibold transition-all duration-300 transform hover:scale-105" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                View Projects
              </button>
            </div>

            {/* Signature */}
            <div className="flex justify-center mt-10">
              <Image
                src="/image/signature-white.png"
                alt="Nima Saraeian Signature"
                width={220}
                height={80}
                className="opacity-90 hover:opacity-100 transition-opacity duration-300 dark:invert-0 invert"
                sizes="220px"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}