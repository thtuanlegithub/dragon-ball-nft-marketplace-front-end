import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {STYLES} from '../../config/styles';
import {COLORS} from '../../config';
import NFTItem from '../../components/NFTItem';
import Button from '../../components/Button';

const HomeScreen = () => {
  const hottestItem = {
    id: 'NFT-29',
    title: 'Goku',
    price: '100',
    highestBid: '200',
    imageSource: require('../../assets/images/29.png'),
  };
  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.background.primary,
      }}>
      <View style={styles.container}>
        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.title}>Find favorite character</Text>
          <Text style={styles.subTitle} ellipsizeMode="tail">
            Delve into our marketplace powered by Dragon Ball enthusiasts.
            Purchase, sell, and uncover artwork from NFT artists, showcasing
            beloved Dragon Ball characters.
          </Text>
        </View>
        <NFTItem {...hottestItem} />
        <Button content="Get Started" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background.primary,
    paddingTop: 24,
    gap: 14,
  },
  title: {
    ...STYLES.text.WorkSansH4,
  },
  subTitle: {
    ...STYLES.text.WorkSansBase,
    marginTop: 16,
  },
});

export default HomeScreen;
