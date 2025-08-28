import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Marketing Articles - Nima Saraeian',
  description: 'Explore marketing and branding articles by Nima Saraeian',
};

export default function MarketingArticlesPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            📈 Marketing Articles
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            مقالات بازاریابی و برندینگ توسط نیما سرائیان
          </p>
        </header>

        <div className="text-center">
          <p className="text-gray-500 mb-8">
            مقالات بازاریابی به صورت خودکار تولید می‌شوند
          </p>
          <Link 
            href="/admin/content" 
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            مدیریت تولید محتوا
          </Link>
        </div>
      </div>
    </main>
  );
}
