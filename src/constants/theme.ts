import { Platform, TextStyle, ViewStyle } from 'react-native';

export const Colors = {
  primary: '#00D3F3',
  secondary: '#0F172A',
  accent: '#FB2C36',
  background: '#020617',
  border: '#1D293D',
  text: '#F1F5F9',
  textMuted: '#90A1B9',
};

export const Typography = {
  displayLarge: {
    fontFamily: 'Inter_900Black',
    fontStyle: 'italic',
    fontSize: 60,
    lineHeight: 60,
    letterSpacing: -2.74,
    textTransform: 'uppercase',
    color: Colors.text,
  } as TextStyle,
  
  heading1: {
    fontFamily: 'Inter_900Black',
    fontStyle: 'italic',
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -1.43,
    textTransform: 'uppercase',
    color: Colors.text,
  } as TextStyle,
  
  hudMono: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.text,
  } as TextStyle,
  
  bodyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: -0.31,
    color: Colors.textMuted,
  } as TextStyle,
};

export const Layout = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  }
};
