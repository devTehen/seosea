// Mock API functions for keyword operations

/**
 * Fetches tracked keywords
 */
export async function fetchKeywords() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // Generate mock keywords
  const keywords = []
  const keywordList = [
    "seo strategies",
    "content marketing",
    "digital marketing",
    "search engine optimization",
    "keyword research",
    "backlink building",
    "local seo",
    "mobile optimization",
    "voice search",
    "featured snippets",
    "e-commerce seo",
    "technical seo",
    "on-page optimization",
    "off-page optimization",
    "social media marketing",
  ]

  for (let i = 0; i < keywordList.length; i++) {
    const position = Math.floor(Math.random() * 30) + 1
    const previousPosition = position + (Math.random() > 0.7 ? Math.floor(Math.random() * 10) - 5 : 0)
    const searchVolume = Math.floor(Math.random() * 9000) + 1000
    const difficulty = Math.floor(Math.random() * 100)
    const cpc = Math.random() * 5 + 0.5

    keywords.push({
      id: `kw-${i + 1}`,
      keyword: keywordList[i],
      position: position,
      previousPosition: previousPosition > 0 ? previousPosition : 0,
      searchVolume: searchVolume,
      difficulty: difficulty,
      cpc: cpc,
      url: `https://example.com/${keywordList[i].replace(/\s+/g, "-")}`,
    })
  }

  return keywords
}

/**
 * Adds a new keyword to tracking
 */
export async function addKeyword(keyword: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Generate mock keyword data
  const position = Math.floor(Math.random() * 50) + 10
  const searchVolume = Math.floor(Math.random() * 9000) + 1000
  const difficulty = Math.floor(Math.random() * 100)
  const cpc = Math.random() * 5 + 0.5

  return {
    id: `kw-new-${Date.now()}`,
    keyword: keyword,
    position: position,
    previousPosition: 0, // New keyword, no previous position
    searchVolume: searchVolume,
    difficulty: difficulty,
    cpc: cpc,
    url: `https://example.com/${keyword.replace(/\s+/g, "-")}`,
  }
}

/**
 * Researches keyword suggestions
 */
export async function researchKeywords(seedKeyword: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Generate mock keyword suggestions
  const suggestions = []
  const prefixes = ["best", "top", "how to", "why", "what is", "guide to", "affordable", "professional"]
  const suffixes = ["guide", "tutorial", "tips", "strategies", "examples", "services", "tools", "software"]

  // Generate variations with prefixes
  for (let i = 0; i < 4; i++) {
    if (i < prefixes.length) {
      const keyword = `${prefixes[i]} ${seedKeyword}`
      suggestions.push({
        keyword: keyword,
        searchVolume: Math.floor(Math.random() * 5000) + 500,
        difficulty: Math.floor(Math.random() * 100),
        cpc: Math.random() * 5 + 0.5,
        competition: Math.random(),
      })
    }
  }

  // Generate variations with suffixes
  for (let i = 0; i < 4; i++) {
    if (i < suffixes.length) {
      const keyword = `${seedKeyword} ${suffixes[i]}`
      suggestions.push({
        keyword: keyword,
        searchVolume: Math.floor(Math.random() * 5000) + 500,
        difficulty: Math.floor(Math.random() * 100),
        cpc: Math.random() * 5 + 0.5,
        competition: Math.random(),
      })
    }
  }

  // Add the seed keyword itself
  suggestions.push({
    keyword: seedKeyword,
    searchVolume: Math.floor(Math.random() * 10000) + 5000,
    difficulty: Math.floor(Math.random() * 100),
    cpc: Math.random() * 5 + 0.5,
    competition: Math.random(),
  })

  // Add some question-based keywords
  const questions = ["how", "what", "why", "when", "where"]
  for (let i = 0; i < 3; i++) {
    if (i < questions.length) {
      const keyword = `${questions[i]} ${Math.random() > 0.5 ? "to" : "is"} ${seedKeyword}`
      suggestions.push({
        keyword: keyword,
        searchVolume: Math.floor(Math.random() * 3000) + 200,
        difficulty: Math.floor(Math.random() * 100),
        cpc: Math.random() * 5 + 0.5,
        competition: Math.random(),
      })
    }
  }

  // Sort by search volume (highest first)
  suggestions.sort((a, b) => b.searchVolume - a.searchVolume)

  return suggestions
}

/**
 * Fetches competitor keyword data
 */
export async function fetchCompetitors() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generate mock competitor data
  const competitors = []
  const domains = ["competitor1.com", "competitor2.org", "competitor3.io", "competitor4.net", "competitor5.co"]

  for (let i = 0; i < domains.length; i++) {
    const overlapCount = Math.floor(Math.random() * 50) + 20
    const avgPosition = Math.floor(Math.random() * 15) + 1
    const uniqueKeywords = Math.floor(Math.random() * 200) + 50

    // Generate common keywords
    const commonKeywords = []
    const keywordBases = ["seo", "marketing", "content", "digital", "search", "optimization"]

    for (let j = 0; j < 5; j++) {
      const base = keywordBases[Math.floor(Math.random() * keywordBases.length)]
      const suffix = ["strategies", "tips", "guide", "services", "tools"][Math.floor(Math.random() * 5)]
      const keyword = `${base} ${suffix}`

      const yourPosition = Math.floor(Math.random() * 20) + 1
      const theirPosition = Math.floor(Math.random() * 20) + 1

      commonKeywords.push({
        keyword: keyword,
        yourPosition: yourPosition,
        theirPosition: theirPosition,
      })
    }

    competitors.push({
      domain: domains[i],
      overlapCount: overlapCount,
      overlapKeywords: keywordBases,
      avgPosition: avgPosition,
      uniqueKeywords: uniqueKeywords,
      commonKeywords: commonKeywords,
    })
  }

  return competitors
}

