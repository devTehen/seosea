// Mock API functions for content operations

/**
 * Generates content based on provided parameters
 */
export async function generateContent({
  topic,
  keywords,
  contentType,
  tone,
  length,
}: {
  topic: string
  keywords: string[]
  contentType: string
  tone: number
  length: number
}) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Generate mock content based on parameters
  const toneText = tone < 33 ? "professional" : tone < 66 ? "conversational" : "casual"

  // Mock content generation
  const intro = `${toneText === "casual" ? "Hey there!" : toneText === "conversational" ? "Hello," : "Dear Reader,"} Today we're going to explore ${topic}.`

  const keywordSection = `This ${contentType} will cover key aspects of ${topic} including ${keywords.slice(0, 3).join(", ")}.`

  const body = `
${topic} is becoming increasingly important in today's digital landscape. As more businesses focus on their online presence, understanding the nuances of ${topic} can give you a competitive edge.

${keywords[0]} is a fundamental aspect that cannot be overlooked. It forms the foundation of any successful strategy related to ${topic}.

When considering ${keywords[1]}, it's essential to approach it with a clear methodology. This ensures consistent results and measurable outcomes.

${keywords[2] ? `${keywords[2]} represents an opportunity for innovation and differentiation. By leveraging this aspect effectively, you can stand out from competitors.` : ""}

The landscape of ${topic} is constantly evolving, requiring professionals to stay updated with the latest trends and best practices.
`

  const conclusion = `In conclusion, mastering ${topic} requires a comprehensive understanding of its various components and how they interact. By focusing on ${keywords.slice(0, 2).join(" and ")}, you can develop effective strategies that drive results.`

  // Adjust content length based on the length parameter
  const contentParts = [intro, keywordSection, body, conclusion]
  const fullContent = contentParts.join("\n\n")

  // Simulate different content lengths
  if (length < 300) {
    return intro + "\n\n" + conclusion
  } else if (length < 500) {
    return intro + "\n\n" + keywordSection + "\n\n" + conclusion
  }

  return fullContent
}

/**
 * Optimizes content for SEO
 */
export async function optimizeContent({
  content,
  keywords,
}: {
  content: string
  keywords: string[]
}) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2500))

  // Calculate mock SEO score
  const score = Math.floor(Math.random() * 30) + 50 // Score between 50-80

  // Generate optimization suggestions
  const suggestions = [
    "Add more instances of your primary keyword in the first paragraph",
    "Include at least one more heading (H2) with a keyword variation",
    "Add internal links to related content on your website",
    "Increase content length by at least 200 words for better depth",
    "Add alt text to all images that includes relevant keywords",
    "Improve meta description to include primary and secondary keywords",
  ]

  // Randomly select 3-5 suggestions
  const selectedSuggestions = []
  const numSuggestions = Math.floor(Math.random() * 3) + 3 // 3-5 suggestions

  while (selectedSuggestions.length < numSuggestions) {
    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
    if (!selectedSuggestions.includes(suggestion)) {
      selectedSuggestions.push(suggestion)
    }
  }

  // Mock optimized content
  let optimizedContent = content

  // Add keyword if not present enough
  keywords.forEach((keyword) => {
    if (optimizedContent.toLowerCase().split(keyword.toLowerCase()).length < 3) {
      optimizedContent = optimizedContent.replace(/\. /g, (match, index) => {
        // Only replace some periods to avoid excessive keyword stuffing
        return Math.random() > 0.7 ? `. This relates to ${keyword} as well. ` : match
      })
    }
  })

  // Add a mock heading
  if (!optimizedContent.includes("<h2>") && !optimizedContent.includes("## ")) {
    const headingText = `Key Insights About ${keywords[0] || "This Topic"}`
    optimizedContent = optimizedContent.replace(/\n\n/g, `\n\n## ${headingText}\n\n`)
  }

  return {
    score,
    suggestions: selectedSuggestions,
    optimizedContent,
  }
}

