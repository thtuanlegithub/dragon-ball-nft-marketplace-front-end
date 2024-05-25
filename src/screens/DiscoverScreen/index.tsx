import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {COLORS} from '../../config';
import {STYLES} from '../../config/styles';
import NFTItem from '../../components/NFTItem';

const ListNFT = [
  {
    id: 'NFT-001',
    title: 'Kakarot Super Saiyan 4',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/1.png'),
  },
  {
    id: 'NFT-002',
    title: 'Goku kid',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/2.png'),
  },
  {
    id: 'NFT-003',
    title: 'Trunks kid',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/3.png'),
  },
  {
    id: 'NFT-004',
    title: 'Goku Super Saiyan 3',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/4.png'),
  },
  {
    id: 'NFT-005',
    title: 'Vegito Super Saiyan',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/5.png'),
  },
  {
    id: 'NFT-006',
    title: 'Goku Super Saiyan 2',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/6.png'),
  },
  {
    id: 'NFT-007',
    title: 'Goku Super Saiyan 1',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/7.png'),
  },
  {
    id: 'NFT-008',
    title: 'Future Trunks',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/8.png'),
  },
  {
    id: 'NFT-009',
    title: 'Goku Super Saiyan 3',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/9.png'),
  },
  {
    id: 'NFT-010',
    title: 'Broly Super Saiyan White',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/10.png'),
  },
  {
    id: 'NFT-011',
    title: 'Cell Perfect Form',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/11.png'),
  },
  {
    id: 'NFT-012',
    title: 'Future Trunks Super Saiyan 1',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/12.png'),
  },
  {
    id: 'NFT-013',
    title: 'Gogeta',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/13.png'),
  },
  {
    id: 'NFT-014',
    title: 'Goku Ultra Instinct',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/14.png'),
  },
  {
    id: 'NFT-015',
    title: 'Freezer Final Form',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/15.png'),
  },
];

const DiscoverScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={{...STYLES.text.WorkSansH4, paddingHorizontal: 16}}>
            🔎 Discover
          </Text>
        }
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 70}} />}
        data={ListNFT}
        keyExtractor={item => item.id}
        renderItem={({item}) => <NFTItem {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    paddingVertical: 12,
  },
});

export default DiscoverScreen;
