import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../config';
import {STYLES} from '../../config/styles';

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={STYLES.text.SpaceMonoH4}>WalletScreen</Text>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
