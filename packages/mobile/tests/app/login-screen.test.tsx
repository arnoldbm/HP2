import React from 'react'
import { act, fireEvent } from '@testing-library/react-native'

import LoginScreen from '@/app/(auth)/login'
import { renderWithProviders } from '@/tests/helpers'

jest.mock('expo-router', () => {
  const React = require('react')
  const { Text } = require('react-native')
  const replace = jest.fn()

  const Link = ({ children, ...rest }: { children: React.ReactNode }) =>
    React.createElement(Text, { accessibilityRole: 'link', ...rest }, children)

  return {
    __esModule: true,
    useRouter: () => ({
      replace,
      push: jest.fn(),
      back: jest.fn(),
    }),
    Link,
    __mock: {
      replace,
    },
  }
})

const { __mock: routerMock } = require('expo-router') as {
  __mock: {
    replace: jest.Mock
  }
}

const mockSignIn = jest.fn()

jest.mock('@/lib/contexts/auth-context', () => ({
  useAuth: () => ({
    signIn: mockSignIn,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSignIn.mockResolvedValue({})
  })

  it('validates required fields', async () => {
    const { getByRole, findByText } = renderWithProviders(<LoginScreen />)

    await act(async () => {
      fireEvent.press(getByRole('button'))
    })

    expect(await findByText('Email and password are required')).toBeTruthy()
    expect(mockSignIn).not.toHaveBeenCalled()
  })

  it('submits credentials and navigates on success', async () => {
    const { getByPlaceholderText, getByRole } = renderWithProviders(<LoginScreen />)

    fireEvent.changeText(getByPlaceholderText('coach@example.com'), 'coach@example.com')
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123')

    await act(async () => {
      fireEvent.press(getByRole('button'))
    })

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'coach@example.com',
      password: 'password123',
    })
    expect(routerMock.replace).toHaveBeenCalledWith('/(tabs)/teams')
  })

  it('surfaces authentication errors', async () => {
    mockSignIn.mockResolvedValueOnce({ error: 'Invalid login' })

    const { getByPlaceholderText, getByRole, findByText } = renderWithProviders(<LoginScreen />)

    fireEvent.changeText(getByPlaceholderText('coach@example.com'), 'coach@example.com')
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'wrong')

    await act(async () => {
      fireEvent.press(getByRole('button'))
    })

    expect(await findByText('Invalid login')).toBeTruthy()
    expect(routerMock.replace).not.toHaveBeenCalled()
  })
})
