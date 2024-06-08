import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';
import {ethers} from 'ethers';

import {COLORS} from '../../config';
import {STYLES} from '../../config/styles';
import {SERVER_URL} from '../../utils/constants/server-url.constant';

import AuctionItem from '../../components/AuctionItem';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../config/firebaseConfig';

export type AttributeType = {
  trait_type: string;
  value: string;
};
export type AuctionType = {
  auctionId: string;
  auctioneer: string;
  tokenId: string;
  initialPrice: string;
  previousBidder: string;
  lastBidder: string;
  startTime: number;
  endTime: number;
  completed: boolean;
  active: boolean;
  lastBid: string;
  name: string;
  description: string;
  image: string;
  attributes: AttributeType[];
  rarity: string;
};

const AuctionScreen = () => {
  const [listAuctionNFT, setListAuctionNFT] = useState<AuctionType[]>([]);
  const fetchListAuctionNFT = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/nft/auction`);
      const nfts = res.data.data.nfts.map((nft: AuctionType) => {
        return {
          ...nft,
          initialPrice: ethers.formatEther(BigInt(nft.initialPrice)), // Convert from Wei to Ether
          lastBid: ethers.formatEther(BigInt(nft.lastBid)), // Convert from Wei to Ether
        };
      });
      setListAuctionNFT(nfts);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchListAuctionNFT();
    const unsubscribe = onSnapshot(collection(db, 'auctions'), () => {
      fetchListAuctionNFT();
    });
    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.headerText}>🔥 Being Auctioned</Text>
        }
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 70}} />}
        data={listAuctionNFT}
        keyExtractor={item => item.tokenId}
        renderItem={({item}) => <AuctionItem {...item} />}
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

export default AuctionScreen;
