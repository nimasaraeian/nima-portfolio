/**
 * SEO Utilities
 * Centralized canonical URL generation and SEO helpers
 */

const SITE_BASE = 'https://nimasaraeian.com';

/**
 * Get canonical URL for a given pathname
 * 
 * Rules:
 * - Strips query strings and hash fragments
 * - Enforces leading slash
 * - Enforces lowercase for pathname
 * - NO trailing slash (except for root)
 * - Returns absolute URL
 * 
 * @param pathname - Pathname (e.g., '/articles/AI-Marketing' or 'articles/AI-Marketing')
 * @returns Absolute canonical URL
 */
export function getCanonicalUrl(pathname: string): string {
  // Remove query string and hash
  const cleanPath = pathname.split('?')[0].split('#')[0];
  
  // Ensure leading slash
  const pathWithSlash = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  // Enforce lowercase for pathname (URLs are case-sensitive but we want consistency)
  const lowerPath = pathWithSlash.toLowerCase();
  
  // Remove trailing slash (except for root)
  const normalizedPath = lowerPath === '/' ? '/' : lowerPath.replace(/\/$/, '');
  
  return `${SITE_BASE}${normalizedPath}`;
}

/**
 * Get site base URL
 */
export function getSiteBase(): string {
  return SITE_BASE;
}


