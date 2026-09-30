import React from 'react';
import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../ui/Button';
import { Colors } from '../../constants/theme';

interface BriefingViewProps {
  scenario: {
    title: string;
    description: string;
  };
  onStart: () => void;
}

export function BriefingView({ scenario, onStart }: BriefingViewProps) {
  return (
    <View style={styles.briefingContainer}>
      <ImageBackground source={require('../../../assets/images/iraq_war_video_page.png')} style={styles.briefingImage} imageStyle={styles.briefingImageStyle}>
        <LinearGradient
          colors={['#020618', 'rgba(2, 6, 24, 0.4)', 'rgba(0, 0, 0, 0)']}
          locations={[0, 0.5, 1.0]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <View style={styles.briefingContent}>
          <View style={styles.textContainer}>
            <View style={styles.titleBlock}>
              <Text style={styles.eyebrow}>SCENARIO BRIEFING</Text>
              <Text style={styles.scenarioTitle}>{scenario.title.toUpperCase()}</Text>
            </View>
            <Text style={styles.description}>{scenario.description}</Text>
          </View>
          <Button
            title="Start Simulation"
            variant="glass"
            onPress={onStart}
            style={styles.startButton}
            textStyle={styles.startButtonText}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  briefingContainer: {
    width: 728,
    maxWidth: '94%',
    height: 292,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1D293D',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 8,
  },
  briefingImage: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  briefingImageStyle: { resizeMode: 'cover' },
  briefingContent: { width: '100%', maxWidth: 728, height: 230, padding: 24, gap: 24, alignItems: 'center', justifyContent: 'center' },
  textContainer: { width: '100%', maxWidth: 497, alignItems: 'center', gap: 16 },
  titleBlock: { alignItems: 'center', gap: 4 },
  eyebrow: {
    color: Colors.primary,
    fontFamily: Platform.select({ ios: 'Menlo', web: 'Menlo, monospace', default: 'monospace' }),
    fontWeight: '700',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1,
    textAlign: 'center',
  },
  scenarioTitle: {
    fontFamily: 'Inter_900Black_Italic',
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0,
    textTransform: 'uppercase',
    color: '#F8FAFC',
    textAlign: 'center',
  },
  description: {
    color: 'rgba(226, 232, 240, 0.8)',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 497,
  },
  startButton: {
    width: 179,
    height: 48,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  startButtonText: {
    color: Colors.primary,
    fontFamily: 'Inter_900Black',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
