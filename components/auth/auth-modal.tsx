'use client'

import React, { useState } from 'react'
import { AuthForm } from './auth-form'

export interface AuthModalProps {
  initialMode?: 'signin' | 'signup'
  onSuccess?: () => void
  onClose?: () => void
}

export function AuthModal({ initialMode = 'signup', onSuccess, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode)

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-gray-600">
            {mode === 'signup'
              ? 'Start tracking games and planning practices'
              : 'Sign in to continue tracking'}
          </p>
        </div>

        {/* Auth form */}
        <AuthForm mode={mode} onSuccess={onSuccess} onToggleMode={toggleMode} />
      </div>
    </div>
  )
}
