import { Metadata } from 'next';
import ContentManager from '@/components/ContentManager';

export const metadata: Metadata = {
  title: 'Content Management - Nima Saraeian',
  description: 'Manage automated content generation for psychology, AI, marketing, and daily insights articles',
  robots: 'noindex, nofollow',
};

export default function ContentManagementPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Content Management Panel
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            مدیریت تولید خودکار مقالات روزانه برای سایت Nima Saraeian
          </p>
        </header>

        {/* Content Manager Component */}
        <ContentManager />

        {/* Additional Information */}
        <div className="mt-16 p-8 bg-gray-900 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            راهنمای استفاده از سیستم
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                🚀 نحوه کارکرد
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• سیستم روزانه 4 مقاله تولید می‌کند</li>
                <li>• هر مقاله حداقل 1000 کلمه است</li>
                <li>• تصاویر مناسب با DALL-E تولید می‌شود</li>
                <li>• مقالات در دسته‌های مختلف قرار می‌گیرند</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-400">
                📝 دسته‌بندی مقالات
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Psychology:</strong> روانشناسی و سلامت روان</li>
                <li>• <strong>AI:</strong> هوش مصنوعی و تکنولوژی</li>
                <li>• <strong>Marketing:</strong> بازاریابی و برندینگ</li>
                <li>• <strong>Daily:</strong> نکات روزانه و توسعه فردی</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">
              ⚠️ نکات مهم
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• API Key OpenAI باید معتبر باشد</li>
              <li>• تولید مقالات ممکن است چند دقیقه طول بکشد</li>
              <li>• تصاویر در پوشه public/image ذخیره می‌شوند</li>
              <li>• مقالات در app/articles/[category] قرار می‌گیرند</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
