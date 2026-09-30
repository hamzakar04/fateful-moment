export interface ScenarioItem {
  id: string;
  duration: string;
  title: string;
  description: string;
  imageSource?: ReturnType<typeof require>;
  videoSource?: ReturnType<typeof require>;
}

export const MOCK_USER = {
  email: 'johndoe@gmail.com',
  password: 'Johndoe123',
};

export const MOCK_SCENARIOS: ScenarioItem[] = [
  {
    id: 'iraq-war-1',
    duration: '1:37 min',
    title: 'Iraq War',
    description: '2003. The Chemical Weapon Allegations Are On Your Desk. Your Decision Will Determine The Fate Of Millions.',
    imageSource: require('../../assets/images/whitehouse_card.png'),
    videoSource: require('../../assets/videos/scenarios_background_video.mp4'),
  },
  {
    id: 'cuban-crisis-1',
    duration: '1:25 min',
    title: 'Cuban Missile Crisis (1962)',
    description: "A World On The Brink Of Nuclear Annihilation. You Are In Kennedy's Seat.",
    imageSource: require('../../assets/images/whitehouse_card.png'),
    videoSource: require('../../assets/videos/scenarios_background_video.mp4'),
  },
  {
    id: 'iraq-war-2',
    duration: '1:37 min',
    title: 'Iraq War',
    description: '2003. The Chemical Weapon Allegations Are On Your Desk. Your Decision Will Determine The Fate Of Millions.',
    imageSource: require('../../assets/images/whitehouse_card.png'),
    videoSource: require('../../assets/videos/scenarios_background_video.mp4'),
  },
  {
    id: 'cuban-crisis-2',
    duration: '1:25 min',
    title: 'Cuban Missile Crisis (1962)',
    description: "A World On The Brink Of Nuclear Annihilation. You Are In Kennedy's Seat.",
    imageSource: require('../../assets/images/whitehouse_card.png'),
    videoSource: require('../../assets/videos/scenarios_background_video.mp4'),
  },
  {
    id: 'iraq-war-3',
    duration: '1:37 min',
    title: 'Iraq War',
    description: '2003. The Chemical Weapon Allegations Are On Your Desk. Your Decision Will Determine The Fate Of Millions.',
    imageSource: require('../../assets/images/whitehouse_card.png'),
    videoSource: require('../../assets/videos/scenarios_background_video.mp4'),
  },
  {
    id: 'cuban-crisis-3',
    duration: '1:25 min',
    title: 'Cuban Missile Crisis (1962)',
    description: "A World On The Brink Of Nuclear Annihilation. You Are In Kennedy's Seat.",
    imageSource: require('../../assets/images/whitehouse_card.png'),
    videoSource: require('../../assets/videos/scenarios_background_video.mp4'),
  },
];
