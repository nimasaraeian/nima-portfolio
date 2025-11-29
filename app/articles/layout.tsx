import ArticleAIMarketingCTAWrapper from "@/components/ArticleAIMarketingCTAWrapper";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ArticleAIMarketingCTAWrapper />
    </>
  );
}

