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
    ownerName: 'John Does',
    ownerProfileImg: require('../../assets/images/profile_1.png'),
    isSelling: true,
  },
  {
    id: 'NFT-002',
    title: 'Goku kid',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/2.png'),
    ownerName: 'David Doe',
    ownerProfileImg: require('../../assets/images/profile_2.png'),
    isSelling: false,
  },
  {
    id: 'NFT-003',
    title: 'Trunks kid',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/3.png'),
    ownerName: 'Sara Lee',
    ownerProfileImg: require('../../assets/images/profile_3.png'),
    isSelling: true,
  },
  {
    id: 'NFT-004',
    title: 'Goku Super Saiyan 3',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/4.png'),
    ownerName: 'Marry Jane',
    isSelling: false,
  },
  {
    id: 'NFT-005',
    title: 'Vegito Super Saiyan',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/5.png'),
    ownerName: 'John Doe',
    isSelling: true,
  },
  {
    id: 'NFT-006',
    title: 'Goku Super Saiyan 2',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/6.png'),
    isSelling: false,
  },
  {
    id: 'NFT-007',
    title: 'Goku Super Saiyan 1',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/7.png'),
    isSelling: true,
  },
  {
    id: 'NFT-008',
    title: 'Future Trunks',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/8.png'),
    isSelling: true,
  },
  {
    id: 'NFT-009',
    title: 'Goku Super Saiyan 3',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/9.png'),
    isSelling: true,
  },
  {
    id: 'NFT-010',
    title: 'Broly Super Saiyan White',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/10.png'),
    isSelling: true,
  },
  {
    id: 'NFT-011',
    title: 'Cell Perfect Form',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/11.png'),
    isSelling: true,
  },
  {
    id: 'NFT-012',
    title: 'Future Trunks Super Saiyan 1',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/12.png'),
    isSelling: true,
  },
  {
    id: 'NFT-013',
    title: 'Gogeta',
    price: '1.63',
    highestBid: '4.63',
    imageSource: require('../../assets/images/13.png'),
    isSelling: true,
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
    isSelling: true,
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
