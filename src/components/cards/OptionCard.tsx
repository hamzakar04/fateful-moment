import React, { useId } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, G, LinearGradient as SvgLinearGradient, Rect, Stop } from 'react-native-svg';

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

const SELECTED_GRADIENT_COLORS = [
  'rgba(15, 23, 43, 0.63)',
  'rgba(0, 211, 243, 0.63)',
  'rgba(15, 23, 43, 0.63)',
] as const;

/* Figma: ~4 wide diagonal sheens across 345px, not dense hatch. */
const STRIPE_WIDTH = 72;
const STRIPE_XS = [-28, 62, 152, 242, 332];

function SelectedGlassFill() {
  const rawId = useId();
  const stripeId = `optionStripe_${rawId.replace(/[^a-zA-Z0-9]/g, '_')}`;

  return (
    <View style={styles.selectedFill} pointerEvents="none">
      <LinearGradient
        colors={SELECTED_GRADIENT_COLORS}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0.4894 }}
        end={{ x: 1, y: 0.5106 }}
        style={StyleSheet.absoluteFill}
      />
      <Svg
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        viewBox={`0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <SvgLinearGradient id={stripeId} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <Stop offset="0.5" stopColor="#E8FCFF" stopOpacity="0.32" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </SvgLinearGradient>
        </Defs>
        <G transform={`rotate(18 ${CARD_WIDTH / 2} ${CARD_HEIGHT / 2})`}>
          {STRIPE_XS.map((x) => (
            <Rect
              key={x}
              x={x}
              y={-80}
              width={STRIPE_WIDTH}
              height={240}
              fill={`url(#${stripeId})`}
            />
          ))}
        </G>
      </Svg>
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
  /* Is selected?=Default */
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
  /* Is selected?=Selected */
  selectedCard: {
    borderWidth: 2,
    borderColor: '#F8FAFC',
    backgroundColor: 'transparent',
  },
  /* Is selected?=Passive */
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
