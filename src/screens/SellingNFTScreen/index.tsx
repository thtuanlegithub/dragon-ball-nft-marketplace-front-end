import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';

import {COLORS} from '../../config';
import {STYLES} from '../../config/styles';
import {SERVER_URL} from '../../utils/constants/server-url.constant';

import {NFTItemType} from '../DiscoverScreen';
import NFTItem from '../../components/NFTItem';
import {address_test} from '../../utils/constants/address-test.constant';
import {ethers} from 'ethers';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../config/firebaseConfig';

const SellingNFT = () => {
  const wallet_address = useSelector((state: any) => state.wallet.address);

  const [listSellingNFT, setListSellingNFT] = useState<NFTItemType[]>([]);

  const fetchListProperty = async () => {
    try {
      const res = await axios.get(
        `${SERVER_URL}/nft/owned/selling/${wallet_address}`,
      );
      const nfts = res.data.data.nfts.map((nft: NFTItemType) => {
        return {
          ...nft,
          price: ethers.formatEther(BigInt(nft.price)), // Convert from Wei to Ether
        };
      });
      setListSellingNFT(nfts);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchListProperty();
    const unsubscribe = onSnapshot(collection(db, 'nfts'), () => {
      fetchListProperty();
    });
    // Clean up listener on unmount
    return () => unsubscribe();
  }, [wallet_address]);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Text style={styles.headerText}>Selling NFT</Text>}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.footer} />}
        data={listSellingNFT}
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
  footer: {height: 70},
});

export default SellingNFT;
