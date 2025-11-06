import React from 'react'
import { act, render } from '@testing-library/react-native'

import { AuthProvider, useAuth } from '@/lib/contexts/auth-context'
import { supabase } from '@/lib/supabase'

jest.mock('@/lib/supabase', () => {
  const auth = {
    getSession: jest.fn(),
    onAuthStateChange: jest.fn(),
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    resetPasswordForEmail: jest.fn(),
  }

  return {
    supabase: {
      auth,
    },
  }
})

const mockedSupabase = supabase as unknown as {
  auth: {
    getSession: jest.Mock
    onAuthStateChange: jest.Mock
    signInWithPassword: jest.Mock
    signUp: jest.Mock
    signOut: jest.Mock
    resetPasswordForEmail: jest.Mock
  }
}

function AuthConsumer({ onRender }: { onRender: (value: ReturnType<typeof useAuth>) => void }) {
  const value = useAuth()
  onRender(value)
  return null
}

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockedSupabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
    mockedSupabase.auth.onAuthStateChange.mockReturnValue({
      data: {
        subscription: {
          unsubscribe: jest.fn(),
        },
      },
    })
  })

  it('exposes unauthenticated state when no session exists', async () => {
    const renderSpy = jest.fn()

    render(
      <AuthProvider>
        <AuthConsumer onRender={renderSpy} />
      </AuthProvider>
    )

    await act(async () => {
      await Promise.resolve()
    })

    const lastCall = renderSpy.mock.calls.at(-1)
    expect(lastCall).toBeDefined()
    const authValue = lastCall![0]
    expect(authValue.status).toBe('unauthenticated')
    expect(authValue.session).toBeNull()
    expect(authValue.user).toBeNull()
  })

  it('signs in and updates session', async () => {
    const renderSpy = jest.fn()
    const mockSession = { user: { id: 'user-1', email: 'coach@example.com' } }

    mockedSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { session: mockSession },
      error: null,
    })

    render(
      <AuthProvider>
        <AuthConsumer onRender={renderSpy} />
      </AuthProvider>
    )

    await act(async () => {
      await Promise.resolve()
    })

    const authValue = renderSpy.mock.calls.at(-1)![0]

    await act(async () => {
      const result = await authValue.signIn({ email: 'coach@example.com', password: 'password123' })
      expect(result.error).toBeUndefined()
    })

    const updatedValue = renderSpy.mock.calls.at(-1)![0]
    expect(mockedSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'coach@example.com',
      password: 'password123',
    })
    expect(updatedValue.status).toBe('authenticated')
    expect(updatedValue.session).toEqual(mockSession)
    expect(updatedValue.user?.email).toBe('coach@example.com')
  })

  it('captures errors from sign in attempts', async () => {
    const renderSpy = jest.fn()

    mockedSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { session: null },
      error: { message: 'Invalid credentials' },
    })

    render(
      <AuthProvider>
        <AuthConsumer onRender={renderSpy} />
      </AuthProvider>
    )

    await act(async () => {
      await Promise.resolve()
    })

    const authValue = renderSpy.mock.calls.at(-1)![0]

    await act(async () => {
      const result = await authValue.signIn({ email: 'coach@example.com', password: 'wrong' })
      expect(result.error).toBe('Invalid credentials')
    })

    const updatedValue = renderSpy.mock.calls.at(-1)![0]
    expect(updatedValue.status).toBe('unauthenticated')
    expect(updatedValue.session).toBeNull()
  })

  it('signs out and clears session', async () => {
    const renderSpy = jest.fn()
    mockedSupabase.auth.signOut.mockResolvedValue({ error: null })

    render(
      <AuthProvider>
        <AuthConsumer onRender={renderSpy} />
      </AuthProvider>
    )

    await act(async () => {
      await Promise.resolve()
    })

    const authValue = renderSpy.mock.calls.at(-1)![0]
    await act(async () => {
      const result = await authValue.signOut()
      expect(result.error).toBeUndefined()
    })

    const updatedValue = renderSpy.mock.calls.at(-1)![0]
    expect(mockedSupabase.auth.signOut).toHaveBeenCalled()
    expect(updatedValue.status).toBe('unauthenticated')
    expect(updatedValue.session).toBeNull()
  })
})
