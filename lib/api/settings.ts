interface ApiKey {
  id: string
  name: string
  key: string
  domain: string
  service: string
  permissions: string[]
  createdAt: string
  lastUsed?: string
  status: "active" | "expired" | "revoked"
}

interface ApiKeyFormData {
  name: string
  key: string
  domain: string
  service: string
  permissions: string[]
}

/**
 * Fetches all API keys
 */
export async function fetchApiKeys(): Promise<ApiKey[]> {
  try {
    const response = await fetch("/api/api-keys")

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to fetch API keys")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching API keys:", error)
    throw error
  }
}

/**
 * Adds a new API key
 */
export async function addApiKey(data: ApiKeyFormData): Promise<ApiKey> {
  try {
    const response = await fetch("/api/api-keys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to add API key")
    }

    return await response.json()
  } catch (error) {
    console.error("Error adding API key:", error)
    throw error
  }
}

/**
 * Updates an existing API key
 */
export async function updateApiKey(id: string, data: ApiKeyFormData): Promise<ApiKey> {
  try {
    const response = await fetch(`/api/api-keys/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to update API key")
    }

    return await response.json()
  } catch (error) {
    console.error("Error updating API key:", error)
    throw error
  }
}

/**
 * Deletes an API key
 */
export async function deleteApiKey(id: string): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`/api/api-keys/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete API key")
    }

    return await response.json()
  } catch (error) {
    console.error("Error deleting API key:", error)
    throw error
  }
}

/**
 * Tests an API key
 */
export async function testApiKey(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/api-keys/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to test API key")
    }

    return await response.json()
  } catch (error) {
    console.error("Error testing API key:", error)
    throw error
  }
}

