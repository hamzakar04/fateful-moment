import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Typography, Layout } from '../../constants/theme';
import { Button } from '../../components/ui/Button';

export default function ResultScreen() {
  const router = useRouter();

  const handleReturn = () => {
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={Typography.hudMono}>KARAR DNASI</Text>
        <Text style={[Typography.displayLarge, styles.title]}>BRAVE VISIONARY</Text>
        
        <View style={styles.radarPlaceholder}>
          <Text style={styles.radarText}>[Radar Chart Placeholder]</Text>
        </View>
        
        <Text style={Typography.bodyText}>
          Cesur adımlar attın ancak bazı diplomatik fırsatları kaçırdın.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button 
          title="Ana Sayfaya Dön" 
          onPress={handleReturn}
          variant="secondary"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Layout.spacing.lg,
  },
  title: {
    textAlign: 'center',
  },
  radarPlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Layout.spacing.xl,
  },
  radarText: {
    color: Colors.textMuted,
  },
  footer: {
    padding: Layout.spacing.xl,
    paddingBottom: Layout.spacing.xxl,
  }
});
