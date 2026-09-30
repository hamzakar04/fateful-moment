import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScenarioCard } from '../../components/cards/ScenarioCard';
import { NavigationBar } from '../../components/navigation/NavigationBar';
import { MOCK_SCENARIOS } from '../../services/mockData';

const VIEWABILITY_CONFIG = {
  itemVisiblePercentThreshold: 50,
  minimumViewTime: 50,
};

export default function ScenariosScreen() {
  const router = useRouter();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const selectionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ekranda odaklanan ve videosu oynatılan ilk 2-3 kart
  const [visibleIds, setVisibleIds] = useState<string[]>([
    MOCK_SCENARIOS[0].id,
    MOCK_SCENARIOS[1].id,
    MOCK_SCENARIOS[2].id,
  ]);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const ids = viewableItems
        .filter((v) => v.isViewable)
        .map((v) => String(v.key));
      // Ekranda tam görünen ilk 2-3 kartın videosunu başlat, diğerlerini poster moduna al
      setVisibleIds(ids.slice(0, 3));
    },
    []
  );

  useEffect(() => () => {
    if (selectionTimer.current) {
      clearTimeout(selectionTimer.current);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <NavigationBar showTitle={false} showLeadingIcon={false} showTrailingIcon={false} />
      <View style={styles.content}>
        <Text style={styles.navTitle}>Scenarios</Text>
        <Text style={styles.subtitle}>
          Choose a scenario and ask yourself, &quot;If you were in that situation, what would you do?&quot;
        </Text>
        <Text style={styles.count}>30 Scenarios</Text>
        <FlatList
          horizontal
          data={MOCK_SCENARIOS}
          keyExtractor={(scenario) => scenario.id}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={5}
          renderItem={({ item }) => (
            <ScenarioCard
              {...item}
              active={selectedScenarioId === null || selectedScenarioId === item.id}
              isVisible={visibleIds.includes(item.id)}
              onStart={() => {
                if (selectedScenarioId !== null) {
                  return;
                }

                setSelectedScenarioId(item.id);
                selectionTimer.current = setTimeout(() => {
                  router.push('/scenario/' + item.id);
                  selectionTimer.current = setTimeout(() => {
                    setSelectedScenarioId(null);
                    selectionTimer.current = null;
                  }, 500);
                }, 2000);
              }}
            />
          )}
          viewabilityConfig={VIEWABILITY_CONFIG}
          onViewableItemsChanged={onViewableItemsChanged}
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
  container: { flex: 1, backgroundColor: '#020618' },
  content: { paddingTop: 16, paddingLeft: 66, paddingBottom: 24 },
  navTitle: {
    color: '#E2E8F0',
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    lineHeight: 20,
    textTransform: 'capitalize',
  },
  subtitle: {
    color: '#00D3F3',
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 13,
    maxWidth: 630,
    textTransform: 'capitalize',
  },
  count: {
    color: '#62748E',
    fontFamily: 'Inter_900Black',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 14,
    textTransform: 'capitalize',
  },
  cardList: { flexGrow: 0 },
  list: { gap: 16, paddingTop: 8, paddingRight: 66 },
});
