import React from 'react'

import { render } from '@testing-library/react-native'

import { AppText } from '@/components/ui/Text'

describe('AppText', () => {
  it('renders provided children', () => {
    const { getByText } = render(<AppText>Welcome Coach</AppText>)
    expect(getByText('Welcome Coach')).toBeTruthy()
  })

  it('applies variant styles', () => {
    const { getByText } = render(<AppText variant="headline">Headline</AppText>)
    expect(getByText('Headline')).toHaveStyle({
      fontSize: 22,
    })
  })

  it('applies font weight styles', () => {
    const { getByText } = render(<AppText weight="semibold">Important Notice</AppText>)

    expect(getByText('Important Notice')).toHaveStyle({
      fontWeight: '600',
    })
  })
})
