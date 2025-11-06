import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react-native'

import { AuthProvider } from '@/lib/contexts/auth-context'

// Re-export everything from React Native Testing Library
export * from '@testing-library/react-native'

/**
 * Custom render function that wraps components with providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}

/**
 * Wait for a specified number of milliseconds
 * Useful for testing async behavior
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Suppress console errors/warnings during tests
 * Useful when testing error states
 */
export function suppressConsole() {
  const originalError = console.error
  const originalWarn = console.warn

  beforeAll(() => {
    console.error = jest.fn()
    console.warn = jest.fn()
  })

  afterAll(() => {
    console.error = originalError
    console.warn = originalWarn
  })
}
