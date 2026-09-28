import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { EmailIcon } from '../../components/ui/EmailIcon';
import { Input } from '../../components/ui/Input';
import { Colors, Layout, Typography } from '../../constants/theme';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const emailError = touched && email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ? 'Please enter a valid email address.'
    : undefined;
  const canSubmit = email.trim().length > 0 && !emailError;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityLabel="Go back">
            <Feather name="arrow-left" size={20} color={Colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Image source={require('../../../assets/images/fateful_moment_signup_logo_.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Reset your password</Text>
            <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
          </View>

          <View style={styles.form}>
            <Input label="Your email address" showLabel={false} compact placeholder="Your email address" leadingIcon={<EmailIcon />} keyboardType="email-address" autoCapitalize="none" value={email} error={emailError} onChangeText={setEmail} onBlur={() => setTouched(true)} />
            <Button
              title="Sign In"
              onPress={() => {
                if (canSubmit) router.push('/auth/check-email?email=' + encodeURIComponent(email.trim()));
              }}
              variant="secondary"
              style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
              textStyle={styles.submitText}
            />
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
  title: { fontFamily: 'Inter_700Bold', fontSize: 20, lineHeight: 25, color: '#FFFFFF', textAlign: 'center' },
  subtitle: { ...Typography.bodyText, fontSize: 16, lineHeight: 20, color: Colors.textMuted, textAlign: 'center', marginTop: 8 },
  form: { gap: 0 },
  submitButton: { height: 56, borderRadius: 16, marginTop: 16, backgroundColor: 'rgba(0, 211, 243, 0.14)', borderWidth: 1, borderColor: 'rgba(0, 211, 243, 0.48)', borderTopWidth: 1, borderTopColor: 'rgba(0, 211, 243, 0.48)' },
  submitButtonDisabled: { opacity: 0.55 },
  submitText: { color: Colors.primary, fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24 },
});
