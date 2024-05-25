import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {COLORS} from '../config';
import {STYLES} from '../config/styles';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const itemCardRadius = 30;

type NFTItemPropsType = {
  id: string;
  title: string;
  price: string;
  highestBid: string;
  imageSource: any;
};

const NFTItem = ({
  id,
  title,
  price,
  highestBid,
  imageSource,
}: NFTItemPropsType) => {
  const handlePurchase = () => {
    console.log('Purchase NFT');
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.nftIDContainer}>
        <Text style={styles.nftID}>{id}</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={imageSource} />
        <Image style={styles.bgImage} source={imageSource} />
        <BlurView style={styles.absolute} blurType="regular" blurAmount={8} />
      </View>
      <View style={styles.description}>
        <Text style={styles.itemName}>{title}</Text>
        <View style={styles.rowSpaceBetween}>
          <View style={styles.descriptionWrapperLeft}>
            <Text style={styles.descriptionTitle}>Price</Text>
            <Text style={styles.descriptionContent}>{price} FTM</Text>
          </View>
          <TouchableOpacity style={{width: 140}} onPress={handlePurchase}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0.75, y: 0}}
              colors={[COLORS.gradient[0], COLORS.gradient[1]]}
              style={{
                padding: 12,
                alignItems: 'center',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 8,
              }}>
              <FontAwesome5 name="shopping-cart" size={16} color="white" />
              <Text
                style={{
                  fontSize: 15,
                  color: '#fff',
                }}>
                Purchase
              </Text>
            </LinearGradient>
          </TouchableOpacity>
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
});

export default NFTItem;
