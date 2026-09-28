import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Layout } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';

export interface OptionItem {
  id: string;
  label: string;
}

interface InteractiveSelectionProps {
  title?: string;
  options: OptionItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function InteractiveSelection({
  title = 'INTERACTIVE SELECTION',
  options,
  selectedId,
  onSelect,
}: InteractiveSelectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[Typography.hudMono, styles.title]}>{title}</Text>
        <Feather name="check-circle" size={14} color={Colors.primary} />
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionRow,
                isSelected ? styles.optionRowSelected : styles.optionRowUnselected
              ]}
              onPress={() => onSelect(option.id)}
              activeOpacity={0.8}
            >
              <Text 
                style={[
                  Typography.bodyText,
                  styles.optionText,
                  isSelected && styles.optionTextSelected
                ]}
              >
                {option.label}
              </Text>
              
              <View style={[
                styles.radioIndicator,
                isSelected && styles.radioIndicatorSelected
              ]}>
                {isSelected && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: Layout.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  title: {
    color: Colors.primary,
  },
  optionsContainer: {
    gap: Layout.spacing.md,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionRowUnselected: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.border,
  },
  optionRowSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
  },
  optionTextSelected: {
    color: Colors.background,
  },
  radioIndicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioIndicatorSelected: {
    borderColor: Colors.background,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.background,
  }
});
