"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import ArticleAIMarketingCTA from "./ArticleAIMarketingCTA";

/**
 * This component conditionally injects the AI Marketing CTA at the end of article pages.
 * It uses DOM manipulation to insert the CTA after the article content inside the main container.
 */
export default function ArticleAIMarketingCTAWrapper() {
  const pathname = usePathname();

  useEffect(() => {
    // List of known listing page paths
    const listingPages = [
      "/articles",
      "/articles/marketing",
      "/articles/ai",
      "/articles/daily",
      "/articles/psychology",
      "/articles/Daily-Insights",
      "/articles/Marketing-Branding",
      "/articles/AI-Digital-Psychology",
      "/articles/new",
    ];

    const isListingPage = listingPages.includes(pathname);
    
    // Check if path matches article pattern
    const pathSegments = pathname.split("/").filter(Boolean);
    const isArticlePattern = pathSegments.length >= 3 && pathSegments[0] === "articles";
    const isDirectArticleRoute = pathSegments.length === 2 && 
      pathSegments[0] === "articles" && 
      !listingPages.includes(pathname);

    const isArticlePage = (isArticlePattern || isDirectArticleRoute) && !isListingPage;
    
    if (!isArticlePage) {
      return;
    }

    // Function to inject the CTA
    const injectCTA = () => {
      // Check if CTA already exists
      if (document.getElementById("article-ai-marketing-cta-container")) {
        return;
      }

      // Find the article container
      const articleTag = document.querySelector("article.prose, article");
      const mainTag = document.querySelector("main");
      
      if (!articleTag || !mainTag) {
        return;
      }

      // Find the max-w-4xl container that wraps the article
      const maxWidthContainer = articleTag.closest(".max-w-4xl") || 
                                mainTag.querySelector(".max-w-4xl");

      if (!maxWidthContainer) {
        return;
      }

      // Check if CTA already exists in this container
      if (maxWidthContainer.querySelector("#article-ai-marketing-cta-container")) {
        return;
      }

      // Create container for CTA
      const ctaContainer = document.createElement("div");
      ctaContainer.id = "article-ai-marketing-cta-container";
      
      // Insert at the end of the max-w-4xl container (after article and any footer)
      maxWidthContainer.appendChild(ctaContainer);

      // Render the CTA component
      const root = createRoot(ctaContainer);
      root.render(<ArticleAIMarketingCTA />);
    };

    // Try injecting after delays to ensure DOM is ready
    const timers = [
      setTimeout(injectCTA, 100),
      setTimeout(injectCTA, 500),
      setTimeout(injectCTA, 1000),
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      
      // Clean up on route change
      const existingContainer = document.getElementById("article-ai-marketing-cta-container");
      if (existingContainer) {
        const root = createRoot(existingContainer);
        root.unmount();
        existingContainer.remove();
      }
    };
  }, [pathname]);

  // This component doesn't render anything - it injects via DOM manipulation
  return null;
}
