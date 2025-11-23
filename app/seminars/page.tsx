import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nima Saraeian International Seminars & Conference Presentations | AI Psychology Expert نیما سرائیان',
  description: 'View Nima Saraeian (نیما سرائیان) international conference presentations on AI, Digital Psychology, Consumer Behavior, Psychometrics, and Innovation. Expert speaker in artificial intelligence, emotional intelligence, and behavioral analytics.',
  keywords: [
    'Nima Saraeian',
    'نیما سرائیان',
    'AI psychology seminars',
    'digital psychology conferences',
    'psychometric expert speaker',
    'consumer behavior presentations',
    'artificial intelligence talks',
    'emotional intelligence seminars',
    'behavioral analytics conferences',
    'neuromarketing expert',
    'UX psychology speaker',
    'mental health technology',
    'personality profiling',
    'AI ethics seminars',
    'cognitive science conferences',
  ],
  authors: [{ name: 'Nima Saraeian نیما سرائیان' }],
  creator: 'Nima Saraeian',
  publisher: 'Nima Saraeian',
  alternates: {
    canonical: 'https://nimasaraeian.com/seminars',
  },
  openGraph: {
    title: 'Nima Saraeian International Seminars & Conference Presentations',
    description: 'Dr. Nima Saraeian (نیما سرائیان) presenting at international conferences on AI-powered psychology, digital consumer behavior, psychometric analysis, and innovation in mental health technology.',
    url: 'https://nimasaraeian.com/seminars',
    siteName: 'Nima Saraeian نیما سرائیان',
    locale: 'en_US',
    alternateLocale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: 'https://nimasaraeian.com/image/nimasaraeian2.jpg',
        width: 1200,
        height: 630,
        alt: 'Nima Saraeian presenting at international AI psychology conference',
      },
      {
        url: 'https://nimasaraeian.com/image/nimasaraeian3.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Nima Saraeian seminar on consumer behavior and psychometrics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nima Saraeian International Seminars نیما سرائیان',
    description: 'AI Psychology Expert Nima Saraeian speaking at international conferences',
    images: ['https://nimasaraeian.com/image/nimasaraeian2.jpg'],
    creator: '@nimasaraeian',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Generate seminars data
  const seminars = Array.from({ length: 29 }, (_, i) => {
    const imageNumber = i + 2;
    const extension = imageNumber >= 26 ? '.JPG' : '.jpg';
    
    const altTexts = [
      `Nima Saraeian نیما سرائیان presenting AI and Digital Psychology at International Conference ${imageNumber}`,
      `Dr. Nima Saraeian نیما سرائیان seminar on Consumer Behavior and Psychometrics ${imageNumber}`,
      `Nima Saraeian نیما سرائیان keynote speech about AI-Powered Psychological Analysis ${imageNumber}`,
      `Seminar by Nima Saraeian نیما سرائیان on Digital Psychology and Behavioral Analytics ${imageNumber}`,
      `Nima Saraeian نیما سرائیان presenting research on Emotional Intelligence and AI ${imageNumber}`,
      `Dr. Nima Saraeian نیما سرائیان workshop on UX Psychology and Neural Feedback ${imageNumber}`,
      `Nima Saraeian نیما سرائیان conference presentation on Personality Models and AI ${imageNumber}`,
      `Seminar about Psychometrics and AI by Nima Saraeian نیما سرائیان ${imageNumber}`,
      `Nima Saraeian نیما سرائیان speaking about SelfCode and Digital Psychology ${imageNumber}`,
      `AI Ethics seminar presented by Nima Saraeian نیما سرائیان ${imageNumber}`,
      `Nima Saraeian نیما سرائیان presenting Aesthlyzer AI platform ${imageNumber}`,
      `Digital Psychology conference by Dr. Nima Saraeian نیما سرائیان ${imageNumber}`,
      `Nima Saraeian نیما سرائیان seminar on Emotion AI and Consumer Behavior ${imageNumber}`,
      `AI-Powered Content Specialist presentation by Nima Saraeian نیما سرائیان ${imageNumber}`,
      `Nima Saraeian نیما سرائیان workshop on Neural Feedback and Psychology ${imageNumber}`,
      `Seminar about Personality Models in AI by Nima Saraeian نیما سرائیان ${imageNumber}`,
      `Nima Saraeian نیما سرائیان presenting Psychometrics research ${imageNumber}`,
      `SelfCode platform demonstration by Nima Saraeian نیما سرائیان ${imageNumber}`,
      `AI Ethics in Psychology seminar by Dr. Nima Saraeian نیما سرائیان ${imageNumber}`,
      `Nima Saraeian نیما سرائیان presenting Aesthlyzer AI analysis ${imageNumber}`,
      `Digital Psychology insights by Nima Saraeian نیما سرائیان ${imageNumber}`,
      `Emotion AI seminar presented by Nima Saraeian نیما سرائیان ${imageNumber}`,
      `AI Content Specialist workshop by Dr. Nima Saraeian نیما سرائیان ${imageNumber}`,
      `Neural Feedback research by Nima Saraeian نیما سرائیان ${imageNumber}`,
      `Personality Models in AI by Nima Saraeian نیما سرائیان ${imageNumber}`,
      `Psychometrics seminar by Dr. Nima Saraeian نیما سرائیان ${imageNumber}`,
      `SelfCode AI platform by Nima Saraeian نیما سرائیان ${imageNumber}`,
      `AI Ethics presentation by Nima Saraeian نیما سرائیان ${imageNumber}`,
      `Aesthlyzer demonstration by Dr. Nima Saraeian نیما سرائیان ${imageNumber}`
    ];
    
    return {
      id: imageNumber,
      src: `/image/nimasaraeian${imageNumber}${extension}`,
      title: `Nima Saraeian Seminar ${imageNumber}`,
      alt: altTexts[i % altTexts.length],
      date: 2025 - Math.floor(i / 3),
      location: `International Conference ${imageNumber}`,
      description: `Nima Saraeian presenting on AI, Digital Psychology, and Innovation at international conference ${imageNumber}`,
    };
  });

// Structured Data
const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Nima Saraeian نیما سرائیان International Seminars & Talks",
    "description": "Collection of seminar and conference presentations by Nima Saraeian نیما سرائیان on AI, Digital Psychology, and Innovation",
  "url": "https://nimasaraeian.com/seminars",
    "image": seminars.map(seminar => ({
      "@type": "ImageObject",
    "url": `https://nimasaraeian.com${seminar.src}`,
      "name": seminar.title,
      "description": seminar.description,
      "altText": seminar.alt,
      "width": 800,
      "height": 600,
      "datePublished": `${seminar.date}-01-01`,
      "author": {
        "@type": "Person",
      "name": "Nima Saraeian",
        "alternateName": "نیما سرائیان",
        "jobTitle": "AI & Digital Psychology Expert",
      "url": "https://nimasaraeian.com"
      }
    }))
  };

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://nimasaraeian.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Seminars",
      "item": "https://nimasaraeian.com/seminars"
    }
  ]
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nima Saraeian",
  "alternateName": "نیما سرائیان",
  "jobTitle": "AI & Digital Psychology Expert",
  "url": "https://nimasaraeian.com",
  "sameAs": [
    "https://www.linkedin.com/in/nimasaraian/",
    "https://www.instagram.com/nima.saraeian",
    "https://x.com/NSaraeian"
  ],
  "knowsAbout": [
    "Artificial Intelligence",
    "Digital Psychology",
    "Consumer Behavior",
    "Psychometrics",
    "Behavioral Analytics",
    "Emotional Intelligence",
    "AI Ethics"
  ]
};

