import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { G, Rect } from 'react-native-svg';

export type OptionCardVariant = 'default' | 'selected' | 'passive';

interface OptionCardProps {
  text: string;
  variant?: OptionCardVariant;
  selected?: boolean;
  passive?: boolean;
  textAlign?: 'left' | 'center';
  onPress: () => void;
}

const CARD_WIDTH = 345;
const CARD_HEIGHT = 66;

function SelectedGlassFill() {
  return (
    <View style={styles.selectedFill} pointerEvents="none">
      <Svg
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        viewBox={`0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`}
        style={StyleSheet.absoluteFill}
      >
        <G opacity={0.36}>
          <Rect x={23} y={-27} width={68} height={102} fill="#D9D9D9" transform="rotate(23 23 -27)" />
          <Rect x={161} y={-27} width={68} height={102} fill="#D9D9D9" transform="rotate(23 161 -27)" />
          <Rect x={299} y={-27} width={68} height={102} fill="#D9D9D9" transform="rotate(23 299 -27)" />
        </G>
      </Svg>
      <LinearGradient
        colors={[
          'rgba(15, 23, 43, 0.63)',
          'rgba(0, 211, 243, 0.63)',
          'rgba(15, 23, 43, 0.63)',
        ]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.58 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

export function OptionCard({
  text,
  variant,
  selected = false,
  passive = false,
  textAlign = 'center',
  onPress,
}: OptionCardProps) {
  const currentVariant: OptionCardVariant =
    variant ?? (selected ? 'selected' : passive ? 'passive' : 'default');

  const isSelectedState = currentVariant === 'selected' || currentVariant === 'passive';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isSelectedState }}
      onPress={onPress}
      style={[
        styles.card,
        currentVariant === 'selected' && styles.selectedCard,
        currentVariant === 'passive' && styles.passiveCard,
      ]}
    >
      {isSelectedState && <SelectedGlassFill />}
      <View style={styles.textLayer} pointerEvents="none">
        <Text style={[styles.text, textAlign === 'left' && styles.textLeft]}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F8FAFC',
    backgroundColor: 'rgba(15, 23, 43, 0.63)',
    overflow: 'hidden',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#F8FAFC',
    backgroundColor: 'transparent',
  },
  passiveCard: {
    borderWidth: 2,
    borderColor: '#F8FAFC',
    backgroundColor: 'transparent',
    opacity: 0.48,
  },
  selectedFill: {
    ...StyleSheet.absoluteFill,
  },
  textLayer: {
    width: 311,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    elevation: 2,
  },
  text: {
    width: '100%',
    color: '#FFFFFF',
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
    letterSpacing: -0.15,
  },
});
