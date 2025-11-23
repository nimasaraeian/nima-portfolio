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
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.08),transparent_50%)] pointer-events-none" />
      
      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 mb-6 backdrop-blur-sm">
                AI Marketing Insights
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
              AI Marketing Articles
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
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
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <article className="relative h-full bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-950/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-800/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative w-full min-h-[300px] max-h-[400px] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={800}
                      height={600}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading={index < 2 ? "eager" : "lazy"}
                      quality={90}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 leading-tight flex-1">
                        {card.title}
                      </h3>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-500 group-hover:border-transparent transition-all duration-300">
                        <svg 
                          className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm lg:text-base leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                      Explore insights and strategies for AI-powered marketing
                    </p>
                    
                    {/* Bottom accent line */}
                    <div className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent group-hover:via-blue-500 transition-all duration-500" />
                  </div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-20 text-center">
            <div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
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
