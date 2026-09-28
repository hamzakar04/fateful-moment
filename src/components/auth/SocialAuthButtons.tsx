import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Button } from '../ui/Button';
import { Colors, Layout } from '../../constants/theme';

const emailIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.0006 6.99853L13.0305 12.6985C12.7218 12.892 12.3649 12.9945 12.0006 12.9945C11.6362 12.9945 11.2793 12.892 10.9706 12.6985L2.00055 6.99853M4.00055 3.99951H20.0006C21.1051 3.99951 22.0006 4.89494 22.0006 5.99951V17.9995C22.0006 19.1041 21.1051 19.9995 20.0006 19.9995H4.00055C2.89598 19.9995 2.00055 19.1041 2.00055 17.9995V5.99951C2.00055 4.89494 2.89598 3.99951 4.00055 3.99951Z" stroke="#00D3F3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const googleIcon = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9884 9.20153H19.25V9.1635H11V12.8285H16.1805C15.4247 14.962 13.3939 16.4935 11 16.4935C7.9626 16.4935 5.49998 14.032 5.49998 10.996C5.49998 7.96001 7.9626 5.4985 11 5.4985C12.402 5.4985 13.6776 6.02718 14.6488 6.89074L17.2416 4.29913C15.6044 2.77403 13.4145 1.8335 11 1.8335C5.93769 1.8335 1.83331 5.93601 1.83331 10.996C1.83331 16.056 5.93769 20.1585 11 20.1585C16.0623 20.1585 20.1666 16.056 20.1666 10.996C20.1666 10.3817 20.1034 9.78197 19.9884 9.20153Z" fill="#FFC107"/><path d="M2.88965 6.73131L5.90136 8.93902C6.71627 6.92235 8.68986 5.4985 10.9994 5.4985C12.4014 5.4985 13.677 6.02717 14.6482 6.89074L17.241 4.29913C15.6038 2.77403 13.4139 1.8335 10.9994 1.8335C7.47848 1.8335 4.42507 3.82039 2.88965 6.73131Z" fill="#FF3D00"/><path d="M11.0002 20.1583C13.3679 20.1583 15.5193 19.2526 17.146 17.7797L14.3089 15.38C13.3885 16.0769 12.2445 16.4933 11.0002 16.4933C8.61591 16.4933 6.59146 14.9737 5.82879 12.853L2.83954 15.1551C4.35662 18.1224 7.43754 20.1583 11.0002 20.1583Z" fill="#4CAF50"/><path d="M19.9884 9.20111H19.25V9.16309H11V12.8281H16.1805C15.8175 13.8529 15.158 14.7366 14.3073 15.3803L14.3087 15.3794L17.1458 17.779C16.945 17.9614 20.1667 15.5768 20.1667 10.9956C20.1667 10.3812 20.1034 9.78156 19.9884 9.20111Z" fill="#1976D2"/></svg>';

interface SocialAuthButtonsProps {
  onEmail: () => void;
  onApple: () => void;
  onGoogle: () => void;
}

export function SocialAuthButtons({ onEmail, onApple, onGoogle }: SocialAuthButtonsProps) {
  return (
    <View style={styles.container}>
      <Button title="Continue with Email" onPress={onEmail} variant="glass" icon={<SvgXml xml={emailIcon} width={24} height={24} />} />
      <View style={styles.divider}><View style={styles.line} /><Text style={styles.or}>OR</Text><View style={styles.line} /></View>
      <Button title="Continue with Apple" onPress={onApple} variant="secondary" style={styles.socialButton} icon={<Image source={require('../../../assets/images/apple_image.png')} style={styles.appleIcon} resizeMode="contain" />} />
      <Button title="Continue with Google" onPress={onGoogle} variant="secondary" style={styles.socialButton} icon={<SvgXml xml={googleIcon} width={22} height={22} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Layout.spacing.md },
  divider: { height: 20, flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md },
  line: { flex: 1, height: 1, backgroundColor: Colors.border },
  or: { color: Colors.textMuted, fontFamily: 'Inter_700Bold', fontSize: 16 },
  socialButton: { height: 56, borderRadius: 16, backgroundColor: Colors.secondary, borderTopWidth: 0 },
  appleIcon: { width: 22, height: 22 },
});
