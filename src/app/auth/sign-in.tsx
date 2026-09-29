import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Colors, Layout } from '../../constants/theme';
import { IPhoneChrome } from '../../components/system/IPhoneChrome';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const emailError = emailTouched && email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ? 'Please enter a valid email address.'
    : undefined;
  const canSubmit = email.trim().length > 0 && password.length > 0 && !emailError;

  return (
    <SafeAreaView style={styles.container}>
      <IPhoneChrome />
      <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityLabel="Go back">
            <Feather name="arrow-left" size={20} color={Colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Image source={require('../../../assets/images/fateful_moment_signup_logo_.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Welcome to Fateful Moment</Text>
            <Text style={styles.subtitle}>Sign in with Email</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Your email address"
              showLabel={false}
              compact
              placeholder="Your email address"
              placeholderTextColor="#62748E"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              error={emailError}
              onChangeText={setEmail}
              onBlur={() => setEmailTouched(true)}
            />
            <Input
              label="Your password"
              showLabel={false}
              compact
              placeholder="Your password"
              placeholderTextColor="#62748E"
              isPassword
              value={password}
              onChangeText={setPassword}
            />

            <Button
              title="Sign In"
              onPress={() => {
                if (canSubmit) router.replace('/home');
              }}
              variant="glass"
              disabled={!canSubmit}
              style={styles.submitButton}
              textStyle={styles.submitText}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => router.push('/auth/reset-password')}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>No account yet? </Text>
            <TouchableOpacity onPress={() => router.replace('/auth/sign-up')}>
              <Text style={styles.footerLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020618',
  },
  keyboard: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: Layout.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 0.75,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 148,
    height: 148,
    borderRadius: 74,
    marginBottom: 36,
  },
  title: {
    width: 327,
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: '#90A1B9',
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  submitButton: {
    marginTop: 16,
  },
  submitText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#00D3F3',
    textAlign: 'center',
  },
  forgotButton: {
    width: '100%',
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  forgotText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#00D3F3',
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    height: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 56,
  },
  footerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#90A1B9',
  },
  footerLink: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    lineHeight: 20,
    color: '#00D3F3',
    textDecorationLine: 'underline',
  },
});
