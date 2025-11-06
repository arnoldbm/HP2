import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'

import { Input } from '@/components/ui/Input'

describe('Input', () => {
  it('renders label and helper text', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input label="Email" helperText="Use your coaching email" placeholder="you@example.com" />
    )

    expect(getByText('Email')).toBeTruthy()
    expect(getByText('Use your coaching email')).toBeTruthy()
    expect(getByPlaceholderText('you@example.com')).toBeTruthy()
  })

  it('invokes onChangeText handler', () => {
    const handleChange = jest.fn()

    const { getByPlaceholderText } = render(
      <Input placeholder="Password" secureTextEntry onChangeText={handleChange} />
    )

    fireEvent.changeText(getByPlaceholderText('Password'), 'secret')
    expect(handleChange).toHaveBeenCalledWith('secret')
  })

  it('shows error message when provided', () => {
    const { getByText, queryByText } = render(<Input helperText="Helper" errorMessage="Required field" />)

    expect(getByText('Required field')).toBeTruthy()
    expect(queryByText('Helper')).toBeNull()
  })
})
