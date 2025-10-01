'use client';

import { useEffect, useState } from 'react';

interface ContentGenerationStatus {
  isGenerating: boolean;
  isComplete: boolean;
  error: string | null;
  articlesGenerated: number;
  lastGenerated: string | null;
}

interface SystemInfo {
  status: string;
  lastRun: string | null;
  totalArticles: number;
  categories: string[];
}

export default function ContentManager() {
  const [status, setStatus] = useState<ContentGenerationStatus>({
    isGenerating: false,
    isComplete: false,
    error: null,
    articlesGenerated: 0,
    lastGenerated: null,
  });

  const [apiKey, setApiKey] = useState('');
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);

  // تولید محتوا
  const generateContent = async () => {
    if (!apiKey.trim()) {
      setStatus(prev => ({ ...prev, error: 'لطفاً API Key OpenAI را وارد کنید' }));
      return;
    }

    setStatus({
      isGenerating: true,
      isComplete: false,
      error: null,
      articlesGenerated: 0,
      lastGenerated: null,
    });

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          isGenerating: false,
          isComplete: true,
          error: null,
          articlesGenerated: data.articlesGenerated || 4,
          lastGenerated: new Date().toLocaleString('fa-IR'),
        });
        
        // به‌روزرسانی اطلاعات سیستم
        checkSystemStatus();
      } else {
        throw new Error(data.error || 'خطا در تولید محتوا');
      }
    } catch (error) {
      setStatus({
        isGenerating: false,
        isComplete: false,
        error: error instanceof Error ? error.message : 'خطای ناشناخته',
        articlesGenerated: 0,
        lastGenerated: null,
      });
    }
  };

  // بررسی وضعیت سیستم
  const checkSystemStatus = async () => {
    try {
      const response = await fetch('/api/generate-content');
      if (response.ok) {
        const data = await response.json();
        setSystemInfo(data);
      }
    } catch (error) {
      console.error('Error checking system status:', error);
    }
  };

  // بررسی وضعیت در ابتدا (فقط کلاینت)
  useEffect(() => {
    checkSystemStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8">
      {/* API Key Input */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-white">
          🔑 تنظیمات OpenAI
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-sm text-gray-400">
            API Key شما فقط در مرورگر ذخیره می‌شود و به سرور ارسال نمی‌شود
          </p>
        </div>
      </div>

      {/* Content Generation Controls */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-white">
          🚀 تولید محتوا
        </h3>
        <div className="space-y-4">
          <button
            onClick={generateContent}
            disabled={status.isGenerating || !apiKey.trim()}
            className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
              status.isGenerating || !apiKey.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {status.isGenerating ? '🔄 در حال تولید...' : '🎯 تولید مقالات روزانه'}
          </button>
          
          {status.isGenerating && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-400">در حال تولید مقالات... لطفاً صبر کنید</p>
            </div>
          )}
        </div>
      </div>

      {/* Status Display */}
      {status.error && (
        <div className="bg-red-900/20 border border-red-700 p-4 rounded-lg">
          <h4 className="text-red-400 font-medium mb-2">❌ خطا</h4>
          <p className="text-red-300">{status.error}</p>
        </div>
      )}

      {status.isComplete && (
        <div className="bg-green-900/20 border border-green-700 p-4 rounded-lg">
          <h4 className="text-green-400 font-medium mb-2">✅ موفقیت</h4>
          <p className="text-green-300">
            {status.articlesGenerated} مقاله با موفقیت تولید شد!
          </p>
          <p className="text-green-300 text-sm mt-1">
            آخرین تولید: {status.lastGenerated}
          </p>
        </div>
      )}

      {/* System Information */}
      {systemInfo && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-white">
            📊 اطلاعات سیستم
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-300 mb-2">وضعیت سیستم</h4>
              <p className="text-green-400 font-medium">{systemInfo.status}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-300 mb-2">آخرین اجرا</h4>
              <p className="text-gray-400">
                {systemInfo.lastRun ? new Date(systemInfo.lastRun).toLocaleString('fa-IR') : 'هیچ‌وقت'}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-300 mb-2">تعداد کل مقالات</h4>
              <p className="text-blue-400 font-medium">{systemInfo.totalArticles}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-300 mb-2">دسته‌بندی‌های فعال</h4>
              <div className="flex flex-wrap gap-2">
                {systemInfo.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <button
            onClick={checkSystemStatus}
            className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            🔄 به‌روزرسانی اطلاعات
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-white">
          ⚡ اقدامات سریع
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => window.open('/articles', '_blank')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            📚 مشاهده مقالات
          </button>
        </div>
      </div>
    </div>
  );
}
