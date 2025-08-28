import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Daily Insights - Nima Saraeian',
  description: 'Explore daily insights and personal development articles by Nima Saraeian',
};

export default function DailyInsightsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            🌟 Daily Insights
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            نکات روزانه و توسعه فردی توسط نیما سرائیان
          </p>
        </header>

        <div className="text-center">
          <p className="text-gray-500 mb-8">
            مقالات نکات روزانه به صورت خودکار تولید می‌شوند
          </p>
          <Link 
            href="/admin/content" 
            className="inline-block px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
          >
            مدیریت تولید محتوا
          </Link>
        </div>
      </div>
    </main>
  );
}
