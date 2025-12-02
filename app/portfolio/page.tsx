import { Metadata } from "next";
import { SITE } from "../lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio — AI Marketing Specialist & Behavioral Marketing Strategist | Nima Saraeian",
  description:
    "Case studies, AI content systems, behavioral analysis projects, and marketing automation solutions from an AI Marketing Specialist and Behavioral Marketing Strategist.",
  alternates: { canonical: `${SITE.baseUrl}/portfolio` },
  openGraph: {
    title: "Portfolio — AI Marketing Specialist & Behavioral Marketing Strategist | Nima Saraeian",
    description:
      "Case studies, AI content systems, behavioral analysis projects, and marketing automation solutions.",
    url: `${SITE.baseUrl}/portfolio`,
    type: "website",
    images: [{ url: `${SITE.baseUrl}${SITE.ogImage}` }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — AI Marketing Specialist & Behavioral Marketing Strategist | Nima Saraeian",
    description:
      "Case studies, AI content systems, behavioral analysis projects, and marketing automation solutions.",
    images: [`${SITE.baseUrl}${SITE.ogImage}`]
  }
};

interface HeroCaseStudy {
  title: string;
  problem: string;
  aiStrategy: string;
  techStack: string[];
  behavioralPsychologyMethod: string;
  results: {
    kpi: string;
    value: string;
  }[];
}

interface AIContentSystem {
  systemName: string;
  goal: string;
  engineArchitecture: {
    ai: string;
    psychology: string;
    automation: string;
  };
  kpis: {
    metric: string;
    placeholder: string;
  }[];
}

interface AIBehavioralAnalysis {
  problemAnalyzed: string;
  behaviorModel: string;
  insights: string;
  impact: string;
}

interface MarketingAutomationProject {
  automationName: string;
  workflow: string;
  tools: string[];
  output: string;
}

interface SignatureFramework {
  frameworkName: string;
  description: string;
  components: string[];
}

