import React, { useEffect, useMemo, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Colors, Layout, Typography } from '../../constants/theme';

interface PasswordRule {
  label: string;
  valid: boolean;
}

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordEdited, setPasswordEdited] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [touched, setTouched] = useState({ fullName: false, email: false });

  useEffect(() => {
    const keyboardSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setPasswordFocused(false);
    });

    return () => keyboardSubscription.remove();
  }, []);

  const passwordRules = useMemo<PasswordRule[]>(() => [
    { label: 'Must be at least 8 characters long', valid: password.length >= 8 },
    { label: 'Must contain at least 1 uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'Must contain at least 1 lowercase letter', valid: /[a-z]/.test(password) },
    { label: 'Must contain at least 1 digit', valid: /[0-9]/.test(password) },
  ], [password]);

  const canSubmit = fullName.trim().length > 0 && email.trim().length > 0 && passwordRules.every((rule) => rule.valid);
  const fullNameError = touched.fullName && fullName.trim().length > 0 && fullName.trim().length < 3
    ? 'Enter at least 3 characters.'
    : undefined;
  const emailError = touched.email && email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ? 'Please enter a valid email address.'
    : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityLabel="Go back">
            <Feather name="arrow-left" size={20} color={Colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Image source={require('../../../assets/images/fateful_moment_signup_logo_.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Create your Fateful Moment{'\n'}Account</Text>
          </View>

          <View style={styles.form}>
            <Input label="Full Name" showLabel={false} compact placeholder="Full Name" autoCapitalize="words" value={fullName} error={fullNameError} onChangeText={setFullName} onBlur={() => setTouched((current) => ({ ...current, fullName: true }))} />
            <Input label="Your email address" showLabel={false} compact placeholder="Your email address" keyboardType="email-address" autoCapitalize="none" value={email} error={emailError} onChangeText={setEmail} onBlur={() => setTouched((current) => ({ ...current, email: true }))} />
            <Input label="Your password" showLabel={false} compact placeholder="Your password" isPassword value={password} onChangeText={(value) => { setPasswordEdited(true); setPassword(value); }} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} />

            {passwordEdited && passwordFocused && (
              <View style={styles.rules}>
                {passwordRules.map((rule) => (
                  <View key={rule.label} style={styles.rule}>
                    <Feather name="check-circle" size={11} color={rule.valid ? Colors.primary : Colors.textMuted} />
                    <Text style={[styles.ruleText, rule.valid && styles.ruleTextValid]}>{rule.label}</Text>
                  </View>
                ))}
              </View>
            )}

            <Button
              title="Sign up"
              onPress={() => {
                if (canSubmit) router.replace('/home');
              }}
              variant="secondary"
              style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
              textStyle={styles.submitText}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace('/auth/sign-in')}>
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  keyboard: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: Layout.spacing.sm, paddingBottom: Layout.spacing.lg },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.secondary, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  header: { width: '100%', height: 234, alignItems: 'center', marginBottom: Layout.spacing.xl },
  logo: { width: 148, height: 148, borderRadius: 74, marginBottom: 12 },
  title: { width: '100%', height: 50, fontFamily: 'Inter_700Bold', fontSize: 20, lineHeight: 25, letterSpacing: 0, color: '#FFFFFF', textAlign: 'center' },
  form: { gap: 5},
  rules: { marginTop: -4, marginBottom: Layout.spacing.md, gap: 3 },
  rule: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ruleText: { fontFamily: 'Inter_300Light', fontSize: 11, lineHeight: 16, color: '#62748E' },
  ruleTextValid: { color: Colors.text },
  submitButton: { height: 56, borderRadius: 16, marginTop: 32, backgroundColor: 'rgba(0, 211, 243, 0.14)', borderWidth: 1, borderColor: 'rgba(0, 211, 243, 0.48)', borderTopWidth: 1, borderTopColor: 'rgba(0, 211, 243, 0.48)' },
  submitButtonDisabled: { opacity: 0.55 },
  submitText: { color: Colors.primary, fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24, opacity: 1, zIndex: 2 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 48, paddingTop: 0 },
  footerText: { ...Typography.bodyText, fontSize: 14, lineHeight: 20 },
  footerLink: { ...Typography.bodyText, fontSize: 14, lineHeight: 20, color: Colors.primary, textDecorationLine: 'underline' },
});
