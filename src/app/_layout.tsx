import { useEffect } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_300Light,
  Inter_500Medium,
  Inter_700Bold, 
  Inter_900Black,
  Inter_900Black_Italic,
} from '@expo-google-fonts/inter';
import { Colors } from '../constants/theme';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationBar } from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync(Colors.background);

export default function RootLayout() {
  const segments = useSegments();
  const isScenario = segments[0] === 'scenario';
  const isAppFlow = segments[0] === 'home' || isScenario;
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
    Inter_900Black,
    Inter_900Black_Italic,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      try {
        NavigationBar.setStyle('light');
        NavigationBar.setHidden(isScenario);
      } catch (err) { console.warn('Failed to set NavigationBar style:', err); }
    }
  }, [isScenario]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {Platform.OS === 'android' && (
        <NavigationBar style="light" hidden={isScenario} />
      )}
      <StatusBar
        hidden={isAppFlow || Platform.OS === 'ios'}
        style="light"
      />
      <Stack
        screenOptions={{
          headerShown: false,
          navigationBarHidden: isScenario,
          navigationBarColor: Colors.background,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.text,
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: Colors.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false, orientation: 'portrait' }} />
        <Stack.Screen name="auth/sign-in" options={{ headerShown: false, orientation: 'portrait' }} />
        <Stack.Screen name="auth/sign-up" options={{ headerShown: false, orientation: 'portrait' }} />
        <Stack.Screen name="auth/reset-password" options={{ headerShown: false, orientation: 'portrait' }} />
        <Stack.Screen name="auth/check-email" options={{ headerShown: false, orientation: 'portrait' }} />
        <Stack.Screen name="home" options={{ headerShown: false, orientation: 'landscape' }} />
        <Stack.Screen name="scenario/[id]" options={{ headerShown: false, orientation: 'landscape' }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
