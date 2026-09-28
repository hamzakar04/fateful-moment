import React from 'react';
import { View, Text, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { ScenarioCard } from '../../components/cards/ScenarioCard';
import { MOCK_SCENARIOS, ScenarioItem } from '../../services/mockData';
import { styles } from './ScenariosScreen.styles';

interface ScenariosScreenProps {
  onSelectScenario: (scenario: ScenarioItem) => void;
}

export const ScenariosScreen: React.FC<ScenariosScreenProps> = ({ onSelectScenario }) => {
  const renderItem = ({ item }: { item: ScenarioItem }) => (
    <ScenarioCard
      duration={item.duration}
      title={item.title}
      description={item.description}
      onStart={() => onSelectScenario(item)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>Scenarios</Text>
          <Text style={styles.subTitle}>
            Choose A Scenario And Ask Yourself, "If You Were In That Situation, What Would You Do?"
          </Text>
          <Text style={styles.counterBadge}>30 Scenarios</Text>
        </View>

        <FlatList
          horizontal
          data={MOCK_SCENARIOS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
