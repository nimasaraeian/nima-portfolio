import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next';
import { Rocket, Target, Users, BarChart, Brain, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Marketing Strategy Generator | Nima Saraeian',
  description: 'Generate a comprehensive AI-driven marketing strategy for your business. Get personas, content plans, campaigns, automation, and 90-day roadmaps tailored to your industry.',
  keywords: 'AI Marketing Strategy, Marketing Automation, Business Strategy, Marketing Plan Generator, AI Marketing Tools',
  openGraph: {
    title: 'AI Marketing Strategy Generator | Nima Saraeian',
    description: 'Generate a comprehensive AI-driven marketing strategy for your business with actionable plans and roadmaps.',
    url: 'https://www.nimasaraeian.com/business',
    siteName: 'Nima Saraeian',
    images: [
      {
        url: '/image/nima-bw.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Marketing Strategy Generator',
      },
    ],
    type: 'website',
  },
};

export default function BusinessPage() {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer Personas',
      description: 'AI-generated detailed customer personas with pain points, gains, and messaging strategies'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Content Calendar',
      description: 'Week-by-week content plan with specific ideas, CTAs, and success metrics for each channel'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Campaign Strategies',
      description: 'Complete campaign briefs with audience targeting, creative direction, and A/B test ideas'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Marketing Automation',
      description: 'Customer journey mapping with email flows, chatbot ideas, and ad automation strategies'
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: 'KPIs & Forecasting',
      description: 'Key performance indicators with targets, measurement methods, and revenue projections'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: '90-Day Action Plan',
      description: 'Week-by-week implementation roadmap with specific tasks and team assignments'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
              AI Marketing Strategy Generator
          </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Generate a Complete, Actionable Marketing Strategy in Minutes
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
              Get a comprehensive AI-driven marketing strategy with detailed personas, content plans, 
              campaign strategies, automation workflows, KPIs, and a 90-day implementation roadmap 
              tailored specifically to your business.
            </p>
            
            <Link 
              href="/strategy"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            >
              <Rocket className="w-6 h-6" />
              Generate My Strategy
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You'll Get in Your Strategy
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A complete marketing strategy designed by AI, validated by industry best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                      <div
                        key={feature.title}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all hover:transform hover:scale-105 animate-slide-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="text-teal-400 mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                      </div>
                          ))}
                        </div>
                      </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 md:px-12 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Simple 5-Step Process
          </h2>
          <p className="text-lg text-gray-400 mb-12">
            Answer a few questions about your business and get a comprehensive strategy
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              'Business Basics',
              'Channels & Assets', 
              'Audience & Competitors',
              'Constraints & Timeline',
              'Generate Strategy'
            ].map((step, index) => (
              <div key={step} className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
                          {index + 1}
                  </div>
                        <div className="text-sm font-medium text-white">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-20 px-4 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Start generating your personalized AI marketing strategy today and unlock your business's full potential.
          </p>
          <Link 
            href="/strategy"
            className="px-8 py-3 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Signature */}
      <section className="py-12 text-center">
        <Image
          src="/image/signature-white.png"
          alt="Nima Saraeian Signature"
          width={200}
          height={80}
          className="opacity-90 hover:opacity-100 transition-opacity duration-300 mx-auto"
        />
      </section>
    </div>
  );
}
