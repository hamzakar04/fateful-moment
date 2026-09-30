import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { EmailIcon } from '../../components/ui/EmailIcon';
import { Input } from '../../components/ui/Input';
import { Colors } from '../../constants/theme';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { isValidEmail } from '../../utils/validators';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const emailError = touched && email.trim().length > 0 && !isValidEmail(email)
    ? 'Please enter a valid email address.'
    : undefined;
  const canSubmit = email.trim().length > 0 && !emailError;

  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email to receive a reset link">
      <View style={styles.form}>
        <Input label="Your email address" showLabel={false} compact placeholder="Your email address" leadingIcon={<EmailIcon />} keyboardType="email-address" autoCapitalize="none" value={email} error={emailError} onChangeText={setEmail} onBlur={() => setTouched(true)} />
        <Button
          title="Send Reset Link"
          onPress={() => {
            if (canSubmit) router.push('/auth/check-email?email=' + encodeURIComponent(email.trim()));
          }}
          variant="glass"
          style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
          textStyle={styles.submitText}
        />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  form: { gap: 0 },
  submitButton: { marginTop: 16 },
  submitButtonDisabled: { opacity: 0.55 },
  submitText: { color: Colors.primary, fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24 },
});
