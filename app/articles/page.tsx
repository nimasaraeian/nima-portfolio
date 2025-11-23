import Link from "next/link";
import Image from "next/image";

export default function ArticlesPage() {
  const aiArticles = [
    { title: "AI Marketing Skills 2025: The Essential Skill Map for the Next Generation of Marketing Specialists", image: "/image/A_promotional_digital_photograph_with_text_overlay.png", href: "/articles/ai/ai-marketing-skills-2025" },
    { title: "What Does an AI Marketing Specialist Do? (2025 Full Guide)", image: "/image/ai-marketing-specialist-real-hero-image.jpg", href: "/what-does-an-ai-marketing-specialist-do" },
    { title: "Generative AI for Creative Marketing", image: "/image/Generative AI for Creative Marketing.png", href: "/articles/ai/generative-ai-creative-marketing" },
    { title: "Emotion AI in 2025: How Artificial Emotional Intelligence Is Transforming Human–Machine Interaction", image: "/image/emotion-ai-human-machine-interaction-emotional-analysis-2025.jpg", href: "/articles/ai/emotion-ai" },
    { title: "AI Personalities: Will Artificial Intelligence Develop a Real Personality by 2026?", image: "/image/ai-personality-human-ai-interaction-artificial-emotion-analysis.jpg", href: "/articles/ai/personality-models" },
  ];

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Static background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.04),transparent_50%)] pointer-events-none" />
      
      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block">
              <span className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 mb-4">
                AI Marketing Insights
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              AI Marketing Articles
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Deep insights into AI-driven marketing strategies, behavioral psychology, and predictive analytics
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {aiArticles.map((card, index) => (
              <Link 
                key={index} 
                href={card.href} 
                className="group block"
              >
                <article className="relative h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-colors duration-200 hover:shadow-lg hover:shadow-blue-500/5">
                  {/* Image Container - Fixed aspect ratio to prevent CLS */}
                  <div className="relative w-full bg-gray-900 overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={800}
                      height={600}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full h-full object-contain"
                      loading={index === 0 ? "eager" : "lazy"}
                      quality={75}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 lg:p-6 relative z-10">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200 leading-tight flex-1">
                        {card.title}
                      </h3>
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500/40 transition-colors duration-200">
                        <svg 
                          className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors duration-200" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      Explore insights and strategies for AI-powered marketing
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center">
            <div className="inline-block px-8 py-4 bg-blue-600/10 border border-blue-500/20 rounded-full">
              <p className="text-gray-400 text-sm">
                More articles coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
