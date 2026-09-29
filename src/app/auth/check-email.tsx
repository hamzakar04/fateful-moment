import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { Colors, Layout } from '../../constants/theme';
import { SuccessIcon } from '../../components/ui/SuccessIcon';
import { IPhoneChrome } from '../../components/system/IPhoneChrome';

export default function CheckEmailScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const submittedEmail = email || 'johndoe@mail.com';

  return (
    <SafeAreaView style={styles.container}>
      <IPhoneChrome />
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityLabel="Go back">
          <Feather name="arrow-left" size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        <View style={styles.confirmation}>
          <View style={styles.iconDisc}><SuccessIcon /></View>
          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.description}>
            We've sent password reset instructions to <Text style={styles.email}>{submittedEmail}</Text>
          </Text>
          <Button title="Back to Sign in" onPress={() => router.replace('/auth/sign-in')} variant="glass" style={styles.button} textStyle={styles.buttonText} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: Layout.spacing.sm },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.secondary, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center', transform: [{ translateY: 16 }] },
  confirmation: { width: '100%', height: 280, alignItems: 'center', marginTop: 94, paddingHorizontal: 12 },
  iconDisc: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(0, 211, 243, 0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  title: { width: 282, height: 32, fontFamily: 'Inter_700Bold', fontSize: 24, lineHeight: 32, letterSpacing: 0, color: '#FFFFFF', textAlign: 'center', marginBottom: 8 },
  description: { width: 282, fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24, color: Colors.textMuted, textAlign: 'center' },
  email: { fontFamily: 'Inter_700Bold', color: '#FFFFFF' },
  button: { width: '100%', marginTop: 28 },
  buttonText: { color: Colors.primary, fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24 },
});
