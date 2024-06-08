import {StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../config';
import {STYLES} from '../config/styles';

type Props = {
  value: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  placeholder?: string;
};

const PriceInput = (props: Props) => {
  const [isFocused, setFocus] = useState(false);
  return (
    <TextInput
      value={props.value}
      onChangeText={props.onChangeText}
      style={{
        ...styles.textInput,
        borderColor: isFocused ? COLORS.yellow[0] : COLORS.background.secondary,
      }}
      placeholder={props?.placeholder}
      placeholderTextColor={COLORS.text.caption}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      inputMode="numeric"
    />
  );
};

export default PriceInput;

const styles = StyleSheet.create({
  textInput: {
    ...STYLES.text.WorkSansBase,
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.gray[0],
    borderRadius: 14,
    borderWidth: 2,
    color: COLORS.text.primary,
  },
});
