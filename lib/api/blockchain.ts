// Mock API functions for blockchain operations

/**
 * Verifies content on the blockchain
 */
export async function verifyContent({ url, hash }: { url?: string; hash?: string }) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock response
  const verified = Math.random() > 0.2 // 80% chance of success

  if (verified) {
    return {
      verified: true,
      contentHash:
        hash || `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      timestamp: new Date().toISOString(),
      transactionId: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      blockNumber: Math.floor(Math.random() * 1000000) + 15000000,
    }
  } else {
    return {
      verified: false,
      error: "Content not found on blockchain",
    }
  }
}

/**
 * Registers content on the blockchain
 */
export async function registerContent({ url }: { url: string }) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock response
  const success = Math.random() > 0.1 // 90% chance of success

  if (success) {
    return {
      success: true,
      contentHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      transactionId: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      timestamp: new Date().toISOString(),
    }
  } else {
    return {
      success: false,
      error: "Failed to register content",
    }
  }
}

/**
 * Verifies a hash on the blockchain
 */
export async function verifyHash({ type, value }: { type: string; value: string }) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock response
  const verified = Math.random() > 0.3 // 70% chance of success

  if (verified) {
    return {
      verified: true,
      contentHash:
        type === "hash"
          ? value
          : `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(), // Random date in the last 30 days
      source: type === "url" ? value : "Unknown",
    }
  } else {
    return {
      verified: false,
      error: "Content verification failed",
    }
  }
}

/**
 * Fetches blockchain transactions
 */
export async function fetchTransactions() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate mock transactions
  const transactions = []
  const types = ["register", "verify", "update"]
  const statuses = ["confirmed", "pending", "failed"]

  for (let i = 0; i < 10; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()

    transactions.push({
      id: `tx-${i + 1}`,
      type,
      status,
      timestamp,
      contentUrl: `https://example.com/content-${i + 1}`,
      contentHash: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      blockNumber: status === "confirmed" ? Math.floor(Math.random() * 1000000) + 15000000 : undefined,
    })
  }

  return transactions
}

/**
 * Fetches blockchain performance metrics
 */
export async function fetchPerformanceMetrics() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // Generate mock daily transaction data
  const dailyTransactions = []
  const dates = ["Jan 1", "Jan 8", "Jan 15", "Jan 22", "Jan 29", "Feb 5", "Feb 12", "Feb 19", "Feb 26"]

  let count = Math.floor(Math.random() * 50) + 100
  let confirmationTime = Math.random() * 2 + 1 // 1-3 seconds

  for (const date of dates) {
    // Random change in count and confirmation time
    count += Math.floor(Math.random() * 20) - 5
    confirmationTime += Math.random() * 0.4 - 0.2

    // Ensure values stay in reasonable ranges
    count = Math.max(50, count)
    confirmationTime = Math.max(0.5, Math.min(5, confirmationTime))

    dailyTransactions.push({
      date,
      count,
      confirmationTime,
    })
  }

  return {
    transactionCount: dailyTransactions.reduce((sum, day) => sum + day.count, 0),
    averageConfirmationTime:
      dailyTransactions.reduce((sum, day) => sum + day.confirmationTime, 0) / dailyTransactions.length,
    successRate: 98.7, // Mock success rate
    dailyTransactions,
  }
}

