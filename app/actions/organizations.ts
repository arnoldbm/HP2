'use server'

import { supabaseAdmin } from '@/lib/db/supabase-admin'
import {
  generateOrgSlug,
  generateOrgName,
  generateUniqueSlug,
} from '@/lib/utils/organization-setup'

/**
 * Setup User Organization
 *
 * Automatically create an organization for a new user and add them as owner.
 * This runs after successful user signup.
 *
 * @param userId - Authenticated user's ID from Supabase Auth
 * @param fullName - User's full name
 * @returns Created organization and membership
 */
export async function setupUserOrganization(input: {
  userId: string
  fullName: string
}): Promise<{
  success: boolean
  organization?: {
    id: string
    name: string
    slug: string
  }
  membership?: {
    id: string
    role: string
  }
  error?: string
}> {
  try {
    // 1. Check if user already has an organization
    const { data: existingMembership } = await supabaseAdmin
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', input.userId)
      .single()

    if (existingMembership) {
      // User already has an organization, fetch and return it
      const { data: existingOrg } = await supabaseAdmin
        .from('organizations')
        .select('id, name, slug')
        .eq('id', existingMembership.organization_id)
        .single()

      if (existingOrg) {
        return {
          success: true,
          organization: existingOrg,
          membership: {
            id: existingMembership.organization_id,
            role: 'owner',
          },
        }
      }
    }

    // 2. Generate organization name and slug
    const orgName = generateOrgName(input.fullName)
    const baseSlug = generateOrgSlug(input.fullName || 'my-teams')

    // 3. Check for slug conflicts
    const { data: existingSlugs } = await supabaseAdmin
      .from('organizations')
      .select('slug')
      .like('slug', `${baseSlug}%`)

    const conflictingSlugs = existingSlugs?.map((org) => org.slug) || []
    const uniqueSlug = generateUniqueSlug(baseSlug, conflictingSlugs)

    // 4. Create organization
    const { data: organization, error: orgError } = await supabaseAdmin
      .from('organizations')
      .insert({
        name: orgName,
        slug: uniqueSlug,
        settings: {},
      })
      .select('id, name, slug')
      .single()

    if (orgError) {
      console.error('Failed to create organization:', orgError)
      return {
        success: false,
        error: 'Failed to create organization',
      }
    }

    // 5. Add user as organization owner
    const { data: membership, error: membershipError } = await supabaseAdmin
      .from('organization_members')
      .insert({
        organization_id: organization.id,
        user_id: input.userId,
        role: 'owner',
      })
      .select('id, role')
      .single()

    if (membershipError) {
      console.error('Failed to add user as organization owner:', membershipError)
      // Rollback: delete the organization
      await supabaseAdmin.from('organizations').delete().eq('id', organization.id)
      return {
        success: false,
        error: 'Failed to add user as organization owner',
      }
    }

    return {
      success: true,
      organization,
      membership,
    }
  } catch (error) {
    console.error('Unexpected error in setupUserOrganization:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Get User's Organizations
 *
 * Fetch all organizations the user belongs to
 */
export async function getUserOrganizations(userId: string): Promise<{
  success: boolean
  organizations?: Array<{
    id: string
    name: string
    slug: string
    role: string
  }>
  error?: string
}> {
  try {
    const { data: memberships, error } = await supabaseAdmin
      .from('organization_members')
      .select(
        `
        role,
        organizations (
          id,
          name,
          slug
        )
      `
      )
      .eq('user_id', userId)

    if (error) {
      console.error('Failed to fetch user organizations:', error)
      return {
        success: false,
        error: 'Failed to fetch organizations',
      }
    }

    const organizations =
      memberships?.map((m: any) => ({
        id: m.organizations.id,
        name: m.organizations.name,
        slug: m.organizations.slug,
        role: m.role,
      })) || []

    return {
      success: true,
      organizations,
    }
  } catch (error) {
    console.error('Unexpected error in getUserOrganizations:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
