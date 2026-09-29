import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

function LevelsIcon() {
  return (
    <Svg width={125.5} height={13} viewBox="0 0 125.5 13" fill="none">
      <Path d="M6 12h2V9H6v3Zm5 0h2V6h-2v6Zm5 0h2V3h-2v9Zm5 0h2V1h-2v11Z" fill="#FFFFFF" />
      <Path transform="translate(9.1 0)" d="M32.2 2.8c2.5 0 4.9.9 6.7 2.6l1.3-1.3C35.3-.3 27.8-.3 23.1 4.1l1.3 1.3c1.8-1.7 4.2-2.6 6.7-2.6Zm0 4.2c1.4 0 2.7.5 3.7 1.4l1.3-1.3c-3.1-2.9-7.8-2.9-10.9 0l1.3 1.3c1-.9 2.3-1.4 3.7-1.4Zm2.5 2.8-2.2 2.5-2.2-2.5c1.4-1.3 3-1.3 4.4 0Z" fill="#FFFFFF" />
      <Rect x="56.3" y=".5" width="27.3" height="12" rx="3.8" stroke="#FFFFFF" />
      <Rect x="58.3" y="2" width="23.3" height="9" rx="2.5" fill="#FFFFFF" />
      <Path d="M84.6 4.8v4.1c.8-.3 1.3-1.1 1.3-2.1s-.5-1.7-1.3-2Z" fill="#FFFFFF" />
    </Svg>
  );
}

export function IPhoneStatusBar() {
  return (
    <View pointerEvents="none" style={styles.statusBar}>
      <View style={styles.statusFrame}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>9:41</Text>
        </View>
        <View style={styles.dynamicIsland} />
        <View style={styles.levels}>
          <LevelsIcon />
        </View>
      </View>
    </View>
  );
}

export function IPhoneHomeIndicator() {
  return (
    <View pointerEvents="none" style={styles.homeIndicatorBar}>
      <View style={styles.homeIndicator} />
    </View>
  );
}

export function IPhoneChrome() {
  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <>
      <IPhoneStatusBar />
      <IPhoneHomeIndicator />
    </>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    paddingTop: 21,
    backgroundColor: '#020618',
    zIndex: 20,
    elevation: 20,
  },
  statusFrame: {
    height: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeContainer: {
    width: 125.5,
    gap: 10,
    paddingLeft: 48,
    paddingRight: 6,
  },
  time: {
    width: 37,
    height: 22,
    color: '#FFFFFF',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  dynamicIsland: {
    width: 124,
    height: 10,
  },
  levels: {
    width: 125.5,
    height: 13,
    justifyContent: 'center',
  },
  homeIndicatorBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
    zIndex: 20,
    elevation: 20,
  },
  homeIndicator: {
    position: 'absolute',
    top: 21,
    left: '50%',
    width: 144,
    height: 5,
    marginLeft: -72,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
  },
});
