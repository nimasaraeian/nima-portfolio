import { Metadata } from 'next';
import Image from 'next/image';

import { getCanonicalUrl } from '@/app/lib/seo';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/app/lib/structured-data';

export const metadata: Metadata = {
  title: 'Contact AI Marketing Consultant | Remote & Istanbul Marketing Consulting | Nima Saraeian',
  description: 'Contact AI Marketing Consultant Nima Saraeian for remote marketing consulting, Istanbul-based services, and marketing collaboration. Available for consultations, speaking engagements, and strategic partnerships.',
  alternates: {
    canonical: getCanonicalUrl('/contact'),
  },
  keywords: 'NIMA SARAEIAN contact, نیما سرائیان, AI psychology consultant, digital psychology expert, psychometric analysis, consumer behavior specialist, speaking engagements, AI consulting',
  openGraph: {
    title: 'Contact AI Marketing Consultant | Remote & Istanbul Marketing Consulting | Nima Saraeian',
    description: 'Contact AI Marketing Consultant Nima Saraeian for remote marketing consulting, Istanbul-based services, and marketing collaboration.',
    url: getCanonicalUrl('/contact'),
    siteName: 'Nima Saraeian',
    images: [
      {
        url: 'https://nimasaraeian.com/image/nima-bw.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Nima Saraeian - AI Marketing Consultant',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AI Marketing Consultant | Remote & Istanbul Marketing Consulting',
    description: 'Contact AI Marketing Consultant Nima Saraeian for remote marketing consulting and marketing collaboration.',
    images: ['https://nimasaraeian.com/image/nima-bw.jpg'],
  },
};

export default function ContactPage() {
  const canonicalUrl = getCanonicalUrl('/contact');
  
  const webPageSchema = generateWebPageSchema({
    name: "Contact AI Marketing Consultant",
    description: "Contact AI Marketing Consultant Nima Saraeian for remote marketing consulting and marketing collaboration.",
    url: canonicalUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: getCanonicalUrl('/') },
    { name: "Contact", url: canonicalUrl },
  ]);

  return (
    <main className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Contact AI Marketing Consultant
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Remote Marketing Consulting | Istanbul-Based Services | Marketing Collaboration
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Get In Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a 
                      href="mailto:nimasaraeian65@gmail.com"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      nimasaraeian65@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📱</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a 
                      href="tel:+905362914170"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      +90 536 291 41 70
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🌐</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">LinkedIn</h3>
                    <a 
                      href="https://www.linkedin.com/in/nima.saraeian"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      linkedin.com/in/nima.saraeian
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🌍</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="text-gray-300">Available for international consultations</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">💼</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Services</h3>
                    <ul className="text-gray-300 space-y-1">
                      <li>• UX Design & Research (12+ years experience)</li>
                      <li>• AI-Powered User Behavior Analysis</li>
                      <li>• Consumer Psychology & Digital Marketing</li>
                      <li>• User-Centered Design (UCD) & Usability Testing</li>
                      <li>• Wireframing, Prototyping & Information Architecture</li>
                      <li>• Cross-Cultural User Research (500+ participants)</li>
                      <li>• Neuromarketing & Behavioral Design</li>
                      <li>• Data Science & A/B Testing</li>
                      <li>• Strategic Management & Business Consulting</li>
                      <li>• International Training & Workshops</li>
                      <li>• Portfolio Development & Brand Strategy</li>
                      <li>• Research Collaboration & Innovation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Image */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 text-center">
              <Image
                src="/image/nima-bw.jpg"
                alt="NIMA SARAEIAN - AI Psychology Expert"
                width={300}
                height={300}
                className="rounded-full mx-auto mb-4"
                style={{ objectFit: 'cover' }}
              />
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                NIMA SARAEIAN
              </h3>
              <p className="text-gray-400 mb-4">نیما سرائیان</p>
              <p className="text-sm text-gray-300">
                AI & Digital Psychology Expert<br />
                International Speaker & Consultant
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Send Message
            </h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a topic</option>
                  <option value="consultation">AI Psychology Consultation</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="research">Research Collaboration</option>
                  <option value="psychometric">Psychometric Assessment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-300 transform hover:scale-105"
                style={{ fontFamily: 'Times New Roman, Times, serif' }}
              >
                Send Message
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
              <p className="text-sm text-blue-300">
                <strong>Note:</strong> For urgent inquiries, please email directly to nimasaraeian65@gmail.com or call +90 536 291 41 70
              </p>
            </div>
          </div>
        </div>

        {/* CV Download Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-lg border border-gray-700 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Download My CV
          </h2>
          <p className="text-gray-400 mb-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Get a detailed overview of my experience, skills, and achievements
          </p>
          <a
            href="/cv-nima-saraeian.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 text-lg"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            <span className="mr-2">📄</span>
            Download CV (PDF)
          </a>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gray-900 p-8 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Why Work With NIMA SARAEIAN?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-semibold mb-2">AI Psychology Expertise</h3>
              <p className="text-gray-400 text-sm">
                Deep knowledge in artificial intelligence applications for psychological analysis and consumer behavior.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">Data-Driven Insights</h3>
              <p className="text-gray-400 text-sm">
                Evidence-based approaches using psychometric analysis and behavioral analytics for optimal results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold mb-2">International Experience</h3>
              <p className="text-gray-400 text-sm">
                Proven track record of successful projects and speaking engagements across global markets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
