import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Typography, Layout } from '../../constants/theme';

interface StandardCardProps {
  hudText?: string;
  title: string;
  description: string;
  style?: ViewStyle;
}

export function StandardCard({
  hudText = 'SURFACE_A // ENCRYPTED',
  title,
  description,
  style,
}: StandardCardProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.decorativeDot} />

      <View style={styles.hudHeader}>
        <Text style={Typography.hudMono}>{hudText}</Text>
      </View>

      <View style={styles.content}>
        <Text style={[Typography.heading1, styles.title]} numberOfLines={2}>
          {title}
        </Text>
        <Text style={Typography.bodyText}>
          {description}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.pill}>
          <Text style={Typography.hudMono}>STATUS: GREEN</Text>
        </View>
        <View style={styles.pill}>
          <Text style={Typography.hudMono}>LOAD: STABLE</Text>
        </View>
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
    padding: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  hudHeader: {
    marginBottom: Layout.spacing.md,
  },
  content: {
    marginBottom: Layout.spacing.xl,
  },
  title: {
    marginBottom: Layout.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    gap: Layout.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(29, 41, 61, 0.5)',
    paddingTop: Layout.spacing.md,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(29, 41, 61, 0.5)',
    borderWidth: 1,
    borderColor: Colors.border,
  }
});
