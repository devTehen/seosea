// Mock API functions for dashboard data

/**
 * Fetches dashboard data including metrics, performance data, and recent activities
 */
export async function fetchDashboardData() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock content metrics data
  const contentMetrics = [
    { name: "Blog Posts", contentScore: 85 },
    { name: "Landing Pages", contentScore: 72 },
    { name: "Product Descriptions", contentScore: 68 },
    { name: "Social Media", contentScore: 90 },
    { name: "Email Newsletters", contentScore: 78 },
    { name: "Press Releases", contentScore: 65 },
  ]

  // Mock keyword metrics data
  const keywordMetrics = [
    { date: "Jan 1", ranking: 32 },
    { date: "Jan 8", ranking: 28 },
    { date: "Jan 15", ranking: 25 },
    { date: "Jan 22", ranking: 22 },
    { date: "Jan 29", ranking: 19 },
    { date: "Feb 5", ranking: 18 },
    { date: "Feb 12", ranking: 15 },
    { date: "Feb 19", ranking: 14 },
    { date: "Feb 26", ranking: 12 },
  ]

  // Mock performance data
  const performanceData = {
    contentGenerated: 156,
    keywordsTracked: 432,
    sitesAudited: 28,
    averageScore: 76,
  }

  // Mock recent audits
  const recentAudits = [
    { domain: "example.com", score: 87 },
    { domain: "mystore.shop", score: 72 },
    { domain: "techblog.io", score: 91 },
    { domain: "marketingpro.net", score: 65 },
    { domain: "ecommerce-site.com", score: 78 },
  ]

  // Mock recent issues
  const recentIssues = [
    { title: "Missing meta descriptions", domain: "example.com", severity: "Medium" },
    { title: "Slow page load time", domain: "mystore.shop", severity: "High" },
    { title: "Duplicate content", domain: "marketingpro.net", severity: "Medium" },
    { title: "Broken links", domain: "ecommerce-site.com", severity: "High" },
    { title: "Mobile usability issues", domain: "techblog.io", severity: "Low" },
  ]

  return {
    contentMetrics,
    keywordMetrics,
    performanceData,
    recentAudits,
    recentIssues,
  }
}

