import React, { useEffect } from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Button } from '../ui/Button';
import { Colors } from '../../constants/theme';

const ALARM_CLOCK_XML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.0849 12.9999C19.0849 9.08699 15.9129 5.91497 11.9999 5.91497C8.08699 5.91497 4.91497 9.08699 4.91497 12.9999C4.91497 16.9129 8.08699 20.0849 11.9999 20.0849C13.9354 20.0849 15.689 19.3082 16.9677 18.0502C16.9747 18.0426 16.9814 18.0347 16.9887 18.0273C17.0001 18.0157 17.0125 18.0049 17.0243 17.9941C18.2976 16.7132 19.0849 14.9487 19.0849 12.9999ZM11.0849 8.99993C11.0849 8.49459 11.4946 8.08489 11.9999 8.08489C12.5053 8.08489 12.915 8.49459 12.915 8.99993V12.621L14.6469 14.353C15.0042 14.7103 15.0042 15.2896 14.6469 15.6469C14.2896 16.0042 13.7103 16.0042 13.353 15.6469L11.353 13.6469C11.1814 13.4753 11.0849 13.2426 11.0849 12.9999V8.99993ZM4.35296 2.35296C4.71029 1.99563 5.28957 1.99563 5.6469 2.35296C6.00423 2.71029 6.00423 3.28957 5.6469 3.6469L2.6469 6.6469C2.28957 7.00423 1.71029 7.00423 1.35296 6.6469C0.995629 6.28957 0.995629 5.71029 1.35296 5.35296L4.35296 2.35296ZM18.353 2.35296C18.7103 1.99563 19.2896 1.99563 19.6469 2.35296L22.6469 5.35296C23.0042 5.71029 23.0042 6.28957 22.6469 6.6469C22.2896 7.00423 21.7103 7.00423 21.353 6.6469L18.353 3.6469C17.9956 3.28957 17.9956 2.71029 18.353 2.35296ZM20.915 12.9999C20.915 15.1379 20.1619 17.0997 18.9072 18.6357L20.643 20.3486C21.0026 20.7036 21.0063 21.2834 20.6513 21.643C20.2963 22.0026 19.7165 22.0063 19.3569 21.6513L17.6108 19.9272C16.0785 21.1698 14.1264 21.915 11.9999 21.915C9.88278 21.915 7.9383 21.1766 6.40911 19.9438L4.63567 21.6581C4.27228 22.0091 3.69284 21.999 3.34173 21.6357C2.99073 21.2723 3.00086 20.6928 3.36419 20.3417L5.10833 18.6557C3.84396 17.1168 3.08489 15.147 3.08489 12.9999C3.08489 8.07631 7.07631 4.08489 11.9999 4.08489C16.9235 4.08489 20.915 8.07631 20.915 12.9999Z" fill="#00D3F3"/></svg>';

const DEFAULT_IMAGE = require('../../../assets/images/whitehouse_card.png');
const DEFAULT_VIDEO = require('../../../assets/videos/scenarios_background_video.mp4');

interface ScenarioCardProps {
  duration: string;
  title: string;
  description: string;
  imageSource?: ImageSourcePropType;
  videoSource?: any;
  player?: any;
  active?: boolean;
  isVisible?: boolean;
  isMuted?: boolean;
  onStart: () => void;
  onPress?: () => void;
}

interface ScenarioCardVideoProps {
  videoSource: any;
  customPlayer?: any;
  active: boolean;
  isMuted: boolean;
}

const ScenarioCardVideo: React.FC<ScenarioCardVideoProps> = ({
  videoSource,
  customPlayer,
  active,
  isMuted,
}) => {
  const localPlayer = useVideoPlayer(videoSource || null, (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.muted = isMuted;
    videoPlayer.audioMixingMode = 'mixWithOthers';
    videoPlayer.play();
  });

  const player = customPlayer || (videoSource ? localPlayer : null);

  useEffect(() => {
    if (!player) return;
    // eslint-disable-next-line react-hooks/immutability
    player.muted = isMuted;
    player.volume = isMuted ? 0 : 1;
    player.audioMixingMode = 'mixWithOthers';

    if (!active) {
      player.pause();
    } else {
      player.play();
    }

    const playingSub = player.addListener('playingChange', (event: any) => {
      if (!event.isPlaying && active) {
        player.play();
      }
    });

    const statusSub = player.addListener('statusChange', (event: any) => {
      if (event.status === 'readyToPlay' && active) {
        player.play();
      }
    });

    return () => {
      playingSub.remove();
      statusSub.remove();
      try {
        player.pause();
      } catch {}
    };
  }, [active, isMuted, player]);

  return (
    <VideoView
      player={player}
      style={StyleSheet.absoluteFill}
      contentFit="cover"
      nativeControls={false}
      surfaceType="textureView"
    />
  );
};

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  duration,
  title,
  description,
  imageSource = DEFAULT_IMAGE,
  videoSource = DEFAULT_VIDEO,
  player: customPlayer,
  active = true,
  isVisible = true,
  isMuted = true,
  onStart,
  onPress,
}) => {
  return (
    <View
      style={[styles.cardContainer, !active && styles.inactiveCard]}
      onTouchEnd={onPress}
    >
      {imageSource && (
        <Image
          source={imageSource}
          style={styles.cardImage}
          resizeMode="cover"
        />
      )}
      {active && isVisible && videoSource && (
        <ScenarioCardVideo
          videoSource={videoSource}
          customPlayer={customPlayer}
          active={active}
          isMuted={isMuted}
        />
      )}
      <LinearGradient
        colors={['#020618', 'rgba(2, 6, 24, 0.6)', 'rgba(0, 0, 0, 0)']}
        locations={[0, 0.6306, 1.0]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.textContainer} pointerEvents="box-none">
        <View style={styles.timeRow}>
          <SvgXml xml={ALARM_CLOCK_XML} width={12} height={12} />
          <Text style={styles.timeText}>{duration}</Text>
        </View>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.description} numberOfLines={4}>{description}</Text>
      </View>
      <Button
        title="Start"
        variant="glass"
        size="sm"
        onPress={onStart}
        style={styles.startButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 220,
    height: 176,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1D293D',
    overflow: 'hidden',
    backgroundColor: '#020618',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0px 8px 10px -6px rgba(0, 0, 0, 0.1), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
        } as ViewStyle)
      : {}),
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  inactiveCard: { opacity: 0.35 },
  textContainer: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    height: 160,
    paddingTop: 12,
    paddingHorizontal: 12,
    gap: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 12,
  },
  timeText: {
    color: Colors.primary,
    fontSize: 8,
    lineHeight: 11,
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    fontWeight: '700',
    letterSpacing: 0,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter_900Black_Italic',
    textTransform: 'capitalize',
  },
  description: {
    color: '#E2E8F0',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter_400Regular',
    height: 64,
  },
  startButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
});
