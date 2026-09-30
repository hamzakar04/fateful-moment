import React, { useState, useId } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  LayoutChangeEvent,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import { Colors } from '../../constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'danger';
export type ButtonSize = 'sm' | 'md';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  frosted?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  frosted = false,
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  leadingIcon,
  trailingIcon,
}: ButtonProps) {
  const isSm = size === 'sm';
  const isGlass = variant === 'glass';
  const isFrosted = isGlass && (frosted || isSm);
  const [layout, setLayout] = useState({ width: 0, height: isSm ? 32 : 56 });
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9]/g, '_');

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 0 && height > 0) {
      if (layout.width !== width || layout.height !== height) {
        setLayout({ width, height });
      }
    }
  };

  const getContainerStyle = (): StyleProp<ViewStyle> => {
    let baseVariantStyle: StyleProp<ViewStyle> = styles.primaryContainer;
    if (variant === 'secondary') baseVariantStyle = styles.secondaryContainer;
    else if (variant === 'glass') baseVariantStyle = isFrosted ? styles.glassFrostedContainer : styles.glassContainer;
    else if (variant === 'danger') baseVariantStyle = styles.dangerContainer;

    const sizeContainerStyle = isSm ? styles.containerSm : styles.containerMd;

    if (disabled) {
      if (variant === 'glass' && !isFrosted) {
        return [styles.container, sizeContainerStyle, baseVariantStyle, styles.glassDisabledContainer, styles.disabledContainer];
      }
      return [styles.container, sizeContainerStyle, baseVariantStyle, styles.disabledContainer];
    }
    return [styles.container, sizeContainerStyle, baseVariantStyle];
  };

  const getTextStyle = () => {
    const sizeTextStyle = isSm ? styles.textSm : styles.textMd;
    if (variant === 'secondary') return [styles.text, sizeTextStyle, { color: disabled ? Colors.textMuted : Colors.text }];
    if (variant === 'glass') return [styles.text, sizeTextStyle, styles.glassText, { color: Colors.primary }];
    if (variant === 'danger') return [styles.text, sizeTextStyle, { color: Colors.text }];
    return [styles.text, sizeTextStyle, { color: disabled ? 'rgba(2, 6, 24, 0.5)' : Colors.background }];
  };

  const strokeWidth = 0.75;
  const flatStyle = StyleSheet.flatten(style) || {};
  const borderRadius = typeof flatStyle.borderRadius === 'number' ? flatStyle.borderRadius : 16;
  const s = strokeWidth / 2;
  const r = Math.max(0, borderRadius - s);

  return (
    <TouchableOpacity
      style={[getContainerStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      onLayout={onLayout}
    >
      {isFrosted && (
        <BlurView
          intensity={60}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
      )}
      {isGlass && layout.width > 0 && layout.height > 0 && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Svg width={layout.width} height={layout.height} style={StyleSheet.absoluteFill}>
            <Defs>
              <SvgLinearGradient id={`glassRimTop_${safeId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.35} />
                <Stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.18} />
                <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
              </SvgLinearGradient>

              <SvgLinearGradient id={`glassRimBottom_${safeId}`} x1="100%" y1="100%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.30} />
                <Stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.15} />
                <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
              </SvgLinearGradient>
            </Defs>

            <Path
              d={`M ${s} ${layout.height - borderRadius} L ${s} ${borderRadius} A ${r} ${r} 0 0 1 ${borderRadius} ${s} L ${layout.width - borderRadius} ${s}`}
              stroke={`url(#glassRimTop_${safeId})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
            />

            <Path
              d={`M ${layout.width - s} ${borderRadius} L ${layout.width - s} ${layout.height - borderRadius} A ${r} ${r} 0 0 1 ${layout.width - borderRadius} ${layout.height - s} L ${borderRadius} ${layout.height - s}`}
              stroke={`url(#glassRimBottom_${safeId})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
        </View>
      )}

      {loading ? (
        <ActivityIndicator color={variant === 'secondary' || variant === 'glass' ? Colors.primary : Colors.background} />
      ) : (
        <>
          {(leadingIcon || icon) ? (leadingIcon || icon) : null}
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            style={[
              getTextStyle(),
              textStyle,
              styles.visibleText,
            ]}
          >
            {title}
          </Text>
          {trailingIcon ? trailingIcon : null}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    position: 'relative',
  },
  containerMd: {
    height: 56,
    paddingHorizontal: 24,
  },
  containerSm: {
    height: 32,
    paddingHorizontal: 16,
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
    backgroundColor: 'rgba(0, 184, 219, 0.14)',
  },
  glassDisabledContainer: {
    backgroundColor: 'rgba(0, 184, 219, 0.14)',
  },
  glassFrostedContainer: {
    backgroundColor: 'rgba(0, 184, 219, 0.14)',
  },
  glassText: {
    fontFamily: 'Inter_700Bold',
  },
  dangerContainer: {
    backgroundColor: Colors.accent,
  },
  disabledContainer: {
    opacity: 0.55,
  },
  text: {
    letterSpacing: 0,
  },
  textMd: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  textSm: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  primaryText: { color: Colors.background },
  secondaryText: { color: Colors.text },
  visibleText: { opacity: 1, zIndex: 1, flexShrink: 0 },
});
