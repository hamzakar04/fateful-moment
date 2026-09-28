import React, { useEffect, useMemo, useState } from 'react';
import { useEventListener } from 'expo';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import Svg, { Circle, Defs, Line, Path, Polygon, RadialGradient, Rect, Stop, SvgXml } from 'react-native-svg';
import { Button } from '../../components/ui/Button';
import { NavigationBar } from '../../components/navigation/NavigationBar';
import { OptionCard } from '../../components/cards/OptionCard';
import { MOCK_SCENARIOS } from '../../services/mockData';
import { Colors } from '../../constants/theme';

type ScreenMode = 'briefing' | 'video' | 'options' | 'dna';
type OptionsStage = 'initial' | 'afterDecisionOne';
type VideoStage = 'intro' | 'decisionOne' | 'decisionTwo';

const LEGACY_OPTIONS = [
  "Deniz Karantinası: Küba'yı kuşatıp Sovyet gemilerini engelleyerek gizli pazarlık yürütmek.",
  'Wait for Signal from Moscow',
  'Zaman Baskısına Uyum: Siyasi ve medya baskısı nedeniyle risklere rağmen belirlenen takvimde fırlatmayı başlat.',
  'Signal US Ships with Sonar',
  'Signal US Ships with Sonar',
];

const OPTIONS = [
  "Deniz Karantinas\u0131: K\u00FCba'y\u0131 ku\u015Fat\u0131p Sovyet gemilerini engelleyerek gizli pazarl\u0131k y\u00FCr\u00FCtmek.",
  'Wait for Signal from Moscow',
  'Zaman Bask\u0131s\u0131na Uyum: Siyasi ve medya bask\u0131s\u0131 nedeniyle risklere ra\u011Fmen belirlenen takvimde f\u0131rlatmay\u0131 ba\u015Flat.',
  'Signal US Ships with Sonar',
  'Signal US Ships with Sonar',
];

const OPTIONS_PROGRESS = {
  trackWidth: 764,
  trackMaxWidth: '94%' as const,
  trackHeight: 6,
  fillWidth: 214,
};

