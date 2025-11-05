/**
 * Organization Setup Utilities
 *
 * Helper functions for creating and managing organizations
 * during user signup and onboarding flow.
 */

/**
 * Generate a URL-safe slug from an organization or user name
 *
 * @param name - The name to convert to a slug
 * @returns URL-safe slug (lowercase, alphanumeric + hyphens)
 *
 * @example
 * generateOrgSlug('John Smith') => 'john-smith'
 * generateOrgSlug("O'Connor's Team") => 'oconnors-team'
 */
export function generateOrgSlug(name: string): string {
  return name
    .trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

/**
 * Generate a default organization name from a user's full name
 *
 * @param fullName - User's full name
 * @returns Organization name (e.g., "John Smith's Teams")
 *
 * @example
 * generateOrgName('John Smith') => "John Smith's Teams"
 * generateOrgName('') => 'My Teams'
 */
export function generateOrgName(fullName: string): string {
  const trimmed = fullName.trim()

  if (!trimmed) {
    return 'My Teams'
  }

  // Add possessive apostrophe + "Teams"
  return `${trimmed}'s Teams`
}

/**
 * Generate a unique slug by appending a number if conflicts exist
 *
 * @param baseSlug - The desired slug
 * @param existingSlugs - Array of slugs that already exist
 * @returns Unique slug (e.g., 'john-smith-2' if 'john-smith' exists)
 *
 * @example
 * generateUniqueSlug('john-smith', []) => 'john-smith'
 * generateUniqueSlug('john-smith', ['john-smith']) => 'john-smith-2'
 * generateUniqueSlug('john-smith', ['john-smith', 'john-smith-2']) => 'john-smith-3'
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  // If base slug doesn't exist, use it
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug
  }

  // Find the next available number
  let counter = 2
  let candidateSlug = `${baseSlug}-${counter}`

  while (existingSlugs.includes(candidateSlug)) {
    counter++
    candidateSlug = `${baseSlug}-${counter}`
  }

  return candidateSlug
}
