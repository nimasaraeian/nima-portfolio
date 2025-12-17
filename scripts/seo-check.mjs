#!/usr/bin/env node

/**
 * SEO Check Script
 * 
 * This script:
 * 1. Fetches all URLs from sitemap
 * 2. Verifies status 200
 * 3. Checks canonical equals the same URL
 * 4. Verifies no redirect chains
 * 5. Reports issues
 */

import { parseStringPromise } from 'xml2js';

const SITE_BASE = 'https://nimasaraeian.com';
const SITEMAP_URL = `${SITE_BASE}/sitemap.xml`;

// Non-indexable routes that should NOT be in sitemap
const NON_INDEXABLE_ROUTES = [
  '/ai-marketing/decision-brain',
  '/decision-brain',
  '/decision-demo',
  '/dashboard',
  '/dev/',
  '/result',
  '/content-analysis',
  '/api/',
];

async function fetchUrl(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      redirect: 'manual', // Don't follow redirects automatically
      headers: {
        'User-Agent': 'SEO-Check-Script/1.0',
      },
    });
    return response;
  } catch (error) {
    return { error: error.message };
  }
}

function extractCanonical(html) {
  // Try to find canonical in metadata alternates (Next.js pattern)
  // Also check for <link rel="canonical">
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  if (canonicalMatch) {
    return canonicalMatch[1];
  }
  
  // Check for metadata alternates (from Next.js)
  const metaCanonicalMatch = html.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*title=["']canonical["']/i);
  if (metaCanonicalMatch) {
    return metaCanonicalMatch[1];
  }
  
  return null;
}

function extractRobotsMeta(html) {
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
  if (robotsMatch) {
    return robotsMatch[1];
  }
  return null;
}

async function checkUrl(url) {
  const result = {
    url,
    status: null,
    statusText: null,
    canonical: null,
    robotsMeta: null,
    redirects: [],
    errors: [],
    warnings: [],
  };

  try {
    // Follow redirects to get final URL
    let currentUrl = url;
    let redirectCount = 0;
    const maxRedirects = 5;

    while (redirectCount < maxRedirects) {
      const response = await fetchUrl(currentUrl);
      
      if (response.error) {
        result.errors.push(`Fetch error: ${response.error}`);
        return result;
      }

      const status = response.status;

      // Handle redirects
      if (status >= 300 && status < 400) {
        redirectCount++;
        if (redirectCount >= maxRedirects) {
          result.errors.push(`Too many redirects (${redirectCount})`);
          return result;
        }

        const location = response.headers.get('location');
        if (!location) {
          result.errors.push(`Redirect without Location header`);
          return result;
        }

        // Resolve relative redirects
        const redirectUrl = location.startsWith('http') 
          ? location 
          : new URL(location, currentUrl).href;
        
        result.redirects.push({
          from: currentUrl,
          to: redirectUrl,
          status,
        });

        currentUrl = redirectUrl;
        continue;
      }

      // Final response
      result.status = status;
      result.statusText = response.statusText;

      if (status !== 200) {
        result.errors.push(`Non-200 status: ${status} ${response.statusText}`);
        return result;
      }

      // Get HTML content
      const html = await response.text();
      
      // Extract canonical
      result.canonical = extractCanonical(html);
      result.robotsMeta = extractRobotsMeta(html);

      // Check canonical
      // Use the FINAL URL after redirects, not the original sitemap URL
      // This handles www -> non-www redirects correctly
      let finalUrl = currentUrl.split('?')[0].split('#')[0];
      const urlObj = new URL(finalUrl);
      
      // Normalize to non-www (always use non-www as canonical)
      let normalizedHost = urlObj.host.replace(/^www\./, '');
      let normalizedPath = urlObj.pathname.toLowerCase();
      // Remove trailing slash except root
      if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
        normalizedPath = normalizedPath.slice(0, -1);
      }
      const expectedCanonical = `${urlObj.protocol}//${normalizedHost}${normalizedPath}`;
      
      if (!result.canonical) {
        result.warnings.push('No canonical URL found in HTML');
      } else {
        // Normalize found canonical for comparison
        const canonicalObj = new URL(result.canonical);
        let canonicalPath = canonicalObj.pathname.toLowerCase();
        if (canonicalPath !== '/' && canonicalPath.endsWith('/')) {
          canonicalPath = canonicalPath.slice(0, -1);
        }
        const normalizedCanonical = `${canonicalObj.protocol}//${canonicalObj.host}${canonicalPath}`;
        
        if (normalizedCanonical !== expectedCanonical) {
          result.errors.push(`Canonical mismatch: expected "${expectedCanonical}", got "${result.canonical}"`);
        }
        
        // Check for trailing slash policy violation
        if (canonicalPath !== '/' && result.canonical.includes('/' + canonicalPath.split('/').pop() + '/')) {
          result.errors.push(`Canonical has trailing slash: "${result.canonical}" (policy: no trailing slash)`);
        }
      }
      
      // Check for duplicate canonical tags (count occurrences)
      const canonicalMatches = html.match(/<link[^>]*rel=["'](canonical|alternate)["'][^>]*href=["'][^"']+["']/gi);
      if (canonicalMatches && canonicalMatches.length > 1) {
        result.errors.push(`Multiple canonical tags found (${canonicalMatches.length})`);
      }

      // Check if URL should be indexed
      const urlPath = new URL(url).pathname.toLowerCase();
      const shouldNotBeIndexed = NON_INDEXABLE_ROUTES.some(route => 
        urlPath.startsWith(route.toLowerCase())
      );
      
      if (shouldNotBeIndexed) {
        result.errors.push(`URL should not be in sitemap (non-indexable route: ${urlPath})`);
      }
      
      // Check trailing slash policy (no trailing slash except root)
      if (urlPath !== '/' && urlPath.endsWith('/')) {
        result.errors.push(`URL has trailing slash: "${urlPath}" (policy: no trailing slash)`);
      }
      
      // Check if sitemap URL redirects (only error if redirects to different path, not www->non-www)
      if (result.redirects.length > 0) {
        const originalHost = new URL(url).host;
        const finalHost = new URL(currentUrl).host;
        const originalPath = new URL(url).pathname;
        const finalPath = new URL(currentUrl).pathname;
        
        // Allow www -> non-www redirects (just normalize host)
        const normalizedOriginalHost = originalHost.replace(/^www\./, '');
        const normalizedFinalHost = finalHost.replace(/^www\./, '');
        
        // Only error if path changed or host changed beyond www normalization
        if (originalPath !== finalPath || normalizedOriginalHost !== normalizedFinalHost) {
          result.errors.push(`Sitemap URL redirects to different path or domain (should be final destination)`);
        } else if (originalHost !== finalHost) {
          // www -> non-www is OK, just a warning
          result.warnings.push(`Sitemap URL uses www but redirects to non-www (sitemap should use non-www URLs)`);
        }
      }

      // Check robots meta
      if (result.robotsMeta && result.robotsMeta.toLowerCase().includes('noindex')) {
        result.warnings.push('Page has noindex meta tag but is in sitemap');
      }

      return result;
    }
  } catch (error) {
    result.errors.push(`Unexpected error: ${error.message}`);
  }

  return result;
}

async function fetchSitemap() {
  try {
    const response = await fetch(SITEMAP_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text();
    const parsed = await parseStringPromise(xml);
    
    const urls = [];
    if (parsed.urlset && parsed.urlset.url) {
      for (const urlEntry of parsed.urlset.url) {
        if (urlEntry.loc && urlEntry.loc[0]) {
          urls.push(urlEntry.loc[0]);
        }
      }
    }

    return urls;
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    throw error;
  }
}

async function main() {
  console.log('🔍 SEO Check Script');
  console.log('═'.repeat(60));
  console.log(`Sitemap: ${SITEMAP_URL}\n`);

  let urls;
  try {
    console.log('📥 Fetching sitemap...');
    urls = await fetchSitemap();
    console.log(`✅ Found ${urls.length} URLs in sitemap\n`);
  } catch (error) {
    console.error('❌ Failed to fetch sitemap:', error.message);
    process.exit(1);
  }

  console.log('🔎 Checking URLs...\n');
  
  const results = [];
  let checked = 0;

  for (const url of urls) {
    checked++;
    process.stdout.write(`[${checked}/${urls.length}] Checking ${url}... `);
    
    const result = await checkUrl(url);
    results.push(result);

    if (result.errors.length > 0) {
      console.log('❌ FAILED');
    } else if (result.warnings.length > 0) {
      console.log('⚠️  WARNING');
    } else {
      console.log('✅ OK');
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Generate report
  console.log('\n' + '═'.repeat(60));
  console.log('📊 REPORT\n');

  const failed = results.filter(r => r.errors.length > 0);
  const warnings = results.filter(r => r.warnings.length > 0 && r.errors.length === 0);
  const passed = results.filter(r => r.errors.length === 0 && r.warnings.length === 0);

  console.log(`✅ Passed: ${passed.length}`);
  console.log(`⚠️  Warnings: ${warnings.length}`);
  console.log(`❌ Failed: ${failed.length}\n`);

  if (failed.length > 0) {
    console.log('❌ FAILED URLs:\n');
    for (const result of failed) {
      console.log(`  ${result.url}`);
      for (const error of result.errors) {
        console.log(`    - ${error}`);
      }
      if (result.redirects.length > 0) {
        console.log(`    Redirects:`);
        for (const redirect of result.redirects) {
          console.log(`      ${redirect.from} → ${redirect.to} (${redirect.status})`);
        }
      }
      console.log();
    }
  }

  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:\n');
    for (const result of warnings) {
      console.log(`  ${result.url}`);
      for (const warning of result.warnings) {
        console.log(`    - ${warning}`);
      }
      console.log();
    }
  }

  if (failed.length > 0) {
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

