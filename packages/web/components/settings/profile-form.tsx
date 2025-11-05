'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserProfileSchema, type UpdateUserProfileInput, type UserProfile } from '@/lib/validation/user-schemas'
import { updateUserProfile } from '@/app/actions/users'

export interface ProfileFormProps {
  profile: UserProfile
  userId: string
  onSuccess?: () => void
}

export function ProfileForm({ profile, userId, onSuccess }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserProfileInput>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      full_name: profile.full_name || '',
      avatar_url: profile.avatar_url || '',
    },
  })

  const onSubmit = async (data: UpdateUserProfileInput) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      const result = await updateUserProfile(userId, data)

      if (result.error) {
        setErrorMessage(result.error)
      } else {
        setSuccessMessage('Profile updated successfully!')
        onSuccess?.()
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email (Read-Only) */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={profile.email}
          disabled
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="full_name"
          {...register('full_name')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your full name"
        />
        {errors.full_name && (
          <p className="text-sm text-red-600 mt-1">{errors.full_name.message}</p>
        )}
      </div>

      {/* Avatar URL */}
      <div>
        <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700 mb-2">
          Avatar URL
        </label>
        <input
          type="text"
          id="avatar_url"
          {...register('avatar_url')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/avatar.jpg"
        />
        {errors.avatar_url && (
          <p className="text-sm text-red-600 mt-1">{errors.avatar_url.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">Optional: URL to your profile picture</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
