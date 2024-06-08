import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';

import {COLORS} from '../config';
import {STYLES} from '../config/styles';

import BuyBottomSheet from '../screens/DiscoverScreen/components/BuyBottomSheet';
import {NFTItemType} from '../screens/DiscoverScreen';
import {useSelector} from 'react-redux';
import SellBottomSheet from '../screens/DiscoverScreen/components/SellBottomSheet';
import UpdateSellingBottomSheet from '../screens/DiscoverScreen/components/UpdateBottomSheet';

const itemCardRadius = 30;

const NFTItem = (props: NFTItemType) => {
  const wallet_address = useSelector<any>(state => state.wallet.address);
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.nftIDContainer}>
        <Text style={styles.nftID}>NFT-{props.tokenId}</Text>
      </View>
      {wallet_address === props.author && (
        <View style={styles.yourNFTWrapper}>
          <Text style={styles.yourNFTText}>OWNED</Text>
        </View>
      )}
      <View style={styles.imageWrapper}>
        {props.image && (
          <>
            <Image style={styles.image} source={{uri: props.image}} />
            <Image style={styles.bgImage} source={{uri: props.image}} />
          </>
        )}
        <BlurView style={styles.absolute} blurType="regular" blurAmount={8} />
      </View>
      <View style={styles.description}>
        <Text style={styles.itemName}>{props.name}</Text>
        <View style={styles.nftOwner}>
          <Image
            style={styles.nftOwnerImg}
            source={require('../assets/images/profile_test.png')}
          />
          <Text style={STYLES.text.SpaceMonoH6}>{props.rarity}</Text>
        </View>
        <View style={styles.rowSpaceBetween}>
          {!props.isSold && (
            <View style={styles.descriptionWrapperLeft}>
              <Text style={styles.descriptionTitle}>Price</Text>
              <Text style={styles.descriptionContent}>{props.price} FTM</Text>
            </View>
          )}

          {wallet_address === props.author && props.isSold && (
            <UpdateSellingBottomSheet {...props} />
          )}

          {wallet_address === props.author && !props.isSold && (
            <SellBottomSheet {...props} />
          )}

          {wallet_address !== props.author && props.isSold && (
            <BuyBottomSheet {...props} />
          )}

          {wallet_address !== props.author && !props.isSold && (
            <View style={styles.notSoldContainer}>
              <Text style={styles.notSoldText}>NOT SOLD</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nftIDContainer: {
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
  nftID: {
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
    marginHorizontal: 40,
    marginTop: 24,
    marginBottom: 16,
    borderRadius: itemCardRadius,
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
    ...STYLES.text.WorkSansH6,
    paddingBottom: 8,
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
  descriptionTitle: {
    ...STYLES.text.SpaceMonoCaption,
    color: COLORS.text.caption,
  },
  descriptionContent: {
    ...STYLES.text.SpaceMonoH5,
    color: COLORS.yellow[0],
    padding: 0,
    marginTop: -10,
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
  },
  textBuy: {
    ...STYLES.text.WorkSansBase,
    paddingBottom: 4,
  },
  btnBuy: {
    backgroundColor: COLORS.orange[0],
    paddingHorizontal: 16,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBtn: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  notSoldBtn: {
    padding: 10,
    alignItems: 'center',
    // borderRadius: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  notSoldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    transform: [{rotateZ: '-4deg'}],
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderWidth: 4,
    borderColor: COLORS.red[1],
    borderRadius: 8,
  },
  notSoldText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: COLORS.red[1],
  },
  yourNFTWrapper: {
    borderWidth: 2,
    borderColor: COLORS.yellow[1],
    // backgroundColor: COLORS.yellow[1],
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    position: 'absolute',
    zIndex: 2,
    right: 18,
    top: 14,
  },
  yourNFTText: {
    ...STYLES.text.WorkSansH7,
    color: COLORS.yellow[1],
  },
});

export default NFTItem;
