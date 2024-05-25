import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../config';
import {STYLES} from '../../config/styles';

const DiscoverScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={STYLES.text.WorkSansH4}>DiscoverScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
});

export default DiscoverScreen;
