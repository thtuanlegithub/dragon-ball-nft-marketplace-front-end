import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../config';
import {STYLES} from '../../config/styles';
import NFTItem from '../../components/NFTItem';
import axios from 'axios';
import {SERVER_URL} from '../../utils/constants/server-url.constant';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../config/firebaseConfig';
import {ethers} from 'ethers';

type NFTFetchItem = {
  tokenId: string;
  name: string;
  price: string;
  image: string;
  rarity: string;
  isSold: boolean;
  isAuction: boolean;
}[];

const DiscoverScreen = () => {
  const [ListNFT, setListNFT] = useState<NFTFetchItem>([]); // [1
  const fetchListNFT = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/nft`);
      const nfts = res.data.data.nfts.map(nft => {
        return {
          ...nft,
          price: ethers.formatEther(BigInt(nft.price)), // Convert from Wei to Ether
        };
      });
      setListNFT(nfts);
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  useEffect(() => {
    fetchListNFT();
    const unsubscribe = onSnapshot(collection(db, 'nfts'), () => {
      fetchListNFT();
    });
    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);
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
        keyExtractor={item => item.tokenId}
        renderItem={({item}) => (
          <NFTItem
            tokenId={item.tokenId}
            name={item.name}
            price={item.price}
            image={item.image}
            rarity={item.rarity}
            isSold={item.isSold}
            isAuction={item.isAuction}
          />
        )}
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
