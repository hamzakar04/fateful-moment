import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SocialAuthButtons } from '../components/auth/SocialAuthButtons';
import { Colors, Layout, Typography } from '../constants/theme';
import { IPhoneChrome } from '../components/system/IPhoneChrome';

export default function AuthLandingScreen() {
  const router = useRouter();
  const enterApp = () => router.replace('/home');

  return (
    <SafeAreaView style={styles.container}>
      <IPhoneChrome />
      <View style={styles.content}>
        <View style={styles.topSpacer} />
        <View style={styles.header}>
          <Image source={require('../../assets/images/fateful_moment_signup_logo_.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Welcome to Fateful Moment</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey</Text>
        </View>
        <SocialAuthButtons onEmail={() => router.push('/auth/sign-in')} onApple={enterApp} onGoogle={enterApp} />
        <Text style={styles.legal}>By continuing you agree to the <Text style={styles.link}>Terms of Use</Text> and <Text style={styles.link}>Privacy Policy</Text>.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: Layout.spacing.sm, paddingBottom: Layout.spacing.lg },
  topSpacer: { height: 64 },
  header: { width: '100%', height: 248, alignItems: 'center', marginBottom: Layout.spacing.xxl },
  logo: { width: 148, height: 148, borderRadius: 74, marginBottom: Layout.spacing.lg },
  title: { fontFamily: 'Inter_700Bold', fontSize: 20, lineHeight: 25, color: Colors.text, textAlign: 'center', marginBottom: Layout.spacing.xs },
  subtitle: { ...Typography.bodyText, color: Colors.textMuted, textAlign: 'center' },
  legal: { ...Typography.bodyText, fontSize: 13, lineHeight: 20, color: Colors.textMuted, textAlign: 'center', marginTop: 'auto', paddingHorizontal: Layout.spacing.sm },
  link: { color: Colors.primary },
});
