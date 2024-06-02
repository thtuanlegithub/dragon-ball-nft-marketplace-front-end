import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {STYLES} from '../config/styles';
import {COLORS} from '../config';

export enum ControlButtonMode {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

export type ControlButtonProps = {
  content: string;
  mode?: ControlButtonMode;
  onPress: () => void;
};

const ControlButton = ({content, mode, onPress}: ControlButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        borderWidth: mode === ControlButtonMode.PRIMARY ? 0 : 2,
        borderColor: COLORS.callToAction,
        backgroundColor:
          mode === ControlButtonMode.PRIMARY
            ? COLORS.callToAction
            : COLORS.background.secondary,
      }}>
      <Text
        style={{
          ...STYLES.text.WorkSansBase,
        }}>
        {content}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.callToAction,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 30,
    width: '100%',
  },
});

export default ControlButton;
