import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS} from '../config';
import {STYLES} from '../config/styles';

type CustomTextInputProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  style?: any;
  editable?: boolean;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
  onEndEditing?: () => void;
  onKeyPress?: () => void;
  placeholderTextColor?: string;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  blurOnSubmit?: boolean;
  clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always';
};

const CustomTextInput = (props: CustomTextInputProps) => {
  const [focus, setFocus] = React.useState(false);
  return (
    <TextInput
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
      placeholderTextColor={COLORS.text.placeHolder}
      style={{
        ...styles.container,
        ...STYLES.text.WorkSansBase,
        borderColor: focus ? COLORS.callToAction : 'transparent',
        borderWidth: focus ? 1.5 : 1,
        ...props.style,
        color: COLORS.text.primary,
      }}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
  },
});
