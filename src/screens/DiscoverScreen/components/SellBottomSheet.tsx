import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {BlurView} from '@react-native-community/blur';

import {COLORS} from '../../../config';
import {STYLES} from '../../../config/styles';
import BottomSheet from '../../../components/BottomSheet';
import GradientButton, {
  GradientButtonMode,
} from '../../../components/GradientButton';
import {NFTItemType} from '..';
import PriceInput from '../../../components/PriceInput';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const itemCardRadius = 30;

const SellBottomSheet = (props: NFTItemType) => {
  const [isConfirmDialogVisible, setConfirmDialogVisible] = useState(false);

  const bottomSheetRef = useRef<any>(null);
  const handlePresentModalPress = () => {
    bottomSheetRef.current?.popUp();
  };
  const handleSell = () => {
    // Check if price is empty
    if (!price) {
        alert('Price cannot be empty');
        return;
    }

    // Check if price is a valid number
    if (isNaN(Number(price))) {
        alert('Invalid price');
        return;
    }
		
    // Update the NFT item
    bottomSheetRef.current?.close();
  };
  return (
    <>
      <GradientButton
        mode={GradientButtonMode.SECONDARY}
        iconName="tags"
        content="Sell"
        onPress={handlePresentModalPress}
      />
      <BottomSheet title="Bottom Sheet" ref={bottomSheetRef}>
        <View style={styles.bottomSheetWrapper}>
          <View style={styles.container}>
            <View style={styles.nftIDContainer}>
              <Text style={styles.nftID}>NFT-{props.tokenId}</Text>
            </View>
            <View style={styles.yourNFTWrapper}>
              <Text style={styles.yourNFTText}>OWNED</Text>
            </View>

            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={{uri: props.image}} />
              <Image style={styles.bgImage} source={{uri: props.image}} />
              <BlurView
                style={styles.absolute}
                blurType="regular"
                blurAmount={8}
              />
            </View>
          </View>
          <Text style={styles.itemName}>{props.name}</Text>
          <Text style={styles.priceText}>{props.price} FTM</Text>
          <Text style={styles.confirmText}>Enter your NFT Item price</Text>
          <View style={styles.btnWrapper}>
            <PriceInput placeholder="Enter your price" />
            <TouchableOpacity style={STYLES.flex_1} onPress={handleSell}>
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
        <ConfirmDialog
          visible={isConfirmDialogVisible}
          onCancel={() => {
            setConfirmDialogVisible(false);
          }}
          onConfirm={() => {
            setConfirmDialogVisible(false);
          }}
          title="Confirm"
          message="Are you sure you want to sell this NFT?"
        />
      </BottomSheet>
    </>
  );
};

export default SellBottomSheet;

const styles = StyleSheet.create({
  imgWidth: {
    width: 140,
  },
  itemName: {
    ...STYLES.text.WorkSansH6,
    paddingBottom: 8,
    textAlign: 'center',
  },
  bottomSheetWrapper: {
    backgroundColor: COLORS.background.modal,
    paddingHorizontal: 16,
  },
  priceText: {
    ...STYLES.text.SpaceMonoH5,
    color: COLORS.yellow[0],
    textAlign: 'center',
  },
  confirmText: {
    ...STYLES.text.WorkSansBase,
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
  btnWrapper: {flexDirection: 'row', gap: 16, padding: 16},
  btnHeight: {flex: 1, height: 45},
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
