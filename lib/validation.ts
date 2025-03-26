/**
 * Validates a domain name format
 * @param domain Domain name to validate
 * @returns Boolean indicating if the domain is valid
 */
export function validateDomain(domain: string): boolean {
  // Basic domain validation regex
  const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
  return domainRegex.test(domain)
}

/**
 * Validates an API key format
 * @param apiKey API key to validate
 * @returns Boolean indicating if the API key is valid
 */
export function validateApiKey(apiKey: string): boolean {
  // Check if API key is at least 16 characters long
  if (apiKey.length < 16) {
    return false
  }

  // Check if API key contains only valid characters
  // This allows for common API key formats like:
  // - Base64 encoded strings
  // - Hexadecimal strings
  // - API keys with prefixes like "sk_", "pk_", etc.
  const apiKeyRegex = /^[a-zA-Z0-9_\-.]+$/
  return apiKeyRegex.test(apiKey)
}

/**
 * Validates permissions array
 * @param permissions Array of permissions to validate
 * @returns Boolean indicating if all permissions are valid
 */
export function validatePermissions(permissions: string[]): boolean {
  const validPermissions = ["read", "write", "delete", "admin"]
  return permissions.every((permission) => validPermissions.includes(permission))
}

