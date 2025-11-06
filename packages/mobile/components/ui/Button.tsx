import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type { ReactNode } from 'react'

import { AppText } from '@/components/ui/Text'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  children: ReactNode
  variant?: ButtonVariant
  isLoading?: boolean
  style?: StyleProp<ViewStyle>
}

const variantStyles: Record<ButtonVariant, { base: ViewStyle; text: TextStyle }> = {
  primary: {
    base: {
      backgroundColor: '#1d4ed8',
    },
    text: {
      color: '#ffffff',
    },
  },
  secondary: {
    base: {
      backgroundColor: '#e0e7ff',
    },
    text: {
      color: '#1d4ed8',
    },
  },
  ghost: {
    base: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#c7d2fe',
    },
    text: {
      color: '#1d4ed8',
    },
  },
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  style,
  ...pressableProps
}: ButtonProps) {
  const isDisabled = disabled || isLoading
  const variantStyle = variantStyles[variant]

  return (
    <Pressable
      accessibilityRole="button"
      {...pressableProps}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyle.base,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#ffffff' : '#1d4ed8'} />
      ) : (
        <AppText style={[styles.text, variantStyle.text]} variant="button" weight="semibold">
          {children}
        </AppText>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  text: {
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
})
