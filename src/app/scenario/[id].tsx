import React, { useEffect, useMemo, useState } from 'react';
import { useEventListener } from 'expo';
import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, Line, Path, Polygon, RadialGradient, Rect, Stop, SvgXml } from 'react-native-svg';
import { Button } from '../../components/ui/Button';
import { NavigationBar } from '../../components/navigation/NavigationBar';
import { OptionCard } from '../../components/cards/OptionCard';
import { MOCK_SCENARIOS } from '../../services/mockData';
import { Colors } from '../../constants/theme';

type ScreenMode = 'briefing' | 'video' | 'options' | 'dna';
type OptionsStage = 'initial' | 'afterDecisionOne';
type VideoStage = 'intro' | 'decisionOne' | 'decisionTwo';

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
const CONTROL_ICON = '<svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.425 0.560425H3.30168C3.15301 0.560425 3.01043 0.619483 2.90531 0.724606C2.80019 0.829729 2.74113 0.972308 2.74113 1.12097V1.17142C2.74103 1.26972 2.71508 1.36627 2.66589 1.45137C2.61669 1.53648 2.54598 1.60715 2.46085 1.6563L2.34034 1.72637C2.25512 1.77557 2.15846 1.80147 2.06006 1.80147C1.96166 1.80147 1.865 1.77557 1.77979 1.72637L1.73774 1.70395C1.60912 1.62975 1.4563 1.60962 1.31285 1.64798C1.16939 1.68634 1.04702 1.78005 0.972594 1.90855L0.910933 2.01505C0.836734 2.14368 0.816605 2.29649 0.854965 2.43995C0.893324 2.5834 0.987038 2.70577 1.11553 2.7802L1.15758 2.80823C1.2423 2.85714 1.31274 2.92737 1.36191 3.01194C1.41108 3.09651 1.43726 3.19248 1.43785 3.2903V3.43324C1.43824 3.53202 1.41253 3.62914 1.36331 3.71478C1.31409 3.80042 1.24312 3.87153 1.15758 3.92092L1.11553 3.94615C0.987038 4.02057 0.893324 4.14295 0.854965 4.2864C0.816605 4.42985 0.836734 4.58267 0.910933 4.7113L0.972594 4.8178C1.04702 4.9463 1.16939 5.04001 1.31285 5.07837C1.4563 5.11673 1.60912 5.0966 1.73774 5.0224L1.77979 4.99998C1.865 4.95078 1.96166 4.92488 2.06006 4.92488C2.15846 4.92488 2.25512 4.95078 2.34034 4.99998L2.46085 5.07005C2.54598 5.1192 2.61669 5.18987 2.66589 5.27497C2.71508 5.36008 2.74103 5.45662 2.74113 5.55492V5.60537C2.74113 5.75404 2.80019 5.89662 2.90531 6.00174C3.01043 6.10686 3.15301 6.16592 3.30168 6.16592H3.425C3.57367 6.16592 3.71624 6.10686 3.82137 6.00174C3.92649 5.89662 3.98555 5.75404 3.98555 5.60537V5.55492C3.98565 5.45662 4.0116 5.36008 4.06079 5.27497C4.10999 5.18987 4.18069 5.1192 4.26582 5.07005L4.38634 4.99998C4.47156 4.95078 4.56822 4.92488 4.66662 4.92488C4.76501 4.92488 4.86168 4.95078 4.94689 4.99998L4.98893 5.0224C5.11756 5.0966 5.27037 5.11673 5.41383 5.07837C5.55728 5.04001 5.67966 4.9463 5.75408 4.8178L5.81574 4.70849C5.88994 4.57987 5.91007 4.42705 5.87171 4.2836C5.83335 4.14014 5.73964 4.01777 5.61114 3.94334L5.5691 3.92092C5.48356 3.87153 5.41259 3.80042 5.36337 3.71478C5.31415 3.62914 5.28844 3.53202 5.28883 3.43324V3.29311C5.28844 3.19433 5.31415 3.09721 5.36337 3.01157C5.41259 2.92593 5.48356 2.85481 5.5691 2.80543L5.61114 2.7802C5.73964 2.70577 5.83335 2.5834 5.87171 2.43995C5.91007 2.29649 5.88994 2.14368 5.81574 2.01505L5.75408 1.90855C5.67966 1.78005 5.55728 1.68634 5.41383 1.64798C5.27037 1.60962 5.11756 1.62975 4.98893 1.70395L4.94689 1.72637C4.86168 1.77557 4.76501 1.80147 4.66662 1.80147C4.56822 1.80147 4.47156 1.77557 4.38634 1.72637L4.26582 1.6563C4.18069 1.60715 4.10999 1.53648 4.06079 1.45137C4.0116 1.36627 3.98565 1.26972 3.98555 1.17142V1.12097C3.98555 0.972308 3.92649 0.829729 3.82137 0.724606C3.71624 0.619483 3.57367 0.560425 3.425 0.560425Z" stroke="#45556C" stroke-width="0.56055" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.36329 4.20399C3.82766 4.20399 4.20411 3.82754 4.20411 3.36316C4.20411 2.89879 3.82766 2.52234 3.36329 2.52234C2.89891 2.52234 2.52246 2.89879 2.52246 3.36316Z" stroke="#45556C" stroke-width="0.56055" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function MetricIcon({ type }: { type: string }) {
  if (type === 'control') {
    return <SvgXml xml={CONTROL_ICON} width={7} height={7} />;
  }

  const common = { stroke: '#45556C', strokeWidth: 0.56, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <Svg width={7} height={7} viewBox="0 0 7 7">
      {type === 'vision' && <><Path d="M.58 3.46a3.01 3.01 0 0 1 5.57-.2 3.01 3.01 0 0 1-5.57.2Z" fill="none" {...common} /><Circle cx="3.36" cy="3.36" r=".84" fill="none" {...common} /></>}
      {type === 'courage' && <Path d="m3.68.61-.54 1.81c-.02.07.03.14.1.14h1.96c.11 0 .17.13.1.22L3.05 6.12c-.08.09-.23.01-.19-.1l.54-1.72c.02-.07-.03-.14-.1-.14H1.12c-.11 0-.17-.13-.1-.22L3.68.61Z" fill="none" {...common} />}
      {type === 'risk' && <><Path d="m3.36.84-2.73 4.8c-.1.17.03.25.21.25h5.04c.18 0 .31-.08.21-.25L3.36.84Z" fill="none" {...common} /><Path d="M3.36 2.52v1.12M3.36 4.76h.01" fill="none" {...common} /></>}
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
      }, 2000);
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
    }, 2000);
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

      {mode === 'dna' && (
        <ScrollView contentContainerStyle={styles.dnaPage} showsVerticalScrollIndicator={false}>
          <Text style={styles.dnaTitle}>Karar DNAsı</Text>
          <View style={styles.dnaContainer}>
            <View style={styles.dnaColumn}>
              <View style={styles.profileSection}>
                <View style={styles.profileImageFrame}>
                  <Image source={require('../../../assets/images/dna_pp.png')} style={styles.profileImage} resizeMode="cover" />
                </View>
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
                <View style={styles.blindSpotParagraph}>
                  <Text style={styles.blindSpotCopy}>
                    Your vision and courage are strong — but your ethics score is your lowest dimension. While reaching big goals, you often overlook how those around you feel and what they sacrifice. Your leadership capacity is high, but the mark you leave is not always positive.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
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
                  frosted
                  onPress={startSimulation}
                  style={styles.startButton}
                  textStyle={styles.startButtonText}
                />
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
          <View style={styles.optionsContainer}>
            {optionsStage === 'afterDecisionOne' && (
              <View style={styles.yourChoiceBadge}>
                <Text style={styles.yourChoiceText}>Your Choice</Text>
              </View>
            )}

            {/* Row 1 */}
            <View style={styles.optionsRow}>
              {[0, 1].map((index) => {
                const option = OPTIONS[index];
                const isFirstChoice = selected === String(index);
                const isSecondChoice = highlightedOption === String(index);
                const hasSecondChoice = highlightedOption !== null;

                const isPassive = optionsStage === 'afterDecisionOne' && hasSecondChoice && isFirstChoice;
                const isSelected = optionsStage === 'afterDecisionOne'
                  ? (hasSecondChoice ? isSecondChoice : isFirstChoice)
                  : isFirstChoice;

                return (
                  <OptionCard
                    key={`${option}-${index}`}
                    text={option}
                    selected={isSelected}
                    passive={isPassive}
                    textAlign={index === 0 ? 'left' : 'center'}
                    onPress={() => chooseOption(index)}
                  />
                );
              })}
            </View>

            {/* Row 2 */}
            <View style={styles.optionsRow}>
              {[2, 3].map((index) => {
                const option = OPTIONS[index];
                const isFirstChoice = selected === String(index);
                const isSecondChoice = highlightedOption === String(index);
                const hasSecondChoice = highlightedOption !== null;

                const isPassive = optionsStage === 'afterDecisionOne' && hasSecondChoice && isFirstChoice;
                const isSelected = optionsStage === 'afterDecisionOne'
                  ? (hasSecondChoice ? isSecondChoice : isFirstChoice)
                  : isFirstChoice;

                return (
                  <OptionCard
                    key={`${option}-${index}`}
                    text={option}
                    selected={isSelected}
                    passive={isPassive}
                    textAlign={index === 2 ? 'left' : 'center'}
                    onPress={() => chooseOption(index)}
                  />
                );
              })}
            </View>

            {/* Row 3 */}
            <View style={styles.optionsRowCenter}>
              {[4].map((index) => {
                const option = OPTIONS[index];
                const isFirstChoice = selected === String(index);
                const isSecondChoice = highlightedOption === String(index);
                const hasSecondChoice = highlightedOption !== null;

                const isPassive = optionsStage === 'afterDecisionOne' && hasSecondChoice && isFirstChoice;
                const isSelected = optionsStage === 'afterDecisionOne'
                  ? (hasSecondChoice ? isSecondChoice : isFirstChoice)
                  : isFirstChoice;

                return (
                  <OptionCard
                    key={`${option}-${index}`}
                    text={option}
                    selected={isSelected}
                    passive={isPassive}
                    textAlign="center"
                    onPress={() => chooseOption(index)}
                  />
                );
              })}
            </View>
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
  container: { flex: 1, backgroundColor: '#020618' },
  content: { paddingTop: 16, paddingBottom: 32, alignItems: 'center' },
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
  videoPage: { flex: 1, padding: 0, backgroundColor: '#020618' },
  video: { flex: 1, width: '100%', height: '100%', backgroundColor: '#020618' },
  optionsBackground: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%' },
  optionsBackgroundImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  optionsOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.49)' },
  selectionOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%' },
  optionsPage: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  optionsContainer: {
    width: 702,
    height: 222,
    flexDirection: 'column',
    gap: 12,
    position: 'relative',
    transform: [{ translateX: 11 }],
  },
  optionsRow: {
    width: 702,
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionsRowCenter: {
    width: 702,
    height: 66,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  yourChoiceBadge: {
    position: 'absolute',
    top: -16,
    left: 476.5,
    width: 106,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD230',
    borderWidth: 1,
    borderColor: '#FFB900',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 10,
    opacity: 1,
  },
  yourChoiceText: { color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 12, lineHeight: 16, textAlign: 'center' },
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
  dnaPage: { paddingTop: 28, paddingBottom: 32, alignItems: 'center' },
  dnaTitle: { width: '90%', maxWidth: 727, color: '#E2E8F0', fontFamily: 'Inter_700Bold', fontSize: 20, lineHeight: 20, textTransform: 'capitalize', marginBottom: 16 },
  dnaContainer: { width: '90%', maxWidth: 727, flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  dnaColumn: { flex: 1, minWidth: 300, maxWidth: 355.5, gap: 16 },
  profileSection: { width: '100%', height: 82, borderRadius: 16, borderWidth: 1, borderColor: '#1D293D', backgroundColor: 'rgba(15, 23, 43, 0.4)', padding: 8, flexDirection: 'row', gap: 12 },
  profileImageFrame: { width: 64, height: 64, flexShrink: 0, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(0, 184, 219, 0.2)', backgroundColor: '#020618', overflow: 'hidden' },
  profileImage: { width: '100%', height: '100%', transform: [{ scale: 1.85 }, { translateY: 8 }] },
  profileCopy: { flex: 1, height: 64, gap: 8 },
  profileTitle: { color: '#F1F5F9', fontFamily: 'Inter_900Black_Italic', fontSize: 16, lineHeight: 24, letterSpacing: 0, textTransform: 'uppercase' },
  profileQuoteBlock: { borderLeftWidth: 1, borderLeftColor: 'rgba(0, 184, 219, 0.4)', paddingHorizontal: 4 },
  profileQuote: { color: '#90A1B9', fontFamily: 'Inter_400Regular', fontSize: 8, lineHeight: 11 },
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
  metricValue: { color: '#00D3F3', fontFamily: 'Inter_900Black_Italic', fontSize: 5, lineHeight: 7 },
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
  blindSpotParagraph: { width: '100%', maxWidth: 337.5, height: 44 },
  blindSpotCopy: { width: '100%', color: '#90A1B9', fontFamily: 'Inter_400Regular', fontSize: 8, lineHeight: 11 },
});
