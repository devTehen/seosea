// Mock API functions for SERP analysis

/**
 * Analyzes SERP for a given keyword
 */
export async function analyzeSERP({
  keyword,
  location,
  device,
}: {
  keyword: string
  location: string
  device: string
}) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 3500))

  // Generate mock organic results
  const organicResults = []
  const domains = [
    "example.com",
    "competitor1.com",
    "competitor2.org",
    "wikipedia.org",
    "blog.industry.com",
    "news.tech",
    "guide.expert.io",
    "review.site",
    "forum.discussion.net",
    "academy.learning.org",
  ]

  for (let i = 0; i < 10; i++) {
    const domain = domains[i % domains.length]
    const title = `${i === 0 ? "Ultimate" : i === 1 ? "Complete" : i === 2 ? "Best" : "Top"} Guide to ${keyword} ${i === 0 ? "(Updated)" : i === 1 ? "for Beginners" : i === 2 ? "in " + new Date().getFullYear() : ""}`

    const features = []
    if (Math.random() > 0.7) features.push("Featured Snippet")
    if (Math.random() > 0.7) features.push("Sitelinks")
    if (Math.random() > 0.8) features.push("FAQ")
    if (Math.random() > 0.9) features.push("Video")

    organicResults.push({
      position: i + 1,
      title: title,
      url: `https://${domain}/${keyword.replace(/\s+/g, "-")}`,
      description: `Discover the best ${keyword} strategies and tips. Learn how to implement ${keyword} effectively for your business. Comprehensive guide with examples and case studies.`,
      features: features,
    })
  }

  // Generate mock SERP features
  const features = {
    featuredSnippet:
      Math.random() > 0.3
        ? {
            type: Math.random() > 0.5 ? "paragraph" : Math.random() > 0.5 ? "list" : "table",
            content: `${keyword} is a strategy that helps businesses improve their online visibility. It involves optimizing website content, technical aspects, and building quality backlinks to rank higher in search engine results.`,
            source: organicResults[0].url,
          }
        : undefined,
    peopleAlsoAsk:
      Math.random() > 0.2
        ? [
            `What is ${keyword}?`,
            `How does ${keyword} work?`,
            `Why is ${keyword} important?`,
            `How much does ${keyword} cost?`,
          ]
        : undefined,
    localPack: Math.random() > 0.7,
    imageCarousel: Math.random() > 0.6,
    videoResults: Math.random() > 0.5,
    newsResults: Math.random() > 0.8,
    shoppingResults: Math.random() > 0.9,
    knowledgePanel:
      Math.random() > 0.7
        ? {
            title: keyword,
            description: `${keyword} refers to the process of optimizing online content to improve visibility in search engine results pages (SERPs).`,
            attributes: {
              Type: "Digital Marketing Strategy",
              Purpose: "Improve online visibility",
              "Key Components": "On-page, Off-page, Technical",
              "Related Concepts": "Content Marketing, PPC, Social Media",
            },
          }
        : undefined,
    relatedSearches: [
      `${keyword} examples`,
      `${keyword} tools`,
      `${keyword} strategies`,
      `${keyword} vs traditional marketing`,
      `${keyword} best practices`,
      `${keyword} for small business`,
      `${keyword} certification`,
      `${keyword} agencies`,
    ],
  }

  // Generate mock competitors data for SERP
  const competitors = organicResults.slice(0, 5).map((result) => {
    const domain = new URL(result.url).hostname

    return {
      domain: domain,
      position: result.position,
      title: result.title,
      url: result.url,
      description: result.description,
      features: result.features,
      contentAnalysis: {
        wordCount: Math.floor(Math.random() * 1000) + 500,
        headings: Math.floor(Math.random() * 10) + 3,
        images: Math.floor(Math.random() * 8) + 1,
        videos: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0,
        readabilityScore: Math.floor(Math.random() * 30) + 70,
      },
    }
  })

  // Generate mock visual elements detected by computer vision
  const visualElements = [
    {
      type: "Featured Snippet",
      boundingBox: {
        top: 15,
        left: 10,
        width: 80,
        height: 15,
      },
      confidence: 98,
    },
    {
      type: "People Also Ask",
      boundingBox: {
        top: 32,
        left: 10,
        width: 80,
        height: 20,
      },
      confidence: 95,
    },
    {
      type: "Organic Result",
      boundingBox: {
        top: 55,
        left: 10,
        width: 80,
        height: 10,
      },
      confidence: 99,
    },
    {
      type: "Organic Result",
      boundingBox: {
        top: 67,
        left: 10,
        width: 80,
        height: 10,
      },
      confidence: 99,
    },
    {
      type: "Related Searches",
      boundingBox: {
        top: 85,
        left: 10,
        width: 80,
        height: 12,
      },
      confidence: 92,
    },
  ]

  return {
    keyword,
    location,
    device,
    date: new Date().toISOString(),
    organicResults,
    features,
    competitors,
    visualElements,
    screenshot: "/placeholder.svg?height=600&width=400",
  }
}

/**
 * Fetches SERP analysis history
 */
export async function fetchSerpHistory() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate mock SERP history
  const history = []
  const keywords = [
    "seo strategies",
    "content marketing",
    "digital marketing",
    "search engine optimization",
    "keyword research",
    "backlink building",
    "local seo",
    "mobile optimization",
  ]

  const devices = ["desktop", "mobile", "tablet"]
  const locations = ["United States", "United Kingdom", "Canada", "Australia", "Germany"]

  for (let i = 0; i < 10; i++) {
    const keyword = keywords[Math.floor(Math.random() * keywords.length)]
    const device = devices[Math.floor(Math.random() * devices.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    const date = new Date(Date.now() - (i * 3 + Math.floor(Math.random() * 3)) * 24 * 60 * 60 * 1000).toISOString()

    // Generate random features
    const features = []
    if (Math.random() > 0.5) features.push("Featured Snippet")
    if (Math.random() > 0.6) features.push("People Also Ask")
    if (Math.random() > 0.7) features.push("Knowledge Panel")
    if (Math.random() > 0.8) features.push("Local Pack")

    history.push({
      id: `serp-${i + 1}`,
      keyword,
      date,
      device,
      location,
      features,
    })
  }

  // Sort by date (newest first)
  history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return history
}

