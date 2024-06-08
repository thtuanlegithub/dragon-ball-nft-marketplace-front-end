import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

import {COLORS} from '../../../config';
import {STYLES} from '../../../config/styles';
import BottomSheet from '../../../components/BottomSheet';
import GradientButton, {
  GradientButtonMode,
} from '../../../components/GradientButton';
import {NFTItemType} from '..';
import PriceInput from '../../../components/PriceInput';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { SERVER_URL } from '../../../utils/constants/server-url.constant';

const itemCardRadius = 30;

const UpForAuctionBottomSheet = (props: NFTItemType) => {
  const wallet_address = useSelector<any>(state => state.wallet.address);
  const [isConfirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const bottomSheetRef = useRef<any>(null);
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [endDateTime, setEndDateTime] = useState<number>(0);
  const [price, setPrice] = useState<string>();
  const handlePresentModalPress = () => {
    bottomSheetRef.current?.popUp();
  };
  const handleAuction = async () => {
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

    // Check if endDateTime is empty
    if (!endDateTime) {
      alert('End DateTime cannot be empty');
      return;
    }

    // Check if endDateTime is in the past
    if (dayjs().unix() > endDateTime) {
      alert('End DateTime cannot be in the past');
      return;
    }

    // Check if endDateTime is greater than current time + 2 minutes
    if (endDateTime <= dayjs().add(2, 'minute').unix()) {
      alert('End DateTime must be greater than current time +2 minutes');
      return;
    }

    // Update NFT item
    const data = {
      address: wallet_address,
      tokenId: props.tokenId,
      initialPrice: price,
      startTime: dayjs().add(1, 'minute').unix(),
      endTime: endDateTime,
    };

    // Send a POST request
    try {
      const response = await axios.post(
      `${SERVER_URL}/auction/createAuction`,
        data
      );
    } catch (error) {
      console.error('Error:', error);
    }
    bottomSheetRef.current?.close();
  };
  return (
    <>
      <GradientButton
        customContainerStyles={{flex: 1}}
        mode={GradientButtonMode.PRIMARY}
        iconName="gavel"
        content="Auction"
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
          <Text style={styles.confirmText}>Enter your auction information</Text>
          <View style={styles.btnWrapper}>
            <PriceInput
              onChangeText={setPrice}
              placeholder="Enter starting price"
            />
          </View>
          <View style={styles.pickDateTimeWrapper}>
            <TouchableOpacity
              style={styles.pickDateTimeBtn}
              onPress={() => {
                setDatePickerOpen(true);
              }}>
              {endDateTime ? (
                <Text style={styles.pickDateTimeText}>
                  {dayjs.unix(endDateTime).format('MMM D, YYYY HH:mm A')}
                </Text>
              ) : (
                <Text style={styles.pickDateTimeText}>Pick End DateTime</Text>
              )}
            </TouchableOpacity>
          </View>
          <ConfirmDialog
            visible={isConfirmDialogVisible}
            onCancel={() => {
              setConfirmDialogVisible(false);
            }}
            onConfirm={() => {
              handleAuction();
              setConfirmDialogVisible(false);
            }}
            title="Confirm"
            message="Are you sure you want to sell this NFT?"
          />
          <DatePicker
            modal
            mode="datetime"
            open={datePickerOpen}
            date={new Date()}
            onConfirm={date => {
              setEndDateTime(dayjs(date).unix());
              console.log(dayjs(date).format('MMM DD, YYYY HH:mm A'));
              setDatePickerOpen(false);
            }}
            onCancel={() => setDatePickerOpen(false)}
          />
          <GradientButton
            customContainerStyles={styles.confirmBtn}
            mode={GradientButtonMode.GREEN}
            content="Confirm"
            onPress={() => setConfirmDialogVisible(true)}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default UpForAuctionBottomSheet;

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
  pickDateTimeWrapper: {flexDirection: 'row', gap: 12, paddingHorizontal: 16},
  pickDateTimeBtn: {
    backgroundColor: COLORS.gray[0],
    padding: 8,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },
  pickDateTimeText: {
    ...STYLES.text.SpaceMonoBase,
    textAlign: 'center',
    paddingVertical: 4,
  },
  confirmBtn: {
    width: '100%',
    height: 50,
    marginTop: 32,
    paddingHorizontal: 16,
  },
});
