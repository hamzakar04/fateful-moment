export interface ScenarioItem {
  id: string;
  duration: string;
  title: string;
  description: string;
  imageSource?: ReturnType<typeof require>;
}

export const MOCK_SCENARIOS: ScenarioItem[] = [
  {
    id: 'iraq-war-1',
    duration: '1:37 min',
    title: 'Iraq War',
    description: '2003. The chemical weapon allegations are on your desk. Your decision will determine the fate of millions.',
    imageSource: require('../../assets/images/whitehouse.png'),
  },
  {
    id: 'cuban-crisis',
    duration: '1:25 min',
    title: 'Cuban Missile Crisis (1962)',
    description: "A world on the brink of nuclear annihilation. You are in Kennedy's seat. What will you do?",
    imageSource: require('../../assets/images/whitehouse.png'),
  },
  {
    id: 'iraq-war-2',
    duration: '1:37 min',
    title: 'Iraq War',
    description: '2003. The chemical weapon allegations are on your desk. Your decision will determine the fate of millions.',
    imageSource: require('../../assets/images/whitehouse.png'),
  },
  {
    id: 'cuban-crisis-2',
    duration: '1:25 min',
    title: 'Cuban Missile Crisis (1962)',
    description: "A world on the brink of nuclear annihilation. You are in Kennedy's seat. What will you do?",
    imageSource: require('../../assets/images/whitehouse.png'),
  },
];
