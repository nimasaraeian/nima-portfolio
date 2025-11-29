import Link from "next/link";

export default function ArticleAIMarketingCTA() {
  return (
    <section className="mt-16 border-t border-gray-700 pt-10">
      <h2 className="text-2xl font-semibold mb-3 text-white">
        Want to go deeper into AI Marketing?
      </h2>
      <p className="text-base text-gray-400 mb-5 leading-relaxed">
        This article is part of a bigger ecosystem. If you want to see how a real AI Marketing Engine works in practice, explore the main AI Marketing page powered by the NIMA AI Brain.
      </p>
      <Link
        href="/ai-marketing"
        className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium border border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-gray-300 hover:text-white transition-colors"
      >
        Explore the AI Marketing Engine →
      </Link>
    </section>
  );
}

