import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { Colors } from '../../constants/theme';

const musicPlayerTopRightXml = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.2317 8.7369V3.49475" stroke="#62748E" stroke-width="1.16492" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.7755 10.4843C11.1617 10.4843 11.5321 10.3309 11.8051 10.0578C12.0782 9.78475 12.2316 9.41437 12.2316 9.02817C12.2316 8.64198 12.0782 8.2716 11.8051 7.99852C11.5321 7.72544 11.1617 7.57202 10.7755 7.57202C10.3893 7.57202 10.0189 7.72544 9.74583 7.99852C9.47275 8.2716 9.31934 8.64198 9.31934 9.02817C9.31934 9.41437 9.47275 9.78475 9.74583 10.0578C10.0189 10.3309 10.3893 10.4843 10.7755 10.4843Z" stroke="#62748E" stroke-width="1.16492" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.98947 6.98956H1.74731" stroke="#62748E" stroke-width="1.16492" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.31931 3.49475H1.74731" stroke="#62748E" stroke-width="1.16492" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.98947 10.4843H1.74731" stroke="#62748E" stroke-width="1.16492" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const filledPlayXml = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.25 2.75L13 8L4.25 13.25V2.75Z" fill="#00D3F3" stroke="#00D3F3" stroke-width="1.2" stroke-linejoin="round"/></svg>';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable accessibilityLabel="Previous track" style={styles.smallButton} hitSlop={8}>
        <Feather name="skip-back" size={16} color={Colors.textMuted} />
      </Pressable>
      <Pressable
        accessibilityLabel={isPlaying ? 'Pause music' : 'Play music'}
        style={styles.playButton}
        onPress={() => setIsPlaying((value) => !value)}
      >
        {isPlaying ? <Feather name="pause" size={16} color={Colors.primary} /> : <SvgXml xml={filledPlayXml} width={16} height={16} />}
      </Pressable>
      <Pressable accessibilityLabel="Next track" style={styles.smallButton} hitSlop={8}>
        <Feather name="skip-forward" size={16} color={Colors.textMuted} />
      </Pressable>
      <View style={styles.trackInfo}>
        <Text style={styles.status}>STANDBY</Text>
        <Text style={styles.track} numberOfLines={1}>THIS IS THE FATEF...</Text>
      </View>
      <Pressable accessibilityLabel="Music playlist" style={styles.playlistButton} hitSlop={8}>
        <SvgXml xml={musicPlayerTopRightXml} width={14} height={14} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 289,
    height: 48,
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: 'rgba(15, 23, 43, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(49, 65, 88, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 16,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  smallButton: { width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 184, 219, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 184, 219, 0.3)',
  },
  trackInfo: { flex: 1, minWidth: 0, gap: 0 },
  status: { color: Colors.primary, fontFamily: 'Inter_400Regular', fontSize: 9, lineHeight: 12, letterSpacing: 1 },
  track: { color: Colors.text, fontFamily: 'Inter_700Bold', fontSize: 12, lineHeight: 16 },
  playlistButton: {
    width: 24,
    height: 24,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
