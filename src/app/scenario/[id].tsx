import React, { useEffect, useMemo, useState } from 'react';
import { useEventListener } from 'expo';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { NavigationBar } from '../../components/navigation/NavigationBar';
import { MOCK_SCENARIOS } from '../../services/mockData';
import { BriefingView } from '../../components/scenario/BriefingView';
import { OptionsView } from '../../components/scenario/OptionsView';
import { DNAResultView } from '../../components/scenario/DNAResultView';

type ScreenMode = 'briefing' | 'video' | 'options' | 'dna';
type OptionsStage = 'initial' | 'afterDecisionOne';
type VideoStage = 'intro' | 'decisionOne' | 'decisionTwo';

const OPTIONS = [
  "Deniz Karantinası: Küba'yı kuşatıp Sovyet gemilerini engelleyerek gizli pazarlık yürütmek.",
  'Wait for Signal from Moscow',
  'Zaman Baskısına Uyum: Siyasi ve medya baskısı nedeniyle risklere rağmen belirlenen takvimde fırlatmayı başlat.',
  'Signal US Ships with Sonar',
  'Signal US Ships with Sonar',
];

const OPTIONS_PROGRESS = {
  trackWidth: 764,
  trackMaxWidth: '94%' as const,
  trackHeight: 6,
  fillWidth: 214,
};

const VIDEO_TRANSITION_DELAY_MS = 2000;

