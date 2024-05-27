import React, {useRef, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {COLORS} from '../../../config';
import {STYLES} from '../../../config/styles';
import BottomSheet from '../../../components/BottomSheet';
import {BlurView} from '@react-native-community/blur';
import {itemCardRadius} from '../../../utils/constants/styles.constant';
import {AuctionItemPropsType} from '../../../components/AuctionItem';

const PlaceBidBottomSheet = ({
  id,
  title,
  highestBid = '2.56',
  imageSource,
  ownerName = 'Owner name',
  ownerProfileImg = require('../../../assets/images/profile_test.png'),
}: AuctionItemPropsType) => {
  const bottomSheetRef = useRef<any>(null);
  const handleBottomSheetPresent = () => {
    bottomSheetRef.current?.popUp();
  };
  const [isFocused, setFocus] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={handleBottomSheetPresent}>
        <LinearGradient
          style={styles.placeBidBtn}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLORS.gradient[0], COLORS.gradient[1]]}>
          <FontAwesome5 name="gavel" size={16} color="white" />
          <Text style={STYLES.text.WorkSansBase}>Place a bid</Text>
        </LinearGradient>
      </TouchableOpacity>
      <BottomSheet ref={bottomSheetRef}>
        <View style={styles.container}>
          <View style={styles.AuctionIDContainer}>
            <Text style={styles.AuctionID}>{id}</Text>
          </View>
          <View style={styles.countDownContainer}>
            <Text style={STYLES.text.WorkSansBase}>17:28:00 left</Text>
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
          <View style={styles.description}>
            <Text style={styles.itemName}>{title}</Text>
            <View style={styles.nftOwner}>
              <Image style={styles.nftOwnerImg} source={ownerProfileImg} />
              <Text style={STYLES.text.SpaceMonoH6}>{ownerName}</Text>
            </View>
            <View style={styles.rowSpaceBetween}>
              <Text style={STYLES.text.SpaceMonoBase}>Highest bid</Text>
              <Text
                style={{...STYLES.text.SpaceMonoH5, color: COLORS.yellow[0]}}>
                {highestBid} FTM
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 32,
            gap: 8,
            marginBottom: 16,
          }}>
          <TextInput
            style={{
              ...STYLES.text.WorkSansBase,
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: COLORS.gray[0],
              borderRadius: 14,
              borderWidth: 2,
              borderColor: isFocused
                ? COLORS.yellow[0]
                : COLORS.background.secondary,
              color: COLORS.text.primary,
            }}
            placeholder="Enter your bid"
            placeholderTextColor={COLORS.text.caption}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LinearGradient
              style={{
                flex: 1,
                gap: 8,
                paddingHorizontal: 16,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[COLORS.gradient[0], COLORS.gradient[1]]}>
              <FontAwesome5 name="gavel" size={16} color="white" />
              <Text style={STYLES.text.SpaceMonoH6}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
};

export default PlaceBidBottomSheet;

const styles = StyleSheet.create({
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
    marginBottom: 24,
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
