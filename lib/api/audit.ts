// Mock API functions for site auditing

/**
 * Audits a website for SEO issues
 */
export async function auditWebsite(url: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 4000))

  // Generate a random score between 50 and 95
  const score = Math.floor(Math.random() * 45) + 50

  // Generate mock critical issues
  const criticalIssues = [
    {
      id: "c1",
      title: "Slow Page Load Speed",
      description:
        "Several pages take more than 3 seconds to load, which can negatively impact user experience and search rankings.",
      impact:
        "High impact on both user experience and search rankings. Google considers page speed as a ranking factor.",
      recommendation:
        "Optimize images, enable browser caching, minify CSS and JavaScript, and consider using a Content Delivery Network (CDN).",
    },
    {
      id: "c2",
      title: "Missing Meta Descriptions",
      description:
        "42% of your pages are missing meta descriptions, which are important for search engines and click-through rates.",
      impact: "Medium impact on search rankings but high impact on click-through rates from search results.",
      recommendation: "Add unique, descriptive meta descriptions to all pages, keeping them under 160 characters.",
    },
    {
      id: "c3",
      title: "Duplicate Content Issues",
      description:
        "Found 15 pages with substantially similar content, which can confuse search engines about which page to rank.",
      impact: "High impact on search rankings as search engines may penalize sites with duplicate content.",
      recommendation:
        "Implement canonical tags, create unique content for each page, or use 301 redirects to consolidate duplicate pages.",
    },
  ]

  // Generate mock warning issues
  const warningIssues = [
    {
      id: "w1",
      title: "Low Word Count on Key Pages",
      description: "Several important pages have less than 300 words of content, which may be considered thin content.",
      impact: "Medium impact on search rankings. Pages with thin content may not rank well for competitive keywords.",
      recommendation:
        "Expand content on key pages to at least 800 words, focusing on providing valuable information to users.",
    },
    {
      id: "w2",
      title: "Missing Alt Text for Images",
      description: "Found 28 images without alt text, which is important for accessibility and image search traffic.",
      impact: "Low impact on general search rankings but high impact on image search visibility and accessibility.",
      recommendation: "Add descriptive alt text to all images, including relevant keywords where appropriate.",
    },
    {
      id: "w3",
      title: "Broken Internal Links",
      description: "Found 7 broken internal links that lead to 404 pages.",
      impact: "Medium impact on user experience and site crawlability.",
      recommendation: "Fix or remove broken links to improve user experience and ensure proper site crawling.",
    },
    {
      id: "w4",
      title: "Non-Secure Pages (HTTP)",
      description: "Some pages are still served over HTTP instead of HTTPS.",
      impact: "High impact on security and potentially on search rankings as Google prefers secure sites.",
      recommendation: "Implement SSL certificate and redirect all HTTP traffic to HTTPS.",
    },
  ]

  // Generate mock passed checks
  const passedChecks = [
    {
      id: "p1",
      title: "Mobile Responsiveness",
      description: "Your site is properly optimized for mobile devices.",
    },
    {
      id: "p2",
      title: "XML Sitemap",
      description: "XML sitemap is properly configured and submitted to search engines.",
    },
    {
      id: "p3",
      title: "Robots.txt",
      description: "Robots.txt file is properly configured.",
    },
    {
      id: "p4",
      title: "Proper Use of Heading Tags",
      description: "Heading tags (H1, H2, etc.) are used correctly throughout the site.",
    },
    {
      id: "p5",
      title: "No Keyword Stuffing",
      description: "Content appears natural without excessive keyword usage.",
    },
  ]

  // Randomly select a subset of issues based on the score
  const numCritical = score < 70 ? 3 : score < 85 ? 2 : score < 95 ? 1 : 0
  const numWarnings = score < 70 ? 4 : score < 85 ? 3 : score < 95 ? 2 : 1

  const selectedCritical = criticalIssues.slice(0, numCritical)
  const selectedWarnings = warningIssues.slice(0, numWarnings)

  // Performance metrics
  const performanceScore = Math.floor(Math.random() * 30) + 70 // 70-100
  const lcp = Math.random() * 3 + 1 // 1-4 seconds
  const fid = Math.floor(Math.random() * 200) + 50 // 50-250ms
  const cls = Math.random() * 0.3 // 0-0.3

  // SEO metrics
  const seoScore = Math.floor(Math.random() * 30) + 70 // 70-100
  const hasTitle = Math.random() > 0.2
  const hasMeta = Math.random() > 0.3
  const hasHeadings = Math.random() > 0.1
  const hasImages = Math.random() > 0.4
  const hasLinks = Math.random() > 0.2

  return {
    score,
    issues: {
      critical: selectedCritical,
      warnings: selectedWarnings,
      passed: passedChecks,
    },
    performance: {
      score: performanceScore,
      metrics: {
        lcp,
        fid,
        cls,
      },
    },
    seo: {
      score: seoScore,
      metrics: {
        title: hasTitle,
        meta: hasMeta,
        headings: hasHeadings,
        images: hasImages,
        links: hasLinks,
      },
    },
  }
}

/**
 * Fetches audit history
 */
export async function fetchAuditHistory() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate mock audit history
  const history = []
  const domains = [
    "example.com",
    "mystore.shop",
    "techblog.io",
    "marketingpro.net",
    "ecommerce-site.com",
    "portfolio.design",
    "agency.digital",
  ]

  for (let i = 0; i < 10; i++) {
    const domain = domains[Math.floor(Math.random() * domains.length)]
    const score = Math.floor(Math.random() * 40) + 60 // 60-100
    const date = new Date(Date.now() - (i * 3 + Math.floor(Math.random() * 3)) * 24 * 60 * 60 * 1000).toISOString()

    const criticalCount = Math.floor(Math.random() * 4)
    const warningsCount = Math.floor(Math.random() * 6) + 1
    const passedCount = Math.floor(Math.random() * 10) + 5

    history.push({
      id: `audit-${i + 1}`,
      url: `https://${domain}`,
      date,
      score,
      issues: {
        critical: criticalCount,
        warnings: warningsCount,
        passed: passedCount,
      },
    })
  }

  // Sort by date (newest first)
  history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return history
}