export default function ScenarioScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [selected, setSelected] = useState('');
  const [highlightedOption, setHighlightedOption] = useState<string | null>(null);
  const [mode, setMode] = useState<ScreenMode>('briefing');
  const [optionsStage, setOptionsStage] = useState<OptionsStage>('initial');
  const [videoStage, setVideoStage] = useState<VideoStage>('intro');
  const [decisionTwoPending, setDecisionTwoPending] = useState(false);
  const scenario = useMemo(() => MOCK_SCENARIOS.find((item) => item.id === id) ?? MOCK_SCENARIOS[0], [id]);
  const player = useVideoPlayer(require('../../../assets/videos/iraq_war_video.mp4'), (videoPlayer) => {
    videoPlayer.loop = false;
  });

  useEventListener(player, 'playToEnd', () => {
    if (videoStage === 'decisionOne') {
      setOptionsStage('afterDecisionOne');
      setMode('options');
      return;
    }
    if (videoStage === 'decisionTwo') {
      setMode('dna');
      return;
    }
    if (videoStage === 'intro') {
      setOptionsStage('initial');
      setMode('options');
    }
  });

  useEffect(() => {
    if (mode !== 'video') {
      return;
    }

    const timer = setTimeout(() => {
      player.play();
    }, 100);

    return () => clearTimeout(timer);
  }, [mode, player]);

  const startSimulation = async () => {
    setOptionsStage('initial');
    setVideoStage('intro');
    await player.replaceAsync(require('../../../assets/videos/iraq_war_video.mp4'));
    // eslint-disable-next-line react-hooks/immutability
    player.currentTime = 0;
    setMode('video');
  };

  const chooseOption = async (index: number) => {
    if (optionsStage === 'afterDecisionOne') {
      if (decisionTwoPending || String(index) === selected) {
        return;
      }

      setHighlightedOption(String(index));
      setDecisionTwoPending(true);
      setTimeout(async () => {
        setVideoStage('decisionTwo');
        await player.replaceAsync(require('../../../assets/videos/karar_videosu_2.mp4'));
        player.currentTime = 0;
        setDecisionTwoPending(false);
        setMode('video');
      }, VIDEO_TRANSITION_DELAY_MS);
      return;
    }

    setSelected(String(index));
    if (index !== 1) {
      return;
    }

    setTimeout(async () => {
      setVideoStage('decisionOne');
      await player.replaceAsync(require('../../../assets/videos/karar_videosu_1.mp4'));
      player.currentTime = 0;
      setMode('video');
    }, VIDEO_TRANSITION_DELAY_MS);
  };

  const goBack = () => {
    if (mode === 'video') {
      player.pause();
      setMode('briefing');
      return;
    }
    if (mode === 'options') {
      setMode('briefing');
      setSelected('');
      setHighlightedOption(null);
      setOptionsStage('initial');
      setDecisionTwoPending(false);
      return;
    }
    if (mode === 'dna') {
      setMode('options');
      return;
    }
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {mode === 'options' && (
        <>
          <ImageBackground
            source={optionsStage === 'afterDecisionOne' ? require('../../../assets/images/after_selected.png') : require('../../../assets/images/selected_options_bgimage.png')}
            style={styles.optionsBackground}
            imageStyle={styles.optionsBackgroundImage}
          />
          <View style={styles.optionsOverlay} />
          {optionsStage === 'initial' && selected !== '' && (
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
              <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
                <Defs>
                  <RadialGradient
                    id="redSelectionOverlay"
                    cx="50%"
                    cy="50%"
                    rx="50%"
                    ry="50%"
                    fx="50%"
                    fy="50%"
                  >
                    <Stop offset="80.6%" stopColor="#FF0000" stopOpacity="0" />
                    <Stop offset="100%" stopColor="#FF0000" stopOpacity="0.12" />
                  </RadialGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill="url(#redSelectionOverlay)" />
              </Svg>
            </View>
          )}
        </>
      )}

      {mode === 'dna' && <DNAResultView />}

      {mode !== 'video' && mode !== 'dna' && (
        <NavigationBar
          showTitle={false}
          showLeadingIcon={mode !== 'briefing'}
          showTrailingIcon={false}
          leadingIcon="arrow-left"
          onLeadingPress={goBack}
          showBottomBorder={mode !== 'options'}
          transparent={mode === 'options'}
          overlay={mode === 'options'}
        />
      )}

      {mode === 'briefing' && (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <BriefingView scenario={scenario} onStart={startSimulation} />
        </ScrollView>
      )}

      {mode === 'video' && (
        <View style={styles.videoPage}>
          <VideoView
            player={player}
            style={styles.video}
            contentFit="cover"
            nativeControls={false}
            useExoShutter={false}
            onFirstFrameRender={() => undefined}
          />
          <NavigationBar
            showTitle={false}
            showLeadingIcon
            showTrailingIcon={false}
            leadingIcon="arrow-left"
            onLeadingPress={goBack}
            showBottomBorder={false}
            transparent
            overlay
          />
        </View>
      )}

      {mode === 'options' && (
        <ScrollView contentContainerStyle={styles.optionsPage} showsVerticalScrollIndicator={false}>
          <OptionsView
            selected={selected}
            highlightedOption={highlightedOption}
            optionsStage={optionsStage}
            onChooseOption={chooseOption}
            options={OPTIONS}
          />
          {optionsStage === 'initial' && (
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, selected && styles.selectedProgressFill]} />
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020618' },
  content: { paddingTop: 16, paddingBottom: 32, alignItems: 'center' },
  videoPage: { flex: 1, padding: 0, backgroundColor: '#020618' },
  video: { flex: 1, width: '100%', height: '100%', backgroundColor: '#020618' },
  optionsBackground: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%' },
  optionsBackgroundImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  optionsOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.49)' },
  optionsPage: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  progressTrack: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    width: '94%',
    maxWidth: OPTIONS_PROGRESS.trackWidth,
    height: OPTIONS_PROGRESS.trackHeight,
    borderRadius: 999,
    backgroundColor: 'rgba(29, 41, 61, 0.56)',
    overflow: 'visible',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressFill: {
    height: '100%',
    width: OPTIONS_PROGRESS.fillWidth,
    alignSelf: 'center',
    borderRadius: 999,
    backgroundColor: '#FFD230',
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  selectedProgressFill: { width: 66, backgroundColor: '#FB2C36', shadowColor: '#06B6D4', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 4 },
});
