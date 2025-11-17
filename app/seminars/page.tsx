'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function SeminarsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedImage(null);
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [selectedImage]);

  // تولید خودکار لیست عکس‌ها با Alt tags بهینه
  const seminars = Array.from({ length: 29 }, (_, i) => {
    const imageNumber = i + 2;
    // برخی عکس‌ها .JPG و برخی .jpg هستند
    const extension = imageNumber >= 26 ? '.JPG' : '.jpg';
    
    // Alt tags بهینه برای SEO - شامل نام فارسی و انگلیسی
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

  // Schema.org برای تصاویر - شامل نام فارسی
  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Nima Saraeian نیما سرائیان International Seminars & Talks",
    "description": "Collection of seminar and conference presentations by Nima Saraeian نیما سرائیان on AI, Digital Psychology, and Innovation",
    "url": "https://www.nimasaraeian.com/seminars",
    "image": seminars.map(seminar => ({
      "@type": "ImageObject",
      "url": `https://www.nimasaraeian.com${seminar.src}`,
      "name": seminar.title,
      "description": seminar.description,
      "altText": seminar.alt,
      "width": 800,
      "height": 600,
      "datePublished": `${seminar.date}-01-01`,
      "author": {
        "@type": "Person",
        "name": "Nima Saraeian نیما سرائیان",
        "alternateName": "نیما سرائیان",
        "jobTitle": "AI & Digital Psychology Expert",
        "url": "https://www.nimasaraeian.com"
      }
    }))
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(imageSchema),
        }}
      />
      
      {/* بک‌گراند مدرن */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08)_0%,transparent_70%)]"></div>

      {/* ذرات معلق */}
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
        {/* هدر */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-snug drop-shadow-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            International Seminars & Talks
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Presentations on <span className="font-semibold text-white">AI</span>, 
            <span className="font-semibold text-white"> Digital Psychology</span>, and 
            <span className="font-semibold text-white"> Innovation</span> across global conferences.
          </p>
        </div>

        {/* گالری */}
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
            {seminars.map((seminar, index) => (
              <Link
                key={seminar.id}
                href={`/seminars/${seminar.id}`}
                className="break-inside-avoid group cursor-pointer transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30 block"
                style={{
                  animationDelay: `${index * 80}ms`,
                  opacity: 0,
                  animation: `fadeInUp 0.8s ease-out ${index * 80}ms forwards`
                }}
              >
                <div className="relative bg-gradient-to-br from-gray-800/70 to-gray-900/50 rounded-2xl border border-white/10 backdrop-blur-lg overflow-hidden hover:border-white/30 transition-all duration-700">
                  <Image
                    src={seminar.src}
                    alt={seminar.alt}
                    width={800}
                    height={600}
                    placeholder="blur"
                    blurDataURL="/image/nima-bw.jpg"
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000"
                    loading="lazy"
                    quality={85}
                    title={seminar.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                  {/* اطلاعات روی عکس */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end">
                    <div className="p-5 text-white">
                      <h3 className="text-lg font-bold mb-2">{seminar.title}</h3>
                      <p className="text-sm text-gray-300">📅 {seminar.date} | 📍 {seminar.location}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* مودال */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl max-h-full">
              <Image
                src={selectedImage}
                alt="Nima Saraeian Seminar Presentation - High Resolution View"
                width={1400}
                height={1000}
                className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl border border-white/20"
                quality={95}
                title="Nima Saraeian Seminar - Full Resolution"
                sizes="100vw"
                unoptimized
              />
              <button
                className="absolute top-6 right-6 w-12 h-12 bg-black/60 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300 border border-white/20 text-xl font-bold"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
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
  );
}