export default function SeminarsPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
        {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-600">›</li>
              <li className="text-gray-300" aria-current="page">
                Seminars
              </li>
            </ol>
          </nav>

          {/* Header Section */}
          <header className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-snug drop-shadow-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            International Seminars & Talks
          </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Presentations on <span className="font-semibold text-white">AI</span>, 
            <span className="font-semibold text-white"> Digital Psychology</span>, and 
            <span className="font-semibold text-white"> Innovation</span> across global conferences.
          </p>
            <p className="text-base text-gray-400 max-w-2xl mx-auto">
              Dr. Nima Saraeian (نیما سرائیان) is a recognized expert speaker in artificial intelligence, digital psychology, consumer behavior analysis, and psychometric research, presenting at international conferences worldwide.
            </p>
          </header>

          {/* Gallery Section */}
          <section aria-label="Seminar gallery" className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
            {seminars.map((seminar, index) => (
                <article
                key={seminar.id}
                className="break-inside-avoid group cursor-pointer transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30 block"
                style={{
                  animationDelay: `${index * 80}ms`,
                  opacity: 0,
                  animation: `fadeInUp 0.8s ease-out ${index * 80}ms forwards`
                }}
              >
                  <Link href={`/seminars/${seminar.id}`} className="block">
                <div className="relative bg-gradient-to-br from-gray-800/70 to-gray-900/50 rounded-2xl border border-white/10 backdrop-blur-lg overflow-hidden hover:border-white/30 transition-all duration-700">
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={seminar.src}
                      alt={seminar.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      loading={index < 6 ? "eager" : "lazy"}
                      quality={85}
                      title={seminar.title}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end pointer-events-none">
                      <div className="p-5 text-white w-full">
                            <h2 className="text-lg font-bold mb-2">{seminar.title}</h2>
                        <p className="text-sm text-gray-300">📅 {seminar.date} | 📍 {seminar.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
                </article>
            ))}
          </div>
          </section>

          {/* About Section */}
          <section className="max-w-4xl mx-auto mt-20 mb-12">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6 text-center">About Nima Saraeian's Seminars</h2>
              <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
                <p>
                  Dr. Nima Saraeian (نیما سرائیان) is an applied researcher and strategist at the intersection of AI, digital psychology, and consumer behavior. His international seminars introduce a new generation of psychological analysis—one that integrates artificial intelligence, behavioral science, and predictive modeling to understand how people think, feel, and decide in digital environments.
                </p>
                <p>
                  Nima's work bridges three worlds that rarely come together:
                </p>
                <p className="font-semibold text-white">
                  psychology, machine intelligence, and real-world consumer behavior.
                </p>
                <p>
                  His seminars translate complex scientific models into practical frameworks that brands, researchers, and technology teams can immediately apply.
                </p>
                <p>
                  Drawing from his research, including the SELPHLYZE project and advanced psychometric systems, Nima's presentations explore topics such as:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>
                    <strong className="text-white">AI-Driven Psychological Modeling & Behavior Analysis</strong>
                    <br />
                    <span className="text-gray-400">How AI uncovers emotional, cognitive, and motivational patterns hidden beneath user actions.</span>
                  </li>
                  <li>
                    <strong className="text-white">Digital Psychology & Emotional Intelligence in Modern systems</strong>
                    <br />
                    <span className="text-gray-400">How people form trust, make decisions, and react emotionally in digital spaces.</span>
                  </li>
                  <li>
                    <strong className="text-white">Next-Generation Psychometrics & Personality Profiling</strong>
                    <br />
                    <span className="text-gray-400">Using AI to evolve personality assessment beyond traditional scoring methods.</span>
                  </li>
                  <li>
                    <strong className="text-white">Behavioral Analytics & Predictive Consumer Modeling</strong>
                    <br />
                    <span className="text-gray-400">How brands can forecast user intent, hesitation points, and emotional triggers.</span>
                  </li>
                  <li>
                    <strong className="text-white">Cognitive Science, Neural Feedback & Decision Pathways</strong>
                    <br />
                    <span className="text-gray-400">Understanding how attention, memory, and cognitive load shape digital behavior.</span>
                  </li>
                  <li>
                    <strong className="text-white">AI Ethics in Psychology, Marketing & Human–Machine Interaction</strong>
                    <br />
                    <span className="text-gray-400">Practical guidelines for responsible data, emotion analysis, and predictive systems.</span>
                  </li>
                  <li>
                    <strong className="text-white">UX Psychology & Human-Centered AI Design</strong>
                    <br />
                    <span className="text-gray-400">Designing digital experiences based on cognitive flow, emotional clarity, and behavioral signals.</span>
                  </li>
                </ul>
                <p className="mt-6">
                  Nima's seminars are known for being deeply scientific yet highly practical—combining real data from AI systems, case studies from global brands, and psychological insights that help teams move beyond intuition and into measurable, behavior-driven strategy.
                </p>
                <p>
                  For speaking engagements, collaborations, or information about upcoming seminars, please{' '}
                  <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">
                    contact Nima Saraeian
                  </Link>.
                </p>
              </div>
            </div>
          </section>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
    </>
  );
}
