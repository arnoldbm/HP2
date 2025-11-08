import React from 'react'
import { act, fireEvent } from '@testing-library/react-native'

import SignupScreen from '@/app/(auth)/signup'
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

const mockSignUp = jest.fn()

jest.mock('@/lib/contexts/auth-context', () => ({
  useAuth: () => ({
    signUp: mockSignUp,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('SignupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSignUp.mockResolvedValue({})
  })

  const fillForm = (utils: ReturnType<typeof renderWithProviders>) => {
    fireEvent.changeText(utils.getByPlaceholderText('coach@example.com'), 'coach@example.com')
    fireEvent.changeText(utils.getByPlaceholderText('Create a secure password'), 'password123')
    fireEvent.changeText(utils.getByPlaceholderText('Re-enter your password'), 'password123')
  }

  it('validates password requirements', async () => {
    const utils = renderWithProviders(<SignupScreen />)

    fireEvent.changeText(utils.getByPlaceholderText('coach@example.com'), 'coach@example.com')
    fireEvent.changeText(utils.getByPlaceholderText('Create a secure password'), 'short')
    fireEvent.changeText(utils.getByPlaceholderText('Re-enter your password'), 'short')

    await act(async () => {
      fireEvent.press(utils.getByRole('button'))
    })

    expect(await utils.findByText('Password must be at least 8 characters')).toBeTruthy()
    expect(mockSignUp).not.toHaveBeenCalled()
  })

  it('submits form and navigates when session created', async () => {
    const utils = renderWithProviders(<SignupScreen />)
    fillForm(utils)

    await act(async () => {
      fireEvent.press(utils.getByRole('button'))
    })

    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'coach@example.com',
      password: 'password123',
    })
    expect(routerMock.replace).toHaveBeenCalledWith('/(tabs)/teams')
  })

  it('shows email confirmation message when required', async () => {
    mockSignUp.mockResolvedValueOnce({ emailConfirmationSent: true })

    const utils = renderWithProviders(<SignupScreen />)
    fillForm(utils)

    await act(async () => {
      fireEvent.press(utils.getByRole('button'))
    })

    expect(
      await utils.findByText('Check your email to verify your account before signing in.')
    ).toBeTruthy()
    expect(routerMock.replace).not.toHaveBeenCalled()
  })

  it('surfaces errors returned by sign up', async () => {
    mockSignUp.mockResolvedValueOnce({ error: 'Email already registered' })

    const utils = renderWithProviders(<SignupScreen />)
    fillForm(utils)

    await act(async () => {
      fireEvent.press(utils.getByRole('button'))
    })

    expect(await utils.findByText('Email already registered')).toBeTruthy()
    expect(routerMock.replace).not.toHaveBeenCalled()
  })
})
