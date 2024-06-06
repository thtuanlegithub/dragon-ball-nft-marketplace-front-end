import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {SERVER_URL} from '../../utils/constants/server-url.constant';
import {COLORS} from '../../config';
import {STYLES} from '../../config/styles';
import {address_test} from '../../utils/constants/address-test.constant';
import {AuctionType} from '../AuctionScreen';
import AuctionItem from '../../components/AuctionItem';
import {ethers} from 'ethers';

const UpForAuctionScreen = () => {
  const wallet_address = useSelector((state: any) => state.wallet.address);

  const [listUpForAuction, setListUpForAuctionNFT] = useState<AuctionType[]>();

  useEffect(() => {
    const fetchListProperty = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}/nft/owned/auction/${address_test}`,
        );
        const auctionNfts = res.data.data.nfts.map((nft: AuctionType) => {
          return {
            ...nft,
            lastBid: ethers.formatEther(BigInt(nft.lastBid)), // Convert from Wei to Ether
            initialPrice: ethers.formatEther(BigInt(nft.initialPrice)), // Convert from Wei to Ether
          };
        });
        setListUpForAuctionNFT(auctionNfts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchListProperty();
  }, [setListUpForAuctionNFT, wallet_address]);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.headerText}>Up for Auction NFT</Text>
        }
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.footer} />}
        data={listUpForAuction}
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
  footer: {height: 70},
});

export default UpForAuctionScreen;
