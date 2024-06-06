import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';

import {COLORS} from '../config';
import {STYLES} from '../config/styles';
import PlaceBidBottomSheet from '../screens/AuctionScreen/components/PlaceBidBottomSheet';
import {AuctionType} from '../screens/AuctionScreen';

const itemCardRadius = 30;

const AuctionItem = ({
  auctionId,
  autioneer,
  tokenId,
  initialPrice,
  previousBidder,
  lastBidder,
  startTime,
  endTime,
  completed,
  active,
  lastBid,
  name,
  description,
  image,
  attributes,
  rarity,
}: AuctionType) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.AuctionIDContainer}>
        <Text style={styles.AuctionID}>NFT-{tokenId}</Text>
      </View>
      <View style={styles.countDownContainer}>
        <Text style={STYLES.text.WorkSansBase}>{'handle timer tick'}</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{uri: image}} />
        <Image style={styles.bgImage} source={{uri: image}} />
        <BlurView style={styles.absolute} blurType="regular" blurAmount={8} />
      </View>
      <View style={styles.description}>
        <Text style={styles.itemName}>{name}</Text>
        <View style={styles.rowSpaceBetween}>
          <Text style={STYLES.text.SpaceMonoBase}>Highest bid</Text>
          <Text style={{...STYLES.text.SpaceMonoH5, color: COLORS.yellow[0]}}>
            {lastBid} FTM
          </Text>
        </View>
        <PlaceBidBottomSheet
          id={tokenId}
          title={name}
          highestBid={lastBid}
          imageSource={image}
          ownerName={lastBidder}
          // ownerProfileImg={}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  countDownContainer: {
    opacity: 0.8,
    position: 'absolute',
    zIndex: 2,
    right: 24,
    top: 16,
    textAlignVertical: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.orange[0],
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  AuctionIDContainer: {
    position: 'absolute',
    zIndex: 2,
    left: 24,
    top: 16,
    textAlignVertical: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.idTag,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  AuctionID: {
    ...STYLES.text.SpaceMonoCaption,
    color: COLORS.background.primary,
  },
  imageWrapper: {
    position: 'relative',
    height: 200, // explicitly set the height
    width: '100%',
    borderRadius: itemCardRadius,
  },
  bgImage: {
    position: 'absolute',
    zIndex: -2,
    marginTop: -61,
    height: 320,
    resizeMode: 'contain',
    width: '100%',
    borderRadius: itemCardRadius,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: itemCardRadius,
  },
  image: {
    zIndex: 1,
    height: 200,
    resizeMode: 'contain',
    width: '100%',
    borderRadius: itemCardRadius,
  },
  container: {
    marginHorizontal: 32,
    marginTop: 24,
    marginBottom: 16,
    borderRadius: itemCardRadius,
    // borderColor: 'white',
    // borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#FFFFFF',
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 8,
  },
  description: {
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingTop: 8,
    paddingHorizontal: 24,
    backgroundColor: COLORS.background.secondary,
    borderBottomLeftRadius: itemCardRadius,
    borderBottomRightRadius: itemCardRadius,
  },
  itemName: {
    ...STYLES.text.WorkSansH5,
    paddingBottom: 8,
  },
  descriptionTitle: {
    ...STYLES.text.SpaceMonoCaption,
    color: COLORS.text.caption,
  },
  descriptionContent: {
    ...STYLES.text.SpaceMonoCaption,
  },
  descriptionWrapperLeft: {
    gap: 8,
    alignItems: 'flex-start',
  },
  descriptionWrapperRight: {
    gap: 8,
    alignItems: 'flex-end',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeBidBtn: {
    marginTop: 12,
    backgroundColor: COLORS.orange[0],
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  nftOwner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  nftOwnerImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
});

export default AuctionItem;
