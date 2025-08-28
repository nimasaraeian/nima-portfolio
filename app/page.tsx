import Image from "next/image";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nima Saraeian | AI & Digital Psychology Expert',
  description: 'Official website of Nima Saraeian, AI-driven psychological researcher, founder of Selflyzer, and expert in digital psychology and cognitive science.',
  keywords: 'Nima Saraeian, Digital Psychology, AI Psychology, Selflyzer, Cognitive Science, Psychometric Systems',
  openGraph: {
    title: 'Nima Saraeian | AI & Digital Psychology',
    description: 'Researcher and innovator in digital psychology, AI, and cognitive science.',
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
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="flex items-center justify-center px-4 py-16 min-h-screen">
        <div className="relative max-w-4xl w-full">
          
          {/* Main Content Card */}
          <div className="relative bg-black border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            
            {/* Profile Image - Simple Black and White */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image
                  src="/image/nima-pic.png"
                                              alt="Nima Saraeian نیما سرائیان - AI & Psychology Expert"
                  width={200}
                  height={200}
                  className="rounded-full grayscale border-2 border-white/20 shadow-xl"
                  priority
                />
              </div>
            </div>

            {/* Name and Title */}
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 italic" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Nima Saraeian
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-300 font-light tracking-wide" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                AI & Digital Psychology Expert
              </h2>
            </div>

            {/* Main Description */}
            <div className="prose prose-lg prose-invert max-w-none text-center space-y-6">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                I'm a researcher and innovator in the field of <span className="text-white font-semibold">digital psychology</span>, 
                deeply passionate about artificial intelligence and cognitive science.
              </p>
              
              <p className="text-base md:text-lg text-gray-400 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                As the founder of <span className="font-bold text-white">Selflyzer</span>, 
                I specialize in designing AI-powered psychometric systems to uncover emotional, behavioral, and cognitive patterns.
              </p>

              <p className="text-base md:text-lg text-gray-400 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                With over a decade of experience in marketing, branding, and executive leadership, I've led large-scale teams, 
                managed high-level strategies, and spoken at numerous industry events. My background combines scientific exploration 
                with real-world impact — helping people and businesses make smarter, more human-centered decisions.
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <button className="px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Explore Research
              </button>
              <button className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black rounded-full font-semibold transition-all duration-300 transform hover:scale-105" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
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
                className="opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}