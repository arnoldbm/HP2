'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/db/supabase'
import { getUserProfile } from '@/app/actions/users'
import { ProfileForm } from '@/components/settings/profile-form'
import type { UserProfile } from '@/lib/validation/user-schemas'

export default function SettingsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
          router.push('/demo/game-tracking')
          return
        }

        setUserId(user.id)

        // Get user profile
        let { data: profileData, error: profileError } = await getUserProfile(user.id)

        // If profile doesn't exist, create it (fallback for existing users)
        if (profileError && !profileData) {
          // Create profile
          const { error: insertError } = await supabase
            .from('user_profiles')
            .insert({
              id: user.id,
              email: user.email || '',
              full_name: user.user_metadata?.full_name || '',
            })

          if (!insertError) {
            // Retry fetching profile
            const result = await getUserProfile(user.id)
            profileData = result.data
            profileError = result.error
          }
        }

        if (profileError) {
          setError(profileError)
        } else {
          setProfile(profileData)
        }
      } catch (err) {
        setError('Failed to load profile')
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  const profileError = error

  if (profileError || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg max-w-md">
          <h2 className="font-bold text-lg mb-2">Error Loading Profile</h2>
          <p>{profileError || 'Failed to load user profile'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
            <p className="text-sm text-gray-600 mt-1">
              Update your personal information
            </p>
          </div>

          {userId && <ProfileForm profile={profile} userId={userId} />}
        </div>

        {/* Account Section (Future) */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Account</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage your account settings
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Password</p>
                <p className="text-sm text-gray-600">Change your password</p>
              </div>
              <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Delete Account</p>
                <p className="text-sm text-gray-600">Permanently delete your account</p>
              </div>
              <button className="px-4 py-2 text-red-600 hover:text-red-700 font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
