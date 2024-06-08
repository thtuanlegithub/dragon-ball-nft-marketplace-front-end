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

export type NFTItemType = {
  tokenId: string;
  name: string;
  price: string;
  image: string;
  rarity: string;
  isSold: boolean;
  isAuction: boolean;
  author: string;
};

const DiscoverScreen = () => {
  const [ListNFT, setListNFT] = useState<NFTItemType[]>([]); // [1
  const fetchListNFT = async () => {
    try {
    //   const res = await axios.get(`${SERVER_URL}/nft`);
    //   const nfts = res.data.data.nfts.map((nft: NFTItemType) => {
    //     return {
    //       ...nft,
    //       price: ethers.formatEther(BigInt(nft.price)), // Convert from Wei to Ether
    //     };
    //   });
    //   setListNFT(nfts);
    //   return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  useEffect(() => {
    // fetchListNFT();
    // const unsubscribe = onSnapshot(collection(db, 'nfts'), () => {
    //   fetchListNFT();
    // });
    // // Clean up listener on unmount
    // return () => unsubscribe();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Text style={styles.headerText}>🔎 Discover</Text>}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 70}} />}
        data={ListNFT}
        keyExtractor={item => item.tokenId}
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
  headerText: {...STYLES.text.WorkSansH4, paddingHorizontal: 16},
});

export default DiscoverScreen;
