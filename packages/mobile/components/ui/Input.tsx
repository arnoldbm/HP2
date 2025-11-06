import type { ReactNode } from 'react'
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

import { AppText } from '@/components/ui/Text'

export interface InputProps extends TextInputProps {
  label?: string
  helperText?: string
  errorMessage?: string
  leftElement?: ReactNode
  rightElement?: ReactNode
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
}

export function Input({
  label,
  helperText,
  errorMessage,
  leftElement,
  rightElement,
  containerStyle,
  inputStyle,
  style,
  ...props
}: InputProps) {
  const hasError = Boolean(errorMessage)

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <AppText accessibilityRole="text" style={styles.label} variant="caption" weight="semibold">
          {label}
        </AppText>
      ) : null}

      <View style={[styles.inputWrapper, hasError && styles.inputWrapperError, style]}>
        {leftElement ? <View style={styles.sideElement}>{leftElement}</View> : null}
        <TextInput
          style={StyleSheet.flatten([styles.input, inputStyle])}
          placeholderTextColor="#94a3b8"
          {...props}
        />
        {rightElement ? <View style={styles.sideElement}>{rightElement}</View> : null}
      </View>

      {helperText && !hasError ? (
        <AppText style={styles.helperText} variant="caption">
          {helperText}
        </AppText>
      ) : null}

      {hasError ? (
        <AppText style={styles.errorText} variant="caption">
          {errorMessage}
        </AppText>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    color: '#1e293b',
    textTransform: 'uppercase',
  },
  inputWrapper: {
    alignItems: 'center',
    borderColor: '#cbd5f5',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  inputWrapperError: {
    borderColor: '#ef4444',
  },
  sideElement: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  input: {
    color: '#0f172a',
    flex: 1,
    fontSize: 16,
    minHeight: 48,
  },
  helperText: {
    color: '#64748b',
  },
  errorText: {
    color: '#ef4444',
  },
})
