import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact NIMA SARAEIAN | AI Psychology Expert نیما سرائیان',
  description: 'Get in touch with NIMA SARAEIAN (نیما سرائیان), AI Psychology Expert. Contact for consultations, speaking engagements, and AI-powered psychology solutions.',
  keywords: 'NIMA SARAEIAN contact, نیما سرائیان, AI psychology consultant, digital psychology expert, psychometric analysis, consumer behavior specialist, speaking engagements, AI consulting',
  openGraph: {
    title: 'Contact NIMA SARAEIAN - AI Psychology Expert',
    description: 'Connect with Dr. NIMA SARAEIAN for AI psychology consultations, speaking engagements, and innovative digital solutions.',
    url: 'https://www.nimasaraeian.com/contact',
    siteName: 'NIMA SARAEIAN نیما سرائیان',
    images: [
      {
        url: 'https://www.nimasaraeian.com/image/nima-bw.jpg',
        width: 1200,
        height: 630,
        alt: 'NIMA SARAEIAN - AI Psychology Expert',
      },
    ],
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Contact NIMA SARAEIAN
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            AI Psychology Expert | Digital Innovation Consultant | International Speaker
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
                      <li>• AI Psychology Consulting</li>
                      <li>• Digital Consumer Behavior Analysis</li>
                      <li>• Psychometric Assessment Design</li>
                      <li>• Speaking Engagements</li>
                      <li>• Research Collaborations</li>
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
                <strong>Note:</strong> For urgent inquiries, please email directly to nimasaraeian65@gmail.com
              </p>
            </div>
          </div>
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
