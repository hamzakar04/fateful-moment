import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Colors, Layout, Typography } from '../../constants/theme';

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
            <Input label="Your email address" showLabel={false} compact placeholder="Your email address" keyboardType="email-address" autoCapitalize="none" value={email} error={emailError} onChangeText={setEmail} onBlur={() => setEmailTouched(true)} />
            <Input label="Your password" showLabel={false} compact placeholder="Your password" isPassword value={password} onChangeText={setPassword} />

            <Button
              title="Sign In"
              onPress={() => {
                if (canSubmit) router.replace('/home');
              }}
              variant="secondary"
              style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
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
  container: { flex: 1, backgroundColor: Colors.background },
  keyboard: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: Layout.spacing.sm, paddingBottom: Layout.spacing.lg },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.secondary, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  header: { width: '100%', height: 241, alignItems: 'center', marginBottom: Layout.spacing.xl },
  logo: { width: 148, height: 148, borderRadius: 74, marginBottom: 12 },
  title: { width: 327, height: 25, fontFamily: 'Inter_700Bold', fontSize: 20, lineHeight: 25, letterSpacing: 0, color: '#FFFFFF', textAlign: 'center' },
  subtitle: { fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24, letterSpacing: 0, color: Colors.textMuted, textAlign: 'center', marginTop: 8 },
  form: { gap: 0 },
  submitButton: { height: 56, borderRadius: 16, marginTop: 16, backgroundColor: 'rgba(0, 211, 243, 0.14)', borderWidth: 1, borderColor: 'rgba(0, 211, 243, 0.48)', borderTopWidth: 1, borderTopColor: 'rgba(0, 211, 243, 0.48)' },
  submitButtonDisabled: { opacity: 0.55 },
  submitText: { color: Colors.primary, fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24 },
  forgotButton: { width: '100%', height: 24, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  forgotText: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 20, color: Colors.primary },
  footer: { width: '100%', height: 24, flexDirection: 'row', justifyContent: 'center', marginTop: 48 },
  footerText: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 20, color: Colors.textMuted },
  footerLink: { fontFamily: 'Inter_700Bold', fontSize: 14, lineHeight: 20, color: Colors.primary, textDecorationLine: 'underline' },
});
