import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { articles } from '../data';

export const metadata: Metadata = {
  title: 'AI Articles - Nima Saraeian',
  description: 'Explore artificial intelligence articles and insights by Nima Saraeian',
};

export default function AIArticlesPage() {
  const aiArticles = articles.filter(article => article.category === 'ai');

  return (
    <main className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            ðŸ¤– AI Articles
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore insights and deep dives in artificial intelligence.
          </p>
        </header>

        {/* Articles Grid */}
        {aiArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {aiArticles.map((article) => (
              <Link
                key={article.id}
                href={article.href}
                className="group block bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Article Image */}
                {article.imageUrl && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  </div>
                )}
                
                {/* Article Content */}
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  {/* Read more link */}
                  <p className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                    Read more about {article.title.split(':')[0] || article.title.split(' ').slice(0, 3).join(' ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-8">
              AI articles are generated automatically—check back in a moment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