const PATTERN_ICON = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M11 6H9.76C9.3 6 8.9 6.3 8.8 6.73L7.62 10.91C7.61 10.96 7.56 11 7.5 11C7.44 11 7.39 10.96 7.38 10.91L4.62 1.09C4.61 1.04 4.56 1 4.5 1C4.44 1 4.39 1.04 4.38 1.09L3.2 5.27C3.1 5.7 2.7 6 2.25 6H1" stroke="#00D3F2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const TARGET_ICON = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#FB2C36" stroke-width="0.83"/><circle cx="6" cy="6" r="3" stroke="#FB2C36" stroke-width="0.83"/><circle cx="6" cy="6" r="1" stroke="#FB2C36" stroke-width="0.83"/></svg>';
const DNA_ICON = '<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M4.16 6.66 4.79 7.29M5.83 3.33 5.21 2.71M6.25.83C5.5 1.66 5.2 2.5 5.08 3.33M6.87 4.37l.42.42M7.08 2.5 5.88 1.29M.83 6.25c2.78-2.5 5.55 0 8.33-2.5M8.33 3.75l.37.37M1.29 5.88l.37.37M2.71 5.21l.41.42M2.92 7.5l1.2 1.2M3.75 9.16c.75-.83 1.05-1.66 1.17-2.5" stroke="#00D3F2" stroke-width=".83" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function MetricIcon({ type }: { type: string }) {
  const common = { stroke: '#45556C', strokeWidth: 0.56, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <Svg width={7} height={7} viewBox="0 0 7 7">
      {type === 'vision' && <><Path d="M.58 3.46a3.01 3.01 0 0 1 5.57-.2 3.01 3.01 0 0 1-5.57.2Z" fill="none" {...common} /><Circle cx="3.36" cy="3.36" r=".84" fill="none" {...common} /></>}
      {type === 'courage' && <Path d="m3.68.61-.54 1.81c-.02.07.03.14.1.14h1.96c.11 0 .17.13.1.22L3.05 6.12c-.08.09-.23.01-.19-.1l.54-1.72c.02-.07-.03-.14-.1-.14H1.12c-.11 0-.17-.13-.1-.22L3.68.61Z" fill="none" {...common} />}
      {type === 'risk' && <><Path d="m3.36.84-2.73 4.8c-.1.17.03.25.21.25h5.04c.18 0 .31-.08.21-.25L3.36.84Z" fill="none" {...common} /><Path d="M3.36 2.52v1.12M3.36 4.76h.01" fill="none" {...common} /></>}
      {type === 'control' && <><Circle cx="3.36" cy="3.36" r=".84" fill="none" {...common} /><Circle cx="3.36" cy="3.36" r="2.8" fill="none" {...common} /></>}
      {type === 'empathy' && <Path d="M5.33 3.92c.42-.41.84-.9.84-1.54a1.82 1.82 0 0 0-2.81-.98 1.82 1.82 0 0 0-2.8.98c0 .64.42 1.13.84 1.54l1.96 1.96 1.97-1.96Z" fill="none" {...common} />}
      {type === 'ethics' && <><Path d="m4.48 4.48.84-2.24.84 2.24a1.4 1.4 0 0 1-1.68 0ZM.56 4.48l.84-2.24.84 2.24a1.4 1.4 0 0 1-1.68 0ZM1.96 5.89h2.8M3.36.84v5.05M.84 1.96h.56c.56 0 1.4-.28 1.96-.56.56.28 1.4.56 1.96.56h.56" fill="none" {...common} /></>}
    </Svg>
  );
}

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
    player.currentTime = 0;
    setMode('video');
  };

  const chooseOption = async (index: number) => {
    if (optionsStage === 'afterDecisionOne') {
      if (decisionTwoPending) {
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
      }, 2000);
      return;
    }

    setSelected(String(index));
    if (index !== 1) {
      return;
    }

    setVideoStage('decisionOne');
    await player.replaceAsync(require('../../../assets/videos/karar_videosu_1.mp4'));
    player.currentTime = 0;
    setTimeout(() => setMode('video'), 2350);
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
          {selected && optionsStage === 'initial' && (
            <Svg style={styles.selectionOverlay} pointerEvents="none">
              <Defs>
                <RadialGradient id="selected-options-red-overlay" cx="50%" cy="50%" rx="50%" ry="50%">
                  <Stop offset="80.6%" stopColor="#FF0000" stopOpacity={0} />
                  <Stop offset="100%" stopColor="#FF0000" stopOpacity={0.12} />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#selected-options-red-overlay)" />
            </Svg>
          )}
        </>
      )}

      {mode === 'dna' && (
        <ScrollView contentContainerStyle={styles.dnaPage} showsVerticalScrollIndicator={false}>
          <Text style={styles.dnaTitle}>Karar DNA'sı</Text>
          <View style={styles.dnaContainer}>
            <View style={styles.dnaColumn}>
              <View style={styles.profileSection}>
                <Image source={require('../../../assets/images/dna_pp.png')} style={styles.profileImage} />
                <View style={styles.profileCopy}>
                  <Text style={styles.profileTitle}>BRAVE VISIONARY</Text>
                  <View style={styles.profileQuoteBlock}>
                    <Text style={styles.profileQuote}>
                      &quot;You see the big picture and walk towards it - no matter the cost. Ethics sometimes take a back seat, but few surpass you in the courage to take action.&quot;
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.matrixSection}>
                <View style={styles.matrixHeader}>
                  <Text style={styles.matrixIcon}>✣</Text>
                  <Text style={styles.matrixTitle}>PSYCHOLOGICAL MATRIX</Text>
                  <SvgXml xml={DNA_ICON} width={10} height={10} style={styles.matrixAssetIcon} />
                </View>
                <View style={styles.matrixBody}>
                  <View style={styles.radarWrap}>
                    <Svg width={149} height={113} viewBox="0 0 149 113">
                      <Polygon points="73.5,14 116,36.5 116,81.5 73.5,104 31,81.5 31,36.5" fill="none" stroke="#1E293B" strokeWidth="0.5" />
                      <Polygon points="73.5,25 105,42 105,76 73.5,93 42,76 42,42" fill="none" stroke="#1E293B" strokeWidth="0.5" />
                      <Polygon points="73.5,36.5 94.5,47.7 94.5,70.3 73.5,81.5 52.5,70.3 52.5,47.7" fill="none" stroke="#1E293B" strokeWidth="0.5" />
                      <Polygon points="73.5,47.7 84,53.3 84,64.6 73.5,70.3 63,64.6 63,53.3" fill="none" stroke="#1E293B" strokeWidth="0.5" />
                      <Line x1="73.5" y1="14" x2="73.5" y2="104" stroke="#1E293B" strokeWidth="0.5" />
                      <Line x1="31" y1="36.5" x2="116" y2="81.5" stroke="#1E293B" strokeWidth="0.5" />
                      <Line x1="31" y1="81.5" x2="116" y2="36.5" stroke="#1E293B" strokeWidth="0.5" />
                      <Polygon points="73.5,19.3 108.1,40.5 106.9,76.8 73.5,83.8 57.3,67.5 60.3,52 73.5,19.3" fill="#06B6D4" fillOpacity="0.4" stroke="#06B6D4" strokeWidth="1.5" />
                    </Svg>
                    <Text style={[styles.radarLabel, styles.radarTop]}>Vision</Text>
                    <Text style={[styles.radarLabel, styles.radarRightTop]}>Courage</Text>
                    <Text style={[styles.radarLabel, styles.radarRightBottom]}>Risk</Text>
                    <Text style={[styles.radarLabel, styles.radarBottom]}>Control</Text>
                    <Text style={[styles.radarLabel, styles.radarLeftBottom]}>Empathy</Text>
                    <Text style={[styles.radarLabel, styles.radarLeftTop]}>Ethics</Text>
                  </View>
                  <View style={styles.metricGrid}>
                    {[
                      ['◉', 'VISION', '88'],
                      ['ϟ', 'COURAGE', '82'],
                      ['△', 'RISK', '79'],
                      ['⚙', 'CONTROL', '55'],
                      ['♡', 'EMPATHY', '38'],
                      ['⚖', 'ETHICS', '31'],
                    ].map(([icon, label, value]) => (
                      <View key={label} style={styles.metricCard}>
                        <View style={styles.metricTop}>
                          <MetricIcon type={label.toLowerCase()} />
                          <Text style={styles.metricValue}>{value}</Text>
                        </View>
                        <Text style={styles.metricLabel}>{label}</Text>
                        <View style={styles.metricTrack}>
                          <View style={[styles.metricFill, { width: `${Number(value)}%` }]} />
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.dnaColumn}>
              <View style={styles.patternSection}>
                <View style={styles.patternHeader}>
                  <SvgXml xml={PATTERN_ICON} width={12} height={12} />
                  <Text style={styles.patternTitle}>PATTERN DETECTION</Text>
                </View>
                <View style={styles.patternList}>
                  <View style={styles.patternRow}>
                    <Text style={styles.patternNumber}>01</Text>
                    <Text style={styles.patternCopy}>You are not afraid to take action under pressure. While others hesitate, you have already taken a step. This positions you as a natural leader in crisis moments.</Text>
                  </View>
                  <View style={styles.patternRow}>
                    <Text style={styles.patternNumber}>02</Text>
                    <Text style={styles.patternCopy}>You prioritize long-term impact over short-term costs. You see the big picture — but this sometimes makes it difficult for you to see the people in front of you.</Text>
                  </View>
                  <View style={styles.patternRow}>
                    <Text style={styles.patternNumber}>03</Text>
                    <Text style={styles.patternCopy}>When ethics conflict with interests, your tendency is clear: you choose the interest. This pattern repeated in 5 out of 8 scenarios. It works in the short term — but creates erosion of trust in the long term.</Text>
                  </View>
                </View>
              </View>
              <View style={styles.blindSpotSection}>
                <View style={styles.blindSpotHeader}>
                  <SvgXml xml={TARGET_ICON} width={12} height={12} />
                  <Text style={styles.blindSpotTitle}>BLIND SPOT - ETHICS</Text>
                </View>
                <Text style={styles.blindSpotQuestion}>How much will you pay to win?</Text>
                <Text style={styles.blindSpotCopy}>Your vision and courage are strong — but your ethics score is your lowest dimension. While reaching big goals, you often overlook how those around you feel and what they sacrifice. Your leadership capacity is high, but the mark you leave is not always positive.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      {mode !== 'video' && (
        <NavigationBar
          showTitle={false}
          showLeadingIcon={mode !== 'briefing'}
          showTrailingIcon={false}
          leadingIcon="arrow-left"
          onLeadingPress={goBack}
          showBottomBorder={mode !== 'options'}
          transparent={mode === 'options'}
        />
      )}

      {mode === 'briefing' && (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.briefingContainer}>
            <ImageBackground source={require('../../../assets/images/iraq_war_video_page.png')} style={styles.briefingImage} imageStyle={styles.briefingImageStyle}>
              <View style={styles.imageShade} />
              <View style={styles.briefingContent}>
                <View style={styles.textContainer}>
                  <View style={styles.titleBlock}>
                    <Text style={styles.eyebrow}>SCENARIO BRIEFING</Text>
                    <Text style={styles.scenarioTitle}>{scenario.title.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.description}>{scenario.description}</Text>
                </View>
                <Button title="Start Simulation" variant="primary" onPress={startSimulation} style={styles.startButton} textStyle={styles.startButtonText} />
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      )}

      {mode === 'video' && (
        <View style={styles.videoPage}>
          <VideoView
            player={player}
            style={styles.video}
            contentFit="fill"
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
          <View style={styles.optionsGrid}>
            {optionsStage === 'afterDecisionOne' && <View style={styles.yourChoiceBadge}><Text style={styles.yourChoiceText}>Your Choice</Text></View>}
            {OPTIONS.map((option, index) => (
              <OptionCard
                key={`${option}-${index}`}
                text={option}
                selected={selected === String(index) || highlightedOption === String(index)}
                onPress={() => chooseOption(index)}
              />
            ))}
          </View>
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
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingTop: 16, paddingBottom: 32, alignItems: 'center' },
  briefingContainer: { width: '90%', maxWidth: 728, height: 292, borderRadius: 24, overflow: 'hidden', borderTopWidth: 1, borderTopColor: Colors.border, shadowColor: '#000000', shadowOffset: { width: 0, height: 25 }, shadowOpacity: 0.25, shadowRadius: 25, elevation: 8 },
  briefingImage: { flex: 1, justifyContent: 'flex-end' },
  briefingImageStyle: { resizeMode: 'cover' },
  imageShade: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(2, 6, 24, 0.34)' },
  briefingContent: { padding: 24, gap: 24, alignItems: 'center' },
  textContainer: { width: '100%', maxWidth: 497, alignItems: 'center', gap: 16 },
  titleBlock: { alignItems: 'center', gap: 4 },
  eyebrow: { color: Colors.primary, fontFamily: 'monospace', fontWeight: '700', fontSize: 11, lineHeight: 16, letterSpacing: 1, textAlign: 'center' },
  scenarioTitle: { color: '#F8FAFC', fontFamily: 'Inter_900Black', fontStyle: 'italic', fontSize: 28, lineHeight: 34, textAlign: 'center' },
  description: { color: 'rgba(248, 250, 252, 0.8)', fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 20, textAlign: 'center' },
  startButton: { width: 179, height: 48, minHeight: 48, borderRadius: 16, backgroundColor: 'rgba(0, 184, 219, 0.14)', borderColor: 'rgba(0, 184, 219, 0.3)', paddingVertical: 12, paddingHorizontal: 0 },
  startButtonText: { width: 131, flexShrink: 0, color: Colors.primary, fontFamily: 'Inter_900Black', fontSize: 16, lineHeight: 24, textAlign: 'center' },
  videoPage: { flex: 1, padding: 0, backgroundColor: '#000000' },
  video: { flex: 1, width: '100%', height: '100%', backgroundColor: '#000000' },
  optionsBackground: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  optionsBackgroundImage: { resizeMode: 'cover' },
  optionsOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.49)' },
  selectionOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%' },
  optionsPage: { paddingTop: 28, paddingBottom: 32, alignItems: 'center', gap: 28 },
  optionsGrid: { width: '90%', maxWidth: 702, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  yourChoiceBadge: { position: 'absolute', top: -18, left: '68%', width: 106, height: 32, borderRadius: 16, backgroundColor: '#FFD230', alignItems: 'center', justifyContent: 'center', zIndex: 3, elevation: 3 },
  yourChoiceText: { color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 12, lineHeight: 16, textAlign: 'center' },
  progressTrack: { width: '94%', maxWidth: OPTIONS_PROGRESS.trackWidth, height: OPTIONS_PROGRESS.trackHeight, borderRadius: 999, backgroundColor: 'rgba(29, 41, 61, 0.56)', overflow: 'hidden' },
  progressFill: { height: '100%', width: OPTIONS_PROGRESS.fillWidth, alignSelf: 'center', borderRadius: 999, backgroundColor: '#FFD230', opacity: 1 },
  selectedProgressFill: { width: 66, backgroundColor: '#FB2C36', shadowColor: '#06B6D4', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 4 },
  dnaPage: { paddingTop: 28, paddingBottom: 32, alignItems: 'center' },
  dnaTitle: { width: '90%', maxWidth: 727, color: '#E2E8F0', fontFamily: 'Inter_700Bold', fontSize: 20, lineHeight: 20, textTransform: 'capitalize', marginBottom: 16 },
  dnaContainer: { width: '90%', maxWidth: 727, flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  dnaColumn: { flex: 1, minWidth: 300, maxWidth: 355.5, gap: 16 },
  profileSection: { width: '100%', height: 82, borderRadius: 16, borderWidth: 1, borderColor: '#1D293D', backgroundColor: 'rgba(15, 23, 43, 0.4)', padding: 8, flexDirection: 'row', gap: 12 },
  profileImage: { width: 64, height: 64, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(0, 184, 219, 0.2)', backgroundColor: '#020618', resizeMode: 'cover' },
  profileCopy: { flex: 1, height: 64, gap: 8 },
  profileTitle: { color: '#F8FAFC', fontFamily: 'Inter_900Black', fontStyle: 'italic', fontSize: 16, lineHeight: 24, textTransform: 'uppercase' },
  profileQuoteBlock: { borderLeftWidth: 1, borderLeftColor: 'rgba(0, 184, 219, 0.4)', paddingHorizontal: 4 },
  profileQuote: { color: '#E2E8F0', fontFamily: 'Inter_400Regular', fontSize: 8, lineHeight: 11 },
  matrixSection: { width: '100%', height: 174, borderRadius: 16, borderWidth: 1, borderColor: '#1D293D', backgroundColor: 'rgba(15, 23, 43, 0.6)', padding: 8 },
  matrixHeader: { height: 11, position: 'relative', flexDirection: 'row', alignItems: 'center', gap: 6 },
  matrixIcon: { display: 'none' },
  matrixAssetIcon: { position: 'absolute', left: 0, top: 0 },
  matrixTitle: { marginLeft: 16, color: '#E2E8F0', fontFamily: 'monospace', fontSize: 8, lineHeight: 11, textTransform: 'uppercase' },
  matrixBody: { height: 141, marginTop: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  radarWrap: { width: 149, height: 126, position: 'relative', justifyContent: 'center' },
  radarLabel: { position: 'absolute', color: '#64748B', fontFamily: 'Inter_700Bold', fontSize: 7, lineHeight: 9 },
  radarTop: { top: 0, left: 66 },
  radarRightTop: { top: 34, right: 0 },
  radarRightBottom: { bottom: 34, right: 0 },
  radarBottom: { bottom: 0, left: 65 },
  radarLeftBottom: { bottom: 34, left: 0 },
  radarLeftTop: { top: 34, left: 0 },
  metricGrid: { width: 133, height: 126, flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  metricCard: { width: 62.5, height: 37.2, borderRadius: 6.7, borderWidth: 0.32, borderTopColor: '#1D293D', borderColor: '#1D293D', backgroundColor: 'rgba(2, 6, 24, 0.6)', padding: 7, justifyContent: 'space-between' },
  metricTop: { height: 7, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricIcon: { color: '#64748B', fontSize: 7, lineHeight: 7 },
  metricValue: { color: '#00D3F3', fontFamily: 'Inter_900Black', fontStyle: 'italic', fontSize: 5, lineHeight: 7 },
  metricLabel: { color: '#64748B', fontFamily: 'monospace', fontSize: 4.2, lineHeight: 6.3, letterSpacing: 0.42 },
  metricTrack: { height: 2, borderRadius: 999, backgroundColor: '#1D293D', overflow: 'hidden' },
  metricFill: { height: '100%', borderRadius: 999, backgroundColor: '#00B8DB' },
  patternSection: { width: '100%', height: 133, borderRadius: 16, borderWidth: 1, borderColor: '#1D293D', backgroundColor: 'rgba(15, 23, 43, 0.4)', padding: 8, gap: 8 },
  patternHeader: { width: '100%', height: 14, flexDirection: 'row', alignItems: 'center', gap: 8, paddingBottom: 0, borderBottomWidth: 0 },
  patternTitle: { color: '#90A1B9', fontFamily: 'monospace', fontSize: 8, lineHeight: 11, textTransform: 'uppercase' },
  patternList: { width: '100%', height: 93, gap: 8 },
  patternRow: { width: '100%', flexDirection: 'row', gap: 4 },
  patternNumber: { width: 13, color: '#00B8DB', fontFamily: 'monospace', fontWeight: '700', fontSize: 10, lineHeight: 15 },
  patternCopy: { flex: 1, color: '#62748E', fontFamily: 'Inter_400Regular', fontSize: 8, lineHeight: 11 },
  blindSpotSection: { width: '100%', height: 123, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(251, 44, 54, 0.2)', backgroundColor: 'rgba(251, 44, 54, 0.05)', padding: 8, gap: 8 },
  blindSpotHeader: { width: '100%', height: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  blindSpotTitle: { color: '#FB2C36', fontFamily: 'monospace', fontSize: 8, lineHeight: 11, textTransform: 'uppercase' },
  blindSpotQuestion: { color: '#FFFFFF', fontFamily: 'Inter_400Regular', fontSize: 8, lineHeight: 11 },
  blindSpotCopy: { color: '#90A1B9', fontFamily: 'Inter_400Regular', fontSize: 8, lineHeight: 11, flex: 1 },
});
