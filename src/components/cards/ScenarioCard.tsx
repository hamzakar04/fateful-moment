import React from 'react';
import { ImageBackground, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

interface ScenarioCardProps {
  duration: string;
  title: string;
  description: string;
  imageSource?: ImageSourcePropType;
  active?: boolean;
  onStart: () => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  duration,
  title,
  description,
  imageSource = require('../../../assets/images/whitehouse.png'),
  active = true,
  onStart,
}) => (
  <View style={[styles.cardContainer, !active && styles.inactiveCard]}>
    <ImageBackground source={imageSource} style={styles.imageBg} imageStyle={styles.imageStyle} resizeMode="cover">
      <View style={[styles.overlay, !active && styles.inactiveOverlay]}>
        <View style={styles.timeRow}>
          <Feather name="clock" size={12} color={Colors.primary} />
          <Text style={styles.timeText}>{duration}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.description} numberOfLines={3}>{description}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.8} style={styles.startButton} onPress={onStart}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    width: 220,
    height: 176,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    backgroundColor: Colors.secondary,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  inactiveCard: { opacity: 0.35 },
  imageBg: { flex: 1 },
  imageStyle: { opacity: 0.62 },
  overlay: { flex: 1, padding: 16, justifyContent: 'space-between', backgroundColor: 'rgba(2, 6, 23, 0.62)' },
  inactiveOverlay: { backgroundColor: 'rgba(2, 6, 23, 0.74)' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  timeText: { color: Colors.primary, fontSize: 11, lineHeight: 16, fontFamily: 'Inter_500Medium' },
  content: { flex: 1, justifyContent: 'center', marginVertical: 4 },
  title: { color: Colors.text, fontSize: 16, lineHeight: 20, fontFamily: 'Inter_700Bold', marginBottom: 6 },
  description: { color: Colors.textMuted, fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular' },
  footer: { alignItems: 'flex-end' },
  startButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, backgroundColor: 'rgba(0, 211, 243, 0.15)', borderWidth: 1, borderColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  startButtonText: { color: Colors.primary, fontSize: 12, fontFamily: 'Inter_700Bold' },
});
