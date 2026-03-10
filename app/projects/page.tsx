'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/app/lib/structured-data';
import { getCanonicalUrl } from '@/app/lib/seo';

interface Project {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  technologies: string[];
  status: 'In Development' | 'Prototype' | 'Research' | 'Planning' | 'Concept';
}

interface Stat {
  number: string;
  label: string;
  icon: string;
}

interface ResearchArea {
  title: string;
  description: string;
  icon: string;
}

export default function ProjectsPage() {
  useEffect(() => {
    const canonicalUrl = getCanonicalUrl('/projects');
    
    const webPageSchema = generateWebPageSchema({
      name: "AI Systems & Decision Intelligence Projects",
      description: "AI systems portfolio: decision intelligence, behavioral analysis, content optimization, and automation. Selphlyze, Contlyze, and related systems.",
      url: canonicalUrl,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: "Home", url: getCanonicalUrl('/') },
      { name: "Projects", url: canonicalUrl },
    ]);

    // Inject schemas into page
    const webPageScript = document.createElement('script');
    webPageScript.type = 'application/ld+json';
    webPageScript.text = JSON.stringify(webPageSchema);
    document.head.appendChild(webPageScript);

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.head.removeChild(webPageScript);
      document.head.removeChild(breadcrumbScript);
    };
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      icon: '🏥',
      title: 'Dental Clinic AI',
      subtitle: 'AI-powered scheduling, financial intelligence, and patient prioritization system for clinics',
      description:
        'A practical AI system designed to help clinics improve scheduling decisions, identify higher-value patient opportunities, and structure operational data into actionable intelligence.',
      features: [
        'Intelligent scheduling support',
        'Patient prioritization by value and urgency',
        'Financial-value-aware analysis',
        'Workflow support for clinic teams',
        'Structured outputs for operational decisions',
        'Decision support from operational data'
      ],
      technologies: ['Python', 'SQLite', 'APIs', 'Decision Logic', 'Structured Data'],
      status: 'Prototype',
    },
    {
      id: 2,
      icon: '🧠',
      title: 'Selphlyze',
      subtitle: 'AI-powered psychometric and behavioral decision intelligence system',
      description:
        'A behavioral AI platform designed to analyze personality signals, emotional patterns, and cognitive decision tendencies to support marketing, product, and business intelligence systems.',
      features: [
        'ShadowTrace — personality and cognitive style analysis',
        'EmoConnect — emotional pattern mapping',
        'PsyClock — cognitive tempo assessment',
        'SelfCode generation for downstream decision systems',
        'Behavioral signal extraction for segmentation',
        'Psychometric data pipeline for ML models'
      ],
      technologies: ['AI/ML', 'Psychology', 'React', 'Node.js', 'MongoDB'],
      status: 'In Development',
    },
    {
      id: 3,
      icon: '📊',
      title: 'Contlyze',
      subtitle: 'Content & behavioral intelligence platform for CRO and growth',
      description:
        'Contlyze is an AI-driven content and behavioral intelligence system that analyzes content performance, audience engagement, and competitive landscapes. It surfaces patterns that inform CRO, content strategy, and growth decisions — turning raw behavioral and content data into actionable optimization signals.',
      features: [
        'Content performance and engagement analysis',
        'Competitive and market intelligence',
        'Behavioral signal extraction for CRO',
        'SEO and content optimization signals',
        'Multi-platform monitoring and analytics',
        'Data pipeline for growth and conversion optimization'
      ],
      technologies: ['AI/ML', 'NLP', 'Data Analytics', 'React', 'Python', 'Cloud Infrastructure'],
      status: 'In Development',
    },
  ];

  const stats: Stat[] = [
    { number: '3', label: 'Featured Systems', icon: '🚀' },
    { number: '12+', label: 'Years Experience', icon: '⏰' },
    { number: '4', label: 'Research Areas', icon: '🔬' },
    { number: '—', label: 'AI Systems Focus', icon: '⚙️' },
  ];

  const researchAreas: ResearchArea[] = [
    {
      title: 'AI Decision Systems',
      description: 'Systems that diagnose decision friction and optimize conversion paths.',
      icon: '🧮',
    },
    {
      title: 'Behavioral Intelligence',
      description: 'Psychometric and behavioral signal extraction for segmentation.',
      icon: '📈',
    },
    {
      title: 'Content & CRO Analysis',
      description: 'Content performance and conversion optimization intelligence.',
      icon: '📊',
    },
    {
      title: 'Automation & Product Architecture',
      description: 'Scalable pipelines for behavioral analysis and growth automation.',
      icon: '⚙️',
    },
  ];

  const getStatusColor = (status: Project['status']): string => {
    switch (status) {
      case 'In Development':
        return 'bg-green-500';
      case 'Prototype':
        return 'bg-blue-500';
      case 'Research':
        return 'bg-yellow-500';
      case 'Planning':
        return 'bg-red-500';
      case 'Concept':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>AI Systems & Decision Intelligence</h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Systems for behavioral analysis, decision intelligence, CRO, content optimization, and automation. Built to connect psychometrics, content data, and market signals to business outcomes.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/services" className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-gray-300 hover:border-white/30 hover:text-white transition-colors">
                View Services
              </Link>
              <Link href="/articles" className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-gray-300 hover:border-white/30 hover:text-white transition-colors">
                Read Articles
              </Link>
              <Link href="/research" className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-gray-300 hover:border-white/30 hover:text-white transition-colors">
                Explore Research
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <section className="mb-20">
            <h2 className="text-3xl font-semibold mb-8 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Featured Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-gray-500 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] group"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      {project.title === 'Selphlyze' && (
                        <div className="mr-6 transform transition-all duration-500 hover:scale-110 hover:rotate-3 logo-float">
                          <Image 
                            src="/image/SELPHLYZE_LOGO_HIGH_RES.png" 
                            alt="Selphlyze Logo" 
                            width={120} 
                            height={120}
                            className="drop-shadow-lg logo-glow"
                          />
                        </div>
                      )}
                      {project.title === 'Contlyze' && (
                        <div className="mr-6 transform transition-all duration-500 hover:scale-110 hover:rotate-3 logo-float">
                          <Image 
                            src="/image/contlyze.png" 
                            alt="Contlyze Logo" 
                            width={120} 
                            height={120}
                            className="drop-shadow-lg logo-glow"
                          />
                        </div>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm text-white ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-500" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{project.title}</h3>
                  <p className="text-gray-400 italic mb-6 text-lg group-hover:text-gray-300 transition-colors duration-500" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{project.subtitle}</p>
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm group-hover:text-gray-200 transition-colors duration-500" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{project.description}</p>
                  <div className="mb-6">
                    <strong style={{ fontFamily: 'Times New Roman, Times, serif' }}>System Capabilities:</strong>
                    <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1 text-sm">
                      {project.features.map((f, i) => (
                        <li key={i} style={{ fontFamily: 'Times New Roman, Times, serif' }}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <strong style={{ fontFamily: 'Times New Roman, Times, serif' }}>Technologies:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs border border-gray-600 group-hover:bg-gray-700 group-hover:border-gray-500 transition-all duration-300 hover:scale-105"
                          style={{ 
                            fontFamily: 'Times New Roman, Times, serif',
                            animationDelay: `${i * 100}ms`
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project Links */}
                  <div className="mt-6 text-center">
                    {project.title === 'Selphlyze' && (
                      <>
                        <Link
                          href="/systems/selphlyze"
                          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/30 text-base group/btn"
                          style={{ fontFamily: 'Times New Roman, Times, serif' }}
                        >
                          <span className="group-hover/btn:animate-pulse">🧠</span>
                          <span className="ml-2">View Case Study</span>
                        </Link>
                        <a
                          href="https://www.selphlyze.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-400 mt-2 hover:text-white transition-colors inline-block"
                          style={{ fontFamily: 'Times New Roman, Times, serif' }}
                        >
                          Experience Selphlyze →
                        </a>
                      </>
                    )}
                    {project.title === 'Dental Clinic AI' && (
                      <Link
                        href="/systems/dental-clinic-ai"
                        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-full hover:from-emerald-700 hover:to-teal-700 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/30 text-base group/btn"
                        style={{ fontFamily: 'Times New Roman, Times, serif' }}
                      >
                        <span className="group-hover/btn:animate-pulse">🏥</span>
                        <span className="ml-2">View Case Study</span>
                      </Link>
                    )}
                    {project.title === 'Contlyze' && (
                      <>
                        <a
                          href="https://www.contlyze.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-purple-700 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/30 text-base group/btn"
                          style={{ fontFamily: 'Times New Roman, Times, serif' }}
                        >
                          <span className="group-hover/btn:animate-pulse">📊</span>
                          <span className="ml-2">Explore Contlyze</span>
                        </a>
                        <p className="text-xs text-gray-400 mt-2" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                          Content and behavioral intelligence for CRO
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-semibold mb-8 text-center">Research Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {researchAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700"
                >
                  <div className="text-3xl mb-3">{area.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{area.title}</h4>
                  <p className="text-gray-400 text-sm">{area.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
  );
}