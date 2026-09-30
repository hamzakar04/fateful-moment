import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Line, Polygon, SvgXml } from 'react-native-svg';
import { DNA_ICON, MetricIcon, PATTERN_ICON, TARGET_ICON } from './ScenarioIcons';

export function DNAResultView() {
  return (
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
  );
}

const styles = StyleSheet.create({
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
