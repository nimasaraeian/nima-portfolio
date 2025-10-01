import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Psychology Articles - Nima Saraeian',
  description: 'Explore psychology articles and insights by Nima Saraeian',
};

export default function PsychologyArticlesPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            🧠 Psychology Articles
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            مقالات روانشناسی و سلامت روان توسط نیما سرائیان
          </p>
        </header>

        <div className="text-center">
          <p className="text-gray-500 mb-8">
            مقالات روانشناسی به صورت خودکار تولید می‌شوند
          </p>
        </div>
      </div>
    </main>
  );
}
