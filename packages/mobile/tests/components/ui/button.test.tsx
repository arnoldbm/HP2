import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'

import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children and handles press events', () => {
    const onPress = jest.fn()
    const { getByRole, getByText } = render(<Button onPress={onPress}>Sign In</Button>)

    expect(getByText('Sign In')).toBeTruthy()

    fireEvent.press(getByRole('button'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('respects disabled state', () => {
    const onPress = jest.fn()
    const { getByRole } = render(
      <Button disabled onPress={onPress}>
        Continue
      </Button>
    )

    fireEvent.press(getByRole('button'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('shows loading indicator when requested', () => {
    const { queryByText, getByRole } = render(<Button isLoading>Submitting</Button>)

    expect(queryByText('Submitting')).toBeNull()
    expect(getByRole('button')).toBeTruthy()
  })
})
