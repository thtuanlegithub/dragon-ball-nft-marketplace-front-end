import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BlurView} from '@react-native-community/blur';

import BottomSheet from '../../../components/BottomSheet';
import {COLORS} from '../../../config';
import {STYLES} from '../../../config/styles';
import Button from '../../../components/Button';
import {NFTItemPropsType} from '../../../components/NFTItem';

const itemCardRadius = 30;

const BuyBottomSheet = ({
  id,
  title,
  price,
  imageSource,
  ownerProfileImg = require('../../../assets/images/profile_test.png'),
}: NFTItemPropsType) => {
  const bottomSheetRef = useRef<any>(null);
  const handlePresentModalPress = () => {
    bottomSheetRef.current?.popUp();
  };
  const handlePurchase = () => {
    console.log('Purchase NFT');
  };
  return (
    <>
      <TouchableOpacity style={{width: 140}} onPress={handlePresentModalPress}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.75, y: 0}}
          colors={[COLORS.gradient[0], COLORS.gradient[1]]}
          style={styles.gradientBtn}>
          <FontAwesome5 name="shopping-cart" size={16} color="white" />
          <Text style={STYLES.text.WorkSansBase}>Purchase</Text>
        </LinearGradient>
      </TouchableOpacity>
      <BottomSheet title="Bottom Sheet" ref={bottomSheetRef}>
        <View
          style={{
            backgroundColor: COLORS.background.modal,
            paddingHorizontal: 16,
          }}>
          <View style={styles.container}>
            <View style={styles.nftIDContainer}>
              <Text style={styles.nftID}>{id}</Text>
            </View>
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={imageSource} />
              <Image style={styles.bgImage} source={imageSource} />
              <BlurView
                style={styles.absolute}
                blurType="regular"
                blurAmount={8}
              />
            </View>
          </View>
          <Text style={styles.itemName}>{title}</Text>
          <Text
            style={{
              ...STYLES.text.SpaceMonoH5,
              color: COLORS.yellow[0],
              textAlign: 'center',
            }}>
            {price} FTM
          </Text>
          <Text
            style={{
              ...STYLES.text.WorkSansBase,
              textAlign: 'center',
            }}>
            Are you sure to purchase this NFT?
          </Text>
          <View style={{flexDirection: 'row', gap: 16, padding: 16}}>
            <TouchableOpacity style={{flex: 1, height: 45}}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0.75, y: 0}}
                colors={[COLORS.gray[0], COLORS.gray[1]]}
                style={styles.gradientBtn}>
                <Text style={STYLES.text.WorkSansBase}>Cancel</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0.75, y: 0}}
                colors={[COLORS.gradient[0], COLORS.gradient[1]]}
                style={styles.gradientBtn}>
                {/* <FontAwesome5 name="shopping-cart" size={16} color="white" /> */}
                <Text style={STYLES.text.WorkSansBase}>Confirm</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default BuyBottomSheet;

const styles = StyleSheet.create({
  itemName: {
    ...STYLES.text.WorkSansH6,
    paddingBottom: 8,
    textAlign: 'center',
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
  gradientBtn: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
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
});
