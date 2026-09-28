import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'danger';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon
}: ButtonProps) {
  const getContainerStyle = () => {
    if (disabled) return [styles.container, styles.disabledContainer];
    if (variant === 'secondary') return [styles.container, styles.secondaryContainer];
    if (variant === 'glass') return [styles.container, styles.glassContainer];
    if (variant === 'danger') return [styles.container, styles.dangerContainer];
    return [styles.container, styles.primaryContainer];
  };

  const getTextStyle = () => {
    if (disabled) return [styles.text, { color: 'rgba(0, 211, 243, 0.9)' }];
    if (variant === 'secondary') return [styles.text, { color: Colors.text }];
    if (variant === 'glass') return [styles.text, { color: Colors.primary }];
    if (variant === 'danger') return [styles.text, { color: Colors.text }];
    return [styles.text, { color: Colors.background }];
  };

  return (
    <TouchableOpacity
      style={[getContainerStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? Colors.text : Colors.background} />
      ) : (
        <>
          {icon && icon}
          <Text numberOfLines={1} allowFontScaling={false} style={[getTextStyle(), textStyle, styles.visibleText]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 8,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  primaryContainer: {
    backgroundColor: Colors.primary,
  },
  secondaryContainer: {
    backgroundColor: Colors.secondary,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  glassContainer: {
    backgroundColor: 'rgba(0, 211, 243, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(0, 211, 243, 0.48)',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 24,
    paddingVertical: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 0,
  },
  dangerContainer: {
    backgroundColor: Colors.accent,
  },
  disabledContainer: {
    backgroundColor: 'rgba(0, 211, 243, 0.14)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 211, 243, 0.2)',
  },
  text: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  primaryText: { color: Colors.background },
  secondaryText: { color: Colors.text },
  visibleText: { opacity: 1, zIndex: 1, flexShrink: 0 },
});
