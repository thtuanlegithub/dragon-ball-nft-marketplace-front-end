import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {COLORS, FONTS} from '../config';
import {STYLES} from '../config/styles';

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
  return (
    <TouchableOpacity style={styles.container}>
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
          <View style={styles.descriptionWrapperRight}>
            <Text style={styles.descriptionTitle}>Highest Bid</Text>
            <Text style={styles.descriptionContent}>{highestBid} FTM</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 24,
    borderRadius: itemCardRadius,
    borderColor: 'white',
    borderWidth: 1,
    overflow: 'hidden', // ensure child views are clipped to the border radius
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
});

export default NFTItem;
