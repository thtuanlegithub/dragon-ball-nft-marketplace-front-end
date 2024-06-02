import {View} from 'react-native';
import React from 'react';
import {COLORS} from '../config';

const StackNavigatorHeaderBackground = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.background.primary,
        flex: 1,
      }}
    />
  );
};

export default StackNavigatorHeaderBackground;