export default function PortfolioPage() {
  // Hero Case Studies
  const heroCaseStudies: HeroCaseStudy[] = [
    {
      title: "[Case Study Title]",
      problem: "[Problem statement placeholder]",
      aiStrategy: "[AI strategy approach placeholder]",
      techStack: ["Next.js", "AI Models", "Automations", "n8n", "Apify", "[Additional tools]"],
      behavioralPsychologyMethod: "[Behavioral psychology method used]",
      results: [
        { kpi: "[KPI 1]", value: "[Value placeholder]" },
        { kpi: "[KPI 2]", value: "[Value placeholder]" },
        { kpi: "[KPI 3]", value: "[Value placeholder]" }
      ]
    },
    {
      title: "[Case Study Title]",
      problem: "[Problem statement placeholder]",
      aiStrategy: "[AI strategy approach placeholder]",
      techStack: ["Next.js", "AI Models", "Automations", "n8n", "Apify", "[Additional tools]"],
      behavioralPsychologyMethod: "[Behavioral psychology method used]",
      results: [
        { kpi: "[KPI 1]", value: "[Value placeholder]" },
        { kpi: "[KPI 2]", value: "[Value placeholder]" },
        { kpi: "[KPI 3]", value: "[Value placeholder]" }
      ]
    },
    {
      title: "[Case Study Title]",
      problem: "[Problem statement placeholder]",
      aiStrategy: "[AI strategy approach placeholder]",
      techStack: ["Next.js", "AI Models", "Automations", "n8n", "Apify", "[Additional tools]"],
      behavioralPsychologyMethod: "[Behavioral psychology method used]",
      results: [
        { kpi: "[KPI 1]", value: "[Value placeholder]" },
        { kpi: "[KPI 2]", value: "[Value placeholder]" },
        { kpi: "[KPI 3]", value: "[Value placeholder]" }
      ]
    }
  ];

  // AI Content Systems
  const aiContentSystems: AIContentSystem[] = [
    {
      systemName: "[System Name]",
      goal: "[System goal placeholder]",
      engineArchitecture: {
        ai: "[AI component description]",
        psychology: "[Psychology component description]",
        automation: "[Automation component description]"
      },
      kpis: [
        { metric: "[Metric 1]", placeholder: "[Value placeholder]" },
        { metric: "[Metric 2]", placeholder: "[Value placeholder]" },
        { metric: "[Metric 3]", placeholder: "[Value placeholder]" }
      ]
    },
    {
      systemName: "[System Name]",
      goal: "[System goal placeholder]",
      engineArchitecture: {
        ai: "[AI component description]",
        psychology: "[Psychology component description]",
        automation: "[Automation component description]"
      },
      kpis: [
        { metric: "[Metric 1]", placeholder: "[Value placeholder]" },
        { metric: "[Metric 2]", placeholder: "[Value placeholder]" },
        { metric: "[Metric 3]", placeholder: "[Value placeholder]" }
      ]
    }
  ];

  // AI Behavioral Analysis
  const aiBehavioralAnalyses: AIBehavioralAnalysis[] = [
    {
      problemAnalyzed: "[Problem statement placeholder]",
      behaviorModel: "[Behavior model used - e.g., PsyCode, AI Consumer Psychology]",
      insights: "[Key insights placeholder]",
      impact: "[Impact/results placeholder]"
    },
    {
      problemAnalyzed: "[Problem statement placeholder]",
      behaviorModel: "[Behavior model used - e.g., PsyCode, AI Consumer Psychology]",
      insights: "[Key insights placeholder]",
      impact: "[Impact/results placeholder]"
    }
  ];

  // Marketing Automation Projects
  const marketingAutomationProjects: MarketingAutomationProject[] = [
    {
      automationName: "[Automation Name]",
      workflow: "[Workflow description placeholder]",
      tools: ["n8n", "OpenAI", "[API names]", "[Additional tools]"],
      output: "[Output/results placeholder]"
    },
    {
      automationName: "[Automation Name]",
      workflow: "[Workflow description placeholder]",
      tools: ["n8n", "OpenAI", "[API names]", "[Additional tools]"],
      output: "[Output/results placeholder]"
    }
  ];

  // Signature Frameworks
  const signatureFrameworks: SignatureFramework[] = [
    {
      frameworkName: "AI Behavioral Marketing Blueprint",
      description: "[Framework description placeholder]",
      components: [
        "[Component 1]",
        "[Component 2]",
        "[Component 3]",
        "[Component 4]"
      ]
    },
    {
      frameworkName: "AI Content Matrix",
      description: "[Framework description placeholder]",
      components: [
        "[Component 1]",
        "[Component 2]",
        "[Component 3]",
        "[Component 4]"
      ]
    },
    {
      frameworkName: "Trend Intelligence Layer",
      description: "[Framework description placeholder]",
      components: [
        "[Component 1]",
        "[Component 2]",
        "[Component 3]",
        "[Component 4]"
      ]
    }
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Portfolio
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          AI Marketing Specialist & Behavioral Marketing Strategist — Case studies, systems, and frameworks that transform how brands connect with audiences.
        </p>
      </div>

      {/* Hero Case Studies */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center border-b border-gray-700 pb-4">
          Hero Case Studies
        </h2>
        <div className="space-y-12">
          {heroCaseStudies.map((caseStudy, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-6 text-blue-300">
                {caseStudy.title}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Problem</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">AI Strategy</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {caseStudy.aiStrategy}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Behavioral Psychology Method</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {caseStudy.behavioralPsychologyMethod}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">Results</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {caseStudy.results.map((result, i) => (
                      <div
                        key={i}
                        className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
                      >
                        <div className="text-sm text-gray-400 mb-1">{result.kpi}</div>
                        <div className="text-xl font-semibold text-blue-300">{result.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Content Systems */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center border-b border-gray-700 pb-4">
          AI Content Systems
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {aiContentSystems.map((system, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-300">
                {system.systemName}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Goal</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {system.goal}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">Engine Architecture</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span><strong>AI:</strong> {system.engineArchitecture.ai}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span><strong>Psychology:</strong> {system.engineArchitecture.psychology}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span><strong>Automation:</strong> {system.engineArchitecture.automation}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">KPIs</h4>
                  <ul className="space-y-2">
                    {system.kpis.map((kpi, i) => (
                      <li key={i} className="text-gray-300 flex items-center">
                        <span className="text-blue-400 mr-2">✓</span>
                        <span><strong>{kpi.metric}:</strong> {kpi.placeholder}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Behavioral Analysis */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center border-b border-gray-700 pb-4">
          AI Behavioral Analysis
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {aiBehavioralAnalyses.map((analysis, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Problem Analyzed</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {analysis.problemAnalyzed}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Behavior Model Used</h4>
                  <p className="text-blue-300 font-medium">
                    {analysis.behaviorModel}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Insights</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {analysis.insights}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Impact</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {analysis.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marketing Automation Projects */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center border-b border-gray-700 pb-4">
          Marketing Automation Projects
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {marketingAutomationProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-6 text-blue-300">
                {project.automationName}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Workflow</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {project.workflow}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Output / Results</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {project.output}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signature Frameworks */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center border-b border-gray-700 pb-4">
          Signature Nima Saraeian Frameworks
        </h2>
        <div className="space-y-8">
          {signatureFrameworks.map((framework, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-2 border-blue-500/30 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-300">
                {framework.frameworkName}
              </h3>
              
              <p className="text-gray-200 mb-6 leading-relaxed">
                {framework.description}
              </p>

              <div>
                <h4 className="text-lg font-semibold mb-3 text-white">Components</h4>
                <ul className="space-y-2">
                  {framework.components.map((component, i) => (
                    <li key={i} className="text-gray-300 flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>{component}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/contact?utm_source=portfolio&utm_medium=cta&utm_campaign=services"
          className="inline-block rounded-2xl border-2 border-white px-8 py-4 text-lg hover:bg-white hover:text-black transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl"
        >
          Discuss Your Project
        </Link>
      </div>
    </main>
  );
}





























