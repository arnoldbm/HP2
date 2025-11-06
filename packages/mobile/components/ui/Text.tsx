import { forwardRef } from 'react'
import { StyleSheet, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native'

type TextVariant = 'title' | 'headline' | 'body' | 'caption' | 'button'
type TextWeight = 'regular' | 'semibold' | 'bold'

export interface TextProps extends RNTextProps {
  variant?: TextVariant
  weight?: TextWeight
}

const variantStyles: Record<TextVariant, TextStyle> = {
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
  headline: {
    fontSize: 22,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    lineHeight: 18,
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
  },
}

const weightStyles: Record<TextWeight, TextStyle> = {
  regular: {
    fontFamily: 'System',
    fontWeight: '400',
  },
  semibold: {
    fontFamily: 'System',
    fontWeight: '600',
  },
  bold: {
    fontFamily: 'System',
    fontWeight: '700',
  },
}

export const AppText = forwardRef<RNText, TextProps>(function AppText(
  { children, style, variant = 'body', weight = 'regular', ...rest },
  ref
) {
  return (
    <RNText
      ref={ref}
      {...rest}
      style={StyleSheet.flatten([variantStyles[variant], weightStyles[weight], styles.base, style])}
    >
      {children}
    </RNText>
  )
})

const styles = StyleSheet.create({
  base: {
    color: '#0f172a',
  },
})

export { AppText as Text }
