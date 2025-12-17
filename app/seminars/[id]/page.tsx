import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate metadata for each seminar image
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const imageNumber = parseInt(id);
  
  if (imageNumber < 2 || imageNumber > 30) {
    return {};
  }

  const extension = imageNumber >= 26 ? '.JPG' : '.jpg';
  const imageUrl = `https://nimasaraeian.com/image/nimasaraeian${imageNumber}${extension}`;
  
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

  const altText = altTexts[(imageNumber - 2) % altTexts.length];
  const title = `Nima Saraeian نیما سرائیان - Seminar ${imageNumber} | AI & Digital Psychology Expert`;
  const description = `Seminar presentation by Nima Saraeian نیما سرائیان on AI, Digital Psychology, and Innovation at International Conference ${imageNumber}`;

  return {
    title,
    description,
    keywords: ['Nima Saraeian', 'نیما سرائیان', 'AI Psychology', 'Digital Psychology', 'Seminar', 'Conference', 'Psychometrics', 'Consumer Behavior', 'AI Expert'],
    alternates: {
      canonical: `https://nimasaraeian.com/seminars/${imageNumber}`,
    },
    openGraph: {
      title: `Nima Saraeian نیما سرائیان - Seminar ${imageNumber}`,
      description,
      url: `https://nimasaraeian.com/seminars/${imageNumber}`,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 800,
          alt: altText,
          type: imageNumber >= 26 ? 'image/jpeg' : 'image/jpeg',
        },
      ],
      siteName: 'Nima Saraeian',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Nima Saraeian نیما سرائیان - Seminar ${imageNumber}`,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
  };
}

// Generate static params for all seminar images
export async function generateStaticParams() {
  return Array.from({ length: 29 }, (_, i) => ({
    id: String(i + 2),
  }));
}

export default async function SeminarImagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const imageNumber = parseInt(id);
  
  if (imageNumber < 2 || imageNumber > 30) {
    notFound();
  }

  const extension = imageNumber >= 26 ? '.JPG' : '.jpg';
  const imageSrc = `/image/nimasaraeian${imageNumber}${extension}`;
  const imageUrl = `https://nimasaraeian.com${imageSrc}`;

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

  const altText = altTexts[(imageNumber - 2) % altTexts.length];
  const title = `Nima Saraeian Seminar ${imageNumber}`;
  const description = `Seminar presentation by Nima Saraeian نیما سرائیان on AI, Digital Psychology, and Innovation at International Conference ${imageNumber}`;

  // Schema.org for ImageObject
  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": imageUrl,
    "name": title,
    "description": description,
    "alternateName": altText,
    "width": 1200,
    "height": 800,
    "author": {
      "@type": "Person",
      "name": "Nima Saraeian",
      "alternateName": "نیما سرائیان",
      "jobTitle": "AI Marketing Strategist",
      "url": "https://nimasaraeian.com"
    },
    "copyrightHolder": {
      "@type": "Person",
      "name": "Nima Saraeian",
      "alternateName": "نیما سرائیان"
    },
    "license": "https://nimasaraeian.com",
    "contentLocation": {
      "@type": "Place",
      "name": `International Conference ${imageNumber}`
    },
    "datePublished": `${2025 - Math.floor((imageNumber - 2) / 3)}-01-01`
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(imageSchema),
        }}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back to Seminars */}
          <Link 
            href="/seminars" 
            className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            ← Back to All Seminars
          </Link>

          {/* Image */}
          <div className="mb-8">
            <Image
              src={imageSrc}
              alt={altText}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-2xl"
              priority
              quality={95}
              title={title}
              sizes="100vw"
              unoptimized
            />
          </div>

          {/* Image Info */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              {title}
            </h1>
            <p className="text-lg text-gray-300 mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              {description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span>📅 {2025 - Math.floor((imageNumber - 2) / 3)}</span>
              <span>📍 International Conference {imageNumber}</span>
              <span>👤 Nima Saraeian نیما سرائیان</span>
            </div>
          </div>

          {/* Related Images */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              More Seminars by Nima Saraeian
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[imageNumber - 1, imageNumber + 1, imageNumber - 2, imageNumber + 2]
                .filter(num => num >= 2 && num <= 30)
                .map((num) => {
                  const ext = num >= 26 ? '.JPG' : '.jpg';
                  return (
                    <Link key={num} href={`/seminars/${num}`}>
                      <Image
                        src={`/image/nimasaraeian${num}${ext}`}
                        alt={`Nima Saraeian Seminar ${num}`}
                        width={300}
                        height={200}
                        className="w-full h-auto rounded-lg hover:opacity-80 transition-opacity"
                        loading="lazy"
                        unoptimized
                      />
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

