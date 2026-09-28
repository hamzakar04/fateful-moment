import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
  },
  mainTitle: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: '800',
    fontStyle: 'italic',
    letterSpacing: -0.5,
  },
  subTitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  counterBadge: {
    color: Colors.primary,
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '600',
    marginTop: 6,
  },
  listContent: {
    gap: 16,
    paddingRight: 24,
    alignItems: 'center',
  },
});
