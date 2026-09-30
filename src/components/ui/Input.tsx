import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Colors, Layout } from '../../constants/theme';
import { Feather } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
  showLabel?: boolean;
  compact?: boolean;
  leadingIcon?: React.ReactNode;
}

export function Input({ label, error, isPassword, showLabel = true, compact = false, leadingIcon, style, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { onFocus, onBlur, ...textInputProps } = props;

  return (
    <View style={[styles.container, compact && styles.compactWrapper, style]}>
      {showLabel && <Text style={styles.label}>{label}</Text>}

      <View style={[
        styles.inputContainer,
        compact && styles.compactInputContainer,
        typeof props.value === 'string' && props.value.length > 0 && styles.inputContainerFilled,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError
      ]}>
        {leadingIcon}
        <TextInput
          style={[styles.input, leadingIcon ? styles.inputWithLeading : undefined]}
          placeholderTextColor={Colors.textMuted}
          selectionColor={Colors.primary}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...textInputProps}
        />
        
        {isPassword && (typeof props.value !== 'string' || props.value.length > 0) && (
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Feather 
              name={isPasswordVisible ? "eye-off" : "eye"} 
              size={20} 
              color={Colors.textMuted} 
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.md,
  },
  label: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: Colors.text,
    marginBottom: Layout.spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  compactInputContainer: {
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
  },
  compactWrapper: {
    marginBottom: 16,
  },
  inputContainerFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.secondary,
  },
  inputContainerFilled: {
    borderColor: Colors.primary,
  },
  inputContainerError: {
    borderColor: '#E53A3A',
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.text,
    height: '100%',
  },
  inputWithLeading: {
    marginLeft: 8,
  },
  eyeIcon: {
    padding: 4,
    marginLeft: 8,
  },
  errorText: {
    fontFamily: 'Inter_300Light',
    fontSize: 11,
    lineHeight: 16,
    color: '#E53A3A',
    marginTop: 4,
  }
});
