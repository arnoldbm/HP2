'use client'

import { useState, useEffect } from 'react'
import { resendVerificationEmail } from '@/app/actions/auth'

interface EmailVerificationBannerProps {
  email: string
  onDismiss?: () => void
}

export function EmailVerificationBanner({ email, onDismiss }: EmailVerificationBannerProps) {
  const [isResending, setIsResending] = useState(false)
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    console.log('✅ EmailVerificationBanner MOUNTED with email:', email)
  }, [email])

  async function handleResend() {
    setIsResending(true)
    setResendStatus('idle')

    const result = await resendVerificationEmail(email)

    if (result.success) {
      setResendStatus('success')
    } else {
      setResendStatus('error')
    }

    setIsResending(false)
  }

  function handleDismiss() {
    setIsDismissed(true)
    if (onDismiss) {
      onDismiss()
    }
  }

  if (isDismissed) {
    console.log('⚠️ Banner dismissed, not rendering')
    return null
  }

  console.log('🎨 Rendering EmailVerificationBanner for:', email)

  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-amber-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-900">
                Please verify your email address
              </p>
              <p className="text-sm text-amber-700">
                We sent a verification link to <strong>{email}</strong>.
                You need to verify your email before you can create teams or invite members.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {resendStatus === 'success' && (
              <p className="text-sm text-green-700 font-medium">Email sent!</p>
            )}
            {resendStatus === 'error' && (
              <p className="text-sm text-red-700 font-medium">Failed to send</p>
            )}

            <button
              onClick={handleResend}
              disabled={isResending || resendStatus === 'success'}
              className="px-3 py-1.5 text-sm font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? 'Sending...' : 'Resend Email'}
            </button>

            <button
              onClick={handleDismiss}
              className="p-1 text-amber-700 hover:text-amber-900 rounded-md transition-colors"
              aria-label="Dismiss"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
