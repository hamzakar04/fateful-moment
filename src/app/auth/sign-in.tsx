import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { isValidEmail } from '../../utils/validators';
import { Colors, Layout } from '../../constants/theme';

import { MOCK_USER } from '../../services/mockData';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

  const emailError = emailTouched && email.trim().length > 0 && !isValidEmail(email)
    ? 'Please enter a valid email address.'
    : undefined;
  const canSubmit = email.trim().length > 0 && password.length > 0 && !emailError;

  const handleSignIn = () => {
    if (!canSubmit) return;

    const normalizedEmail = email.trim().toLowerCase();
    const isMockEmail = normalizedEmail === MOCK_USER.email.toLowerCase() || normalizedEmail === 'johndoe@mail.com';

    if (isMockEmail) {
      if (password !== MOCK_USER.password) {
        setPasswordError('Your password is wrong. Please try again.');
        return;
      }
    } else if (password !== MOCK_USER.password) {
      setPasswordError('Your password is wrong. Please try again.');
      return;
    }

    setPasswordError(undefined);
    router.replace('/home');
  };

  return (
    <AuthLayout title="Welcome to Fateful Moment" subtitle="Sign in with Email">
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
          onChangeText={(text) => {
            setEmail(text);
            if (passwordError) setPasswordError(undefined);
          }}
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
          error={passwordError}
          onChangeText={(text) => {
            setPassword(text);
            if (passwordError) setPasswordError(undefined);
          }}
        />

        <Button
          title="Sign In"
          onPress={handleSignIn}
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
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: Colors.textMuted,
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
    color: Colors.primary,
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
    color: Colors.primary,
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
    color: Colors.textMuted,
  },
  footerLink: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});
