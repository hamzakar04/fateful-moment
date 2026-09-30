import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OptionCard } from '../cards/OptionCard';

interface OptionsViewProps {
  selected: string;
  highlightedOption: string | null;
  optionsStage: 'initial' | 'afterDecisionOne';
  onChooseOption: (index: number) => void;
  options: string[];
}

function getOptionState(index: number, selected: string, highlightedOption: string | null, optionsStage: 'initial' | 'afterDecisionOne') {
  const isFirstChoice = selected === String(index);
  const isSecondChoice = highlightedOption === String(index);
  const hasSecondChoice = highlightedOption !== null;
  const isPassive = optionsStage === 'afterDecisionOne' && hasSecondChoice && isFirstChoice;
  const isSelected = optionsStage === 'afterDecisionOne'
    ? (hasSecondChoice ? isSecondChoice : isFirstChoice)
    : isFirstChoice;
  return { isSelected, isPassive };
}

export function OptionsView({ selected, highlightedOption, optionsStage, onChooseOption, options }: OptionsViewProps) {
  return (
    <View style={styles.optionsContainer}>
      {optionsStage === 'afterDecisionOne' && (
        <View style={styles.yourChoiceBadge}>
          <Text style={styles.yourChoiceText}>Your Choice</Text>
        </View>
      )}

      <View style={styles.optionsRow}>
        {[0, 1].map((index) => {
          const option = options[index];
          const { isSelected, isPassive } = getOptionState(index, selected, highlightedOption, optionsStage);
          return (
            <OptionCard
              key={`${option}-${index}`}
              text={option}
              selected={isSelected}
              passive={isPassive}
              textAlign={index === 0 ? 'left' : 'center'}
              onPress={() => onChooseOption(index)}
            />
          );
        })}
      </View>

      <View style={styles.optionsRow}>
        {[2, 3].map((index) => {
          const option = options[index];
          const { isSelected, isPassive } = getOptionState(index, selected, highlightedOption, optionsStage);
          return (
            <OptionCard
              key={`${option}-${index}`}
              text={option}
              selected={isSelected}
              passive={isPassive}
              textAlign={index === 2 ? 'left' : 'center'}
              onPress={() => onChooseOption(index)}
            />
          );
        })}
      </View>

      <View style={styles.optionsRowCenter}>
        {[4].map((index) => {
          const option = options[index];
          const { isSelected, isPassive } = getOptionState(index, selected, highlightedOption, optionsStage);
          return (
            <OptionCard
              key={`${option}-${index}`}
              text={option}
              selected={isSelected}
              passive={isPassive}
              textAlign="center"
              onPress={() => onChooseOption(index)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    width: 702,
    height: 222,
    flexDirection: 'column',
    gap: 12,
    position: 'relative',
    transform: [{ translateX: 11 }],
  },
  optionsRow: {
    width: 702,
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionsRowCenter: {
    width: 702,
    height: 66,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  yourChoiceBadge: {
    position: 'absolute',
    top: -16,
    left: 476.5,
    width: 106,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD230',
    borderWidth: 1,
    borderColor: '#FFB900',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 10,
    opacity: 1,
  },
  yourChoiceText: { color: '#FFFFFF', fontFamily: 'Inter_700Bold', fontSize: 12, lineHeight: 16, textAlign: 'center' },
});
