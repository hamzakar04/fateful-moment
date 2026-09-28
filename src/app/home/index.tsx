import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScenarioCard } from '../../components/cards/ScenarioCard';
import { NavigationBar } from '../../components/navigation/NavigationBar';
import { Colors } from '../../constants/theme';
import { MOCK_SCENARIOS } from '../../services/mockData';

export default function ScenariosScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <NavigationBar showTitle={false} showLeadingIcon={false} showTrailingIcon={false} />
      <View style={styles.content}>
        <Text style={styles.navTitle}>Scenarios</Text>
        <Text style={styles.subtitle}>
          Choose a scenario and ask yourself, "If you were in that situation, what would you do?"
        </Text>
        <Text style={styles.count}>30 Scenarios</Text>
        <FlatList
          horizontal
          data={MOCK_SCENARIOS}
          keyExtractor={(scenario) => scenario.id}
          renderItem={({ item, index }) => (
            <ScenarioCard
              {...item}
              active={index === 0}
              onStart={() => router.push('/scenario/' + item.id)}
            />
          )}
          contentContainerStyle={styles.list}
          style={styles.cardList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingTop: 16, paddingLeft: 66, paddingBottom: 32 },
  navTitle: { color: Colors.text, fontFamily: 'Inter_700Bold', fontSize: 16, lineHeight: 28 },
  subtitle: { color: Colors.primary, fontFamily: 'Inter_700Bold', fontSize: 12, lineHeight: 16, marginTop: 5, maxWidth: 630 },
  count: { color: Colors.textMuted, fontFamily: 'Inter_500Medium', fontSize: 12, lineHeight: 16, marginTop: 14 },
  cardList: { flexGrow: 0 },
  list: { gap: 16, paddingTop: 8, paddingRight: 66 },
});
