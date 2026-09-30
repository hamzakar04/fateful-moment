import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Colors, Layout, Typography } from '../../constants/theme';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { MOCK_USER } from '../../services/mockData';
import { isValidEmail } from '../../utils/validators';

const checkCircleXml = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99992 1.3335C4.32659 1.3335 1.33325 4.32683 1.33325 8.00016C1.33325 11.6735 4.32659 14.6668 7.99992 14.6668C11.6733 14.6668 14.6666 11.6735 14.6666 8.00016C14.6666 4.32683 11.6733 1.3335 7.99992 1.3335ZM11.1866 6.46683L7.40658 10.2468C7.31325 10.3402 7.18658 10.3935 7.05325 10.3935C6.91992 10.3935 6.79325 10.3402 6.69992 10.2468L4.81325 8.36016C4.61992 8.16683 4.61992 7.84683 4.81325 7.6535C5.00658 7.46016 5.32658 7.46016 5.51992 7.6535L7.05325 9.18683L10.4799 5.76016C10.6733 5.56683 10.9933 5.56683 11.1866 5.76016C11.3799 5.9535 11.3799 6.26683 11.1866 6.46683Z" fill="#00D3F3"/></svg>';
const uncheckCircleXml = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99992 1.3335C4.32659 1.3335 1.33325 4.32683 1.33325 8.00016C1.33325 11.6735 4.32659 14.6668 7.99992 14.6668C11.6733 14.6668 14.6666 11.6735 14.6666 8.00016C14.6666 4.32683 11.6733 1.3335 7.99992 1.3335ZM11.1866 6.46683L7.40658 10.2468C7.31325 10.3402 7.18658 10.3935 7.05325 10.3935C6.91992 10.3935 6.79325 10.3402 6.69992 10.2468L4.81325 8.36016C4.61992 8.16683 4.61992 7.84683 4.81325 7.6535C5.00658 7.46016 5.32658 7.46016 5.51992 7.6535L7.05325 9.18683L10.4799 5.76016C10.6733 5.56683 10.9933 5.56683 11.1866 5.76016C11.3799 5.9535 11.3799 6.26683 11.1866 6.46683Z" fill="#90A1B9"/></svg>';

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
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
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

  const fullNameLength = fullName.trim().replace(/\s/g, '').length;
  const canSubmit = fullNameLength >= 3 && email.trim().length > 0 && passwordRules.every((rule) => rule.valid);
  const fullNameError = touched.fullName && fullName.trim().length > 0 && fullNameLength < 3
    ? 'Enter at least 3 characters.'
    : undefined;
  const emailError = touched.email && email.trim().length > 0 && !isValidEmail(email)
    ? 'Please enter a valid email address.'
    : undefined;

  return (
    <AuthLayout title={<>Create your Fateful Moment{'\n'}Account</>}>
      <View style={styles.form}>
        <Input label="Full Name" showLabel={false} compact placeholder="Full Name" autoCapitalize="words" value={fullName} error={fullNameError} onChangeText={setFullName} onBlur={() => setTouched((current) => ({ ...current, fullName: true }))} />
        <Input label="Your email address" showLabel={false} compact placeholder="Your email address" keyboardType="email-address" autoCapitalize="none" value={email} error={emailError} onChangeText={setEmail} onBlur={() => setTouched((current) => ({ ...current, email: true }))} />
        <Input
          label="Your password"
          showLabel={false}
          compact
          placeholder="Your password"
          isPassword
          value={password}
          error={passwordError}
          onChangeText={(value) => {
            setPasswordEdited(true);
            setPassword(value);
            if (passwordError) setPasswordError(undefined);
          }}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />

        {passwordEdited && passwordFocused && (
          <View style={styles.rules}>
            {passwordRules.map((rule) => (
              <View key={rule.label} style={styles.rule}>
                <SvgXml xml={rule.valid ? checkCircleXml : uncheckCircleXml} width={16} height={16} />
                <Text style={[styles.ruleText, rule.valid && styles.ruleTextValid]}>{rule.label}</Text>
              </View>
            ))}
          </View>
        )}

        <Button
          title="Sign up"
          onPress={() => {
            if (!canSubmit) return;
            const normalizedEmail = email.trim().toLowerCase();
            const isMockEmail = normalizedEmail === MOCK_USER.email.toLowerCase() || normalizedEmail === 'johndoe@mail.com';
            if (isMockEmail && password !== MOCK_USER.password) {
              setPasswordError('Your password is wrong. Please try again.');
              return;
            }
            setPasswordError(undefined);
            router.replace('/home');
          }}
          variant="glass"
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
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  form: { gap: 5},
  rules: { marginTop: -4, marginBottom: Layout.spacing.md, gap: 3 },
  rule: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ruleText: { fontFamily: 'Inter_300Light', fontSize: 11, lineHeight: 16, color: '#62748E' },
  ruleTextValid: { color: Colors.text },
  submitButton: { marginTop: 32 },
  submitButtonDisabled: { opacity: 0.55 },
  submitText: { color: Colors.primary, fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24, opacity: 1, zIndex: 2 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 48, paddingTop: 0 },
  footerText: { ...Typography.bodyText, fontSize: 14, lineHeight: 20 },
  footerLink: { ...Typography.bodyText, fontSize: 14, lineHeight: 20, color: Colors.primary, textDecorationLine: 'underline' },
});
