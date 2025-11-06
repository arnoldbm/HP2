import React from 'react'
import { act, fireEvent } from '@testing-library/react-native'

import ForgotPasswordScreen from '@/app/(auth)/forgot-password'
import { renderWithProviders } from '@/tests/helpers'

const mockResetPassword = jest.fn()

jest.mock('expo-router', () => {
  const React = require('react')
  const { Text } = require('react-native')
  const Link = ({ children, ...rest }: { children: React.ReactNode }) =>
    React.createElement(Text, { accessibilityRole: 'link', ...rest }, children)

  return {
    __esModule: true,
    Link,
  }
})

jest.mock('@/lib/contexts/auth-context', () => ({
  useAuth: () => ({
    resetPassword: mockResetPassword,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('ForgotPasswordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockResetPassword.mockResolvedValue({})
  })

  it('validates email presence', async () => {
    const { getByRole, findByText } = renderWithProviders(<ForgotPasswordScreen />)

    await act(async () => {
      fireEvent.press(getByRole('button'))
    })

    expect(await findByText('Email is required')).toBeTruthy()
    expect(mockResetPassword).not.toHaveBeenCalled()
  })

  it('submits email for reset and shows success message', async () => {
    const { getByPlaceholderText, getByRole, findByText } = renderWithProviders(
      <ForgotPasswordScreen />
    )

    fireEvent.changeText(getByPlaceholderText('coach@example.com'), 'coach@example.com')

    await act(async () => {
      fireEvent.press(getByRole('button'))
    })

    expect(mockResetPassword).toHaveBeenCalledWith('coach@example.com')
    expect(
      await findByText('If that email is registered, a reset link is on the way.')
    ).toBeTruthy()
  })

  it('surfaces reset errors', async () => {
    mockResetPassword.mockResolvedValueOnce({ error: 'Unable to send email' })

    const { getByPlaceholderText, getByRole, findByText } = renderWithProviders(
      <ForgotPasswordScreen />
    )

    fireEvent.changeText(getByPlaceholderText('coach@example.com'), 'coach@example.com')

    await act(async () => {
      fireEvent.press(getByRole('button'))
    })

    expect(await findByText('Unable to send email')).toBeTruthy()
  })
})
