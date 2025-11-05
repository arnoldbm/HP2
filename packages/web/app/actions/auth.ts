'use server'

import { supabaseAdmin } from '@/lib/db/supabase-admin'
import { sendEmailVerification } from '@/lib/email/resend'
import crypto from 'crypto'

/**
 * Create User Profile and Organization
 *
 * Called after successful signup to create user profile and default organization
 */
export async function createUserProfileAndOrg(
  userId: string,
  email: string,
  fullName?: string
): Promise<{
  success: boolean
  error?: string
}> {
  try {
    // 1. Create user profile (email_verified defaults to false)
    const { error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .insert({
        id: userId,
        email: email.toLowerCase(),
        full_name: fullName || null,
        email_verified: false, // Explicitly set to false until they verify
      })

    if (profileError) {
      console.error('Failed to create user profile:', profileError)
      return {
        success: false,
        error: 'Failed to create user profile',
      }
    }

    // 2. Create default organization
    const orgName = fullName
      ? `${fullName}'s Organization`
      : `${email.split('@')[0]}'s Organization`

    const { error: orgError } = await supabaseAdmin
      .from('organizations')
      .insert({
        name: orgName,
        owner_id: userId,
      })

    if (orgError) {
      console.error('Failed to create organization:', orgError)
      // Don't fail - profile was created successfully
      // User can create organization later
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Unexpected error in createUserProfileAndOrg:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Send Initial Email Verification
 *
 * Called after signup to send the first verification email
 */
export async function sendInitialVerificationEmail(
  userId: string,
  email: string
): Promise<{
  success: boolean
  error?: string
}> {
  try {
    // 1. Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // 2. Delete any existing tokens for this user
    await supabaseAdmin
      .from('email_verification_tokens')
      .delete()
      .eq('user_id', userId)

    // 3. Create new verification token
    const { error: tokenError } = await supabaseAdmin
      .from('email_verification_tokens')
      .insert({
        user_id: userId,
        token,
        expires_at: expiresAt.toISOString(),
      })

    if (tokenError) {
      console.error('Failed to create verification token:', tokenError)
      return {
        success: false,
        error: 'Failed to generate verification link',
      }
    }

    // 4. Send email via Resend
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const verificationLink = `${baseUrl}/auth/verify-email?token=${token}`

    const emailResult = await sendEmailVerification(email, {
      email,
      verificationLink,
    })

    if (!emailResult.success) {
      return {
        success: false,
        error: emailResult.error || 'Failed to send verification email',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Unexpected error sending verification email:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Resend Email Verification
 *
 * Generates a new verification token and sends email via Resend
 */
export async function resendVerificationEmail(
  email: string
): Promise<{
  success: boolean
  error?: string
}> {
  try {
    // 1. Find user by email
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('id, email_verified')
      .eq('email', email.toLowerCase())
      .single()

    if (profileError || !profile) {
      return {
        success: false,
        error: 'User not found',
      }
    }

    if (profile.email_verified) {
      return {
        success: false,
        error: 'Email is already verified',
      }
    }

    // 2. Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // 3. Delete any existing tokens for this user
    await supabaseAdmin
      .from('email_verification_tokens')
      .delete()
      .eq('user_id', profile.id)

    // 4. Create new verification token
    const { error: tokenError } = await supabaseAdmin
      .from('email_verification_tokens')
      .insert({
        user_id: profile.id,
        token,
        expires_at: expiresAt.toISOString(),
      })

    if (tokenError) {
      console.error('Failed to create verification token:', tokenError)
      return {
        success: false,
        error: 'Failed to generate verification link',
      }
    }

    // 5. Send email via Resend
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const verificationLink = `${baseUrl}/auth/verify-email?token=${token}`

    const emailResult = await sendEmailVerification(email, {
      email,
      verificationLink,
    })

    if (!emailResult.success) {
      return {
        success: false,
        error: emailResult.error || 'Failed to send verification email',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Unexpected error resending verification email:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Verify Email with Token
 *
 * Validates the verification token and marks email as verified
 */
export async function verifyEmailToken(
  token: string
): Promise<{
  success: boolean
  error?: string
}> {
  try {
    // 1. Find token in database
    const { data: tokenData, error: tokenError } = await supabaseAdmin
      .from('email_verification_tokens')
      .select('user_id, expires_at, verified_at')
      .eq('token', token)
      .single()

    if (tokenError || !tokenData) {
      return {
        success: false,
        error: 'Invalid verification link',
      }
    }

    // 2. Check if already verified
    if (tokenData.verified_at) {
      return {
        success: false,
        error: 'Email already verified',
      }
    }

    // 3. Check if expired
    if (new Date(tokenData.expires_at) < new Date()) {
      return {
        success: false,
        error: 'Verification link has expired. Please request a new one.',
      }
    }

    // 4. Mark token as verified
    await supabaseAdmin
      .from('email_verification_tokens')
      .update({ verified_at: new Date().toISOString() })
      .eq('token', token)

    // 5. Update user profile to mark email as verified
    const { error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .update({ email_verified: true })
      .eq('id', tokenData.user_id)

    if (profileError) {
      console.error('Failed to update profile:', profileError)
      return {
        success: false,
        error: 'Failed to verify email',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Unexpected error verifying email:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
