import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

import {COLORS} from '../../config';
import {STYLES} from '../../config/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/profile_test.png')}
      />
      <TouchableOpacity style={styles.btnContainer}>
        <Text style={STYLES.text.WorkSansBase}>Selling NFT</Text>
        <FontAwesome5
          opacity={0.7}
          name="chevron-right"
          size={16}
          color={COLORS.text.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  btnContainer: {
    backgroundColor: COLORS.background.secondary,
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
