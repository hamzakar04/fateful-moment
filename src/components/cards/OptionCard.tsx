import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/theme';

interface OptionCardProps {
  text: string;
  selected?: boolean;
  onPress: () => void;
}

export function OptionCard({ text, selected = false, onPress }: OptionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.card, selected && styles.selectedCard]}
    >
      <LinearGradient
        pointerEvents="none"
        colors={selected ? ['rgba(15, 23, 43, 0.63)', 'rgba(0, 211, 243, 0.63)', 'rgba(15, 23, 43, 0.63)'] : ['rgba(15, 23, 43, 0.63)', 'rgba(15, 23, 43, 0.63)']}
        locations={selected ? [0, 0.5, 1] : [0, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.selectedBackground}
      />
      <View style={styles.textLayer} pointerEvents="none">
        <Text style={[styles.text, selected && styles.selectedText]}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 345,
    height: 66,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F8FAFC',
    borderTopColor: '#F8FAFC',
    backgroundColor: 'rgba(15, 23, 43, 0.63)',
    overflow: 'hidden',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCard: {
    borderColor: '#F8FAFC',
    borderTopWidth: 2,
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  selectedBackground: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 16 },
  textLayer: { width: 311, position: 'relative', zIndex: 2, elevation: 2 },
  text: {
    width: '100%',
    color: '#FFFFFF',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
  },
  selectedText: { color: '#FFFFFF' },
});
