import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {STYLES} from '../config/styles';
import {COLORS} from '../config';

export enum GradientButtonMode {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  GRAY = 'GRAY',
  RED = 'RED',
  GREEN = 'GREEN',
}

type Props = {
  onPress?: () => void;
  content: string;
  iconName?: string;
  mode?: GradientButtonMode;
  customStyles?: any;
  customContainerStyles?: any;
};

const GradientButton = ({
  onPress,
  content,
  iconName,
  mode = GradientButtonMode.PRIMARY,
  customStyles,
  customContainerStyles,
}: Props) => {
  return (
    <TouchableOpacity
      style={{...styles.btnContainer, ...customContainerStyles}}
      onPress={onPress}>
      {mode === GradientButtonMode.RED && (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.75, y: 0}}
          colors={[COLORS.red[1], COLORS.red[0]]}
          style={{...styles.gradientBtn, ...customStyles}}>
          {iconName && <FontAwesome5 name={iconName} size={16} color="white" />}
          <Text style={STYLES.text.WorkSansBase}>{content}</Text>
        </LinearGradient>
      )}
      {mode === GradientButtonMode.GREEN && (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.75, y: 0}}
          colors={[COLORS.green[0], COLORS.green[1]]}
          style={{...styles.gradientBtn, ...customStyles}}>
          {iconName && <FontAwesome5 name={iconName} size={16} color="white" />}
          <Text style={STYLES.text.WorkSansBase}>{content}</Text>
        </LinearGradient>
      )}
      {mode === GradientButtonMode.GRAY && (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.75, y: 0}}
          colors={[COLORS.gray[0], COLORS.gray[1]]}
          style={{...styles.gradientBtn, ...customStyles}}>
          {iconName && <FontAwesome5 name={iconName} size={16} color="white" />}
          <Text style={STYLES.text.WorkSansBase}>{content}</Text>
        </LinearGradient>
      )}
      {mode === GradientButtonMode.PRIMARY && (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.75, y: 0}}
          colors={[COLORS.gradient[0], COLORS.gradient[1]]}
          style={styles.gradientBtn}>
          {iconName && <FontAwesome5 name={iconName} size={16} color="white" />}
          <Text style={STYLES.text.WorkSansBase}>{content}</Text>
        </LinearGradient>
      )}
      {mode === GradientButtonMode.SECONDARY && (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.75, y: 0}}
          colors={[COLORS.red[0], COLORS.yellow[1]]}
          style={styles.gradientBtn}>
          {iconName && (
            <FontAwesome5
              name={iconName}
              size={16}
              color={COLORS.background.primary}
            />
          )}
          <Text
            style={{
              ...STYLES.text.WorkSansBase,
              color: COLORS.background.primary,
            }}>
            {content}
          </Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: 140,
  },
  gradientBtn: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
});
