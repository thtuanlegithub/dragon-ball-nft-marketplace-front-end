import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { COLORS, FONTS } from '../config';
import { STYLES } from '../config/styles';

const itemCardRadius = 20;

const NFTItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={require('../assets/images/3.png')} />
        <Image style={styles.bgImage} source={require('../assets/images/3.png')} />
        <BlurView
          style={styles.absolute}
          blurType="regular"
          blurAmount={2}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.itemName}>Trunks kids</Text>
        <View style={styles.rowSpaceBetween}>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.descriptionTitle}>Price</Text>
            <Text style={styles.descriptionContent}>1.63 FTM</Text>
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.descriptionTitle}>Highest Bid</Text>
            <Text style={styles.descriptionContent}>1.63 FTM</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    position: 'relative',
    height: 238, // explicitly set the height
    width: '100%',
    borderRadius: itemCardRadius,
  },
  bgImage: {
    position: 'absolute',
    zIndex: -2,
    marginTop: -26,
    height: 300,
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
    height: 238,
    resizeMode: 'contain',
    width: '100%',
    borderRadius: itemCardRadius,
  },
  container: {
    borderRadius: itemCardRadius,
    borderColor: 'white',
    borderWidth: 1,
    overflow: 'hidden', // ensure child views are clipped to the border radius
  },
  description: {
    justifyContent: 'space-between',
    height: 156,
    padding: 24,
    backgroundColor: COLORS.background.secondary,
    borderBottomLeftRadius: itemCardRadius,
    borderBottomRightRadius: itemCardRadius,
  },
  itemName: {
    ...STYLES.text.WorkSansH5,
  },
  descriptionTitle: {
    ...STYLES.text.SpaceMonoCaption,
    color: COLORS.text.caption,
  },
  descriptionContent: {
    ...STYLES.text.SpaceMonoCaption,
  },
  descriptionWrapper: {
    gap: 8,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default NFTItem;
