// Mock API functions for activity data

/**
 * Fetches recent activity data
 */
export async function fetchRecentActivity() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock activity data
  const activities = [
    {
      id: "act-1",
      type: "content_created",
      description: "Created new blog post 'Top 10 SEO Strategies for 2023'",
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 minutes ago
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
    },
    {
      id: "act-2",
      type: "keyword_added",
      description: "Added 15 new keywords to tracking",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
    },
    {
      id: "act-3",
      type: "site_audit",
      description: "Completed site audit for example.com",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      user: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MB",
      },
    },
    {
      id: "act-4",
      type: "content_optimized",
      description: "Optimized 3 landing pages for better SEO performance",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      user: {
        name: "Emily Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "EW",
      },
    },
    {
      id: "act-5",
      type: "serp_analysis",
      description: "Analyzed SERP for 'content marketing strategies'",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
    },
    {
      id: "act-6",
      type: "blockchain_verification",
      description: "Verified content integrity using blockchain",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
    },
  ]

  return activities
}

