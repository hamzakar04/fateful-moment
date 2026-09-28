import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';
import { MusicPlayer } from './MusicPlayer';

interface NavigationBarProps {
  title?: string;
  showTitle?: boolean;
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
  onLeadingPress?: () => void;
  onTrailingPress?: () => void;
  leadingIcon?: 'menu' | 'arrow-left';
  showBottomBorder?: boolean;
  transparent?: boolean;
  overlay?: boolean;
}

export function NavigationBar({
  title = 'Scenarios',
  showTitle = true,
  showLeadingIcon = true,
  showTrailingIcon = true,
  onLeadingPress,
  onTrailingPress,
  leadingIcon = 'menu',
  showBottomBorder = true,
  transparent = false,
  overlay = false,
}: NavigationBarProps) {
  const isMusicPlayer = !showTitle && !showLeadingIcon && !showTrailingIcon;

  return (
    <View style={[styles.container, isMusicPlayer && styles.musicContainer, !showBottomBorder && styles.noBorder, transparent && styles.transparent, overlay && styles.overlay]}>
      {isMusicPlayer ? (
        <MusicPlayer />
      ) : (
        <>
          <View style={styles.side}>
            {showLeadingIcon && (
              <Pressable accessibilityRole="button" onPress={onLeadingPress} hitSlop={10}>
                <Feather name={leadingIcon} size={20} color={Colors.text} />
              </Pressable>
            )}
          </View>
          {showTitle ? <Text style={styles.title}>{title}</Text> : <View />}
          <View style={[styles.side, styles.trailing]}>
            {showTrailingIcon && (
              <Pressable accessibilityRole="button" onPress={onTrailingPress} hitSlop={10}>
                <Feather name="settings" size={19} color={Colors.text} />
              </Pressable>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: '#314158',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  musicContainer: { paddingHorizontal: 0, position: 'relative' },
  noBorder: { borderBottomWidth: 0 },
  transparent: { backgroundColor: 'transparent' },
  overlay: { position: 'absolute', top: 0, left: 0, zIndex: 10, elevation: 0, backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', shadowOpacity: 0 },
  side: { width: 32, alignItems: 'flex-start' },
  trailing: { alignItems: 'flex-end' },
  title: { color: Colors.text, fontFamily: 'Inter_700Bold', fontSize: 16, lineHeight: 24, textAlign: 'center' },
});
