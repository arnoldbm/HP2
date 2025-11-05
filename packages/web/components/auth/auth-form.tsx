'use client'

import React, { useState } from 'react'
import { supabase } from '@/lib/db/supabase'

export interface AuthFormProps {
  mode: 'signin' | 'signup'
  onSuccess?: () => void
  onToggleMode?: () => void
}

export function AuthForm({ mode, onSuccess, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      if (mode === 'signup') {
        // Sign up new user
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        })

        if (signUpError) throw signUpError

        if (data.user) {
          // Check if email confirmation is required
          if (data.user.confirmed_at) {
            setMessage('Account created! You can now start tracking games.')
            setTimeout(() => {
              onSuccess?.()
            }, 1500)
          } else {
            setMessage(
              'Account created! Please check your email to confirm your account before signing in.'
            )
            // Don't call onSuccess - user needs to confirm email first
          }
        }
      } else {
        // Sign in existing user
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) throw signInError

        if (data.user) {
          setMessage('Welcome back!')
          setTimeout(() => {
            onSuccess?.()
          }, 500)
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err)

      // Handle specific error cases
      if (err.message?.includes('User already registered')) {
        setError(
          'This email is already registered. Please sign in instead or use the "Forgot password?" link if you need to reset your password.'
        )
      } else if (err.message?.includes('Email not confirmed')) {
        setError(
          'Please confirm your email address first. Check your inbox or click "Resend confirmation email" below.'
        )
      } else if (err.message?.includes('Invalid login credentials')) {
        setError(
          'Invalid email or password. If you just reset the database, you\'ll need to create a new account. Click "Sign up" below to create an account.'
        )
      } else {
        setError(err.message || 'An error occurred during authentication')
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (resetError) throw resetError

      setMessage('Password reset email sent! Check your inbox.')
    } catch (err: any) {
      console.error('Password reset error:', err)
      setError(err.message || 'Failed to send password reset email')
    } finally {
      setLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (resendError) throw resendError

      setMessage('Confirmation email resent! Check your inbox.')
    } catch (err: any) {
      console.error('Resend confirmation error:', err)
      setError(err.message || 'Failed to resend confirmation email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name field (sign up only) */}
        {mode === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Smith"
              disabled={loading}
            />
          </div>
        )}

        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="coach@example.com"
            disabled={loading}
          />
        </div>

        {/* Password field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            disabled={loading}
          />
          {mode === 'signup' && (
            <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Success message */}
        {message && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-600">{message}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {mode === 'signup' ? 'Creating Account...' : 'Signing In...'}
            </span>
          ) : mode === 'signup' ? (
            'Create Account'
          ) : (
            'Sign In'
          )}
        </button>

        {/* Forgot password / Resend confirmation */}
        {mode === 'signin' && (
          <div className="flex justify-between text-sm">
            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={loading}
              className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
            >
              Forgot password?
            </button>
            <button
              type="button"
              onClick={handleResendConfirmation}
              disabled={loading}
              className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
            >
              Resend confirmation
            </button>
          </div>
        )}

        {/* Toggle mode */}
        {onToggleMode && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onToggleMode}
              disabled={loading}
              className="text-sm text-gray-600 hover:text-gray-700 disabled:text-gray-400"
            >
              {mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <span className="font-semibold text-blue-600">Sign in</span>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <span className="font-semibold text-blue-600">Sign up</span>
                </>
              )}
            </button>
          </div>
        )}
      </form>

      {/* Free tier info (sign up only) */}
      {mode === 'signup' && (
        <div className="mt-6 space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-900">
              <strong>Free tier includes:</strong> Track up to 3 games per season with full
              analytics and AI practice plans. No credit card required.
            </p>
          </div>
          {/* Local development email note */}
          {window.location.hostname === 'localhost' && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-xs text-amber-900">
                <strong>📧 Local Development:</strong> View confirmation emails at{' '}
                <a
                  href="http://localhost:54324"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold hover:text-amber-950"
                >
                  localhost:54324
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
