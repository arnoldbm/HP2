import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase'

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface AuthCredentials {
  email: string
  password: string
}

type AuthResult = {
  error?: string
}

type SignUpResult = AuthResult & {
  emailConfirmationSent?: boolean
}

interface AuthContextValue {
  status: AuthStatus
  session: Session | null
  user: User | null
  signIn: (credentials: AuthCredentials) => Promise<AuthResult>
  signUp: (credentials: AuthCredentials) => Promise<SignUpResult>
  signOut: () => Promise<AuthResult>
  resetPassword: (email: string) => Promise<AuthResult>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function formatError(error: unknown): string {
  if (!error) {
    return 'An unexpected error occurred'
  }

  if (typeof error === 'string') {
    return error
  }

  if (typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message
  }

  return 'An unexpected error occurred'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')

  const handleSessionChange = (nextSession: Session | null) => {
    setSession(nextSession)
    setStatus(nextSession ? 'authenticated' : 'unauthenticated')
  }

  useEffect(() => {
    let isMounted = true

    async function bootstrapSession() {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (!isMounted) return

        if (error) {
          handleSessionChange(null)
          return
        }

        handleSessionChange(data.session ?? null)
      } catch (error) {
        if (!isMounted) return
        console.error('Failed to load session', error)
        handleSessionChange(null)
      }
    }

    bootstrapSession()

    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      handleSessionChange(newSession)
    })

    return () => {
      isMounted = false
      data.subscription?.unsubscribe?.()
    }
  }, [])

  const signIn = async (credentials: AuthCredentials): Promise<AuthResult> => {
    const email = credentials.email.trim().toLowerCase()
    const password = credentials.password.trim()

    if (!email || !password) {
      return { error: 'Email and password are required' }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        handleSessionChange(null)
        return { error: error.message }
      }

      handleSessionChange(data.session ?? null)
      return {}
    } catch (error) {
      handleSessionChange(null)
      return { error: formatError(error) }
    }
  }

  const signUp = async (credentials: AuthCredentials): Promise<SignUpResult> => {
    const email = credentials.email.trim().toLowerCase()
    const password = credentials.password.trim()

    if (!email || !password) {
      return { error: 'Email and password are required' }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        handleSessionChange(null)
        return { error: error.message }
      }

      const hasSession = Boolean(data.session)
      handleSessionChange(data.session ?? null)

      return { emailConfirmationSent: !hasSession }
    } catch (error) {
      handleSessionChange(null)
      return { error: formatError(error) }
    }
  }

  const signOut = async (): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return { error: error.message }
      }

      handleSessionChange(null)
      return {}
    } catch (error) {
      return { error: formatError(error) }
    }
  }

  const resetPassword = async (email: string): Promise<AuthResult> => {
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedEmail) {
      return { error: 'Email is required' }
    }

    try {
      const redirectTo = process.env.EXPO_PUBLIC_SUPABASE_RESET_REDIRECT
      const { error } = await supabase.auth.resetPasswordForEmail(
        trimmedEmail,
        redirectTo ? { redirectTo } : undefined
      )

      if (error) {
        return { error: error.message }
      }

      return {}
    } catch (error) {
      return { error: formatError(error) }
    }
  }

  const value: AuthContextValue = useMemo(
    () => ({
      status,
      session,
      user: session?.user ?? null,
      signIn,
      signUp,
      signOut,
      resetPassword,
    }),
    [session, status]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
