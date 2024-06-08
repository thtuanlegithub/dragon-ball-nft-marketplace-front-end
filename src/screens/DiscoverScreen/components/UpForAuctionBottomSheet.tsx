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

const itemCardRadius = 30;

const UpForAuctionBottomSheet = (props: NFTItemType) => {
  const [isConfirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const bottomSheetRef = useRef<any>(null);
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [timePickerOpen, setTimePickerOpen] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.popUp();
  };
  return (
    <>
      <GradientButton
        customContainerStyles={{flex: 1}}
        mode={GradientButtonMode.PRIMARY}
        iconName="gavel"
        content="Up auction"
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
              // onChangeText={setPrice}
              placeholder="Enter starting price"
            />
          </View>
          <View style={styles.pickDateTimeWrapper}>
            <TouchableOpacity
              style={styles.pickDateTimeBtn}
              onPress={() => {
                setDatePickerOpen(true);
              }}>
              {endDate ? (
                <Text style={styles.pickDateTimeText}>
                  {dayjs.unix(endDate).format('MMM D, YYYY')}
                </Text>
              ) : (
                <Text style={styles.pickDateTimeText}>End Date</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pickDateTimeBtn}
              onPress={() => {
                setTimePickerOpen(true);
              }}>
              {endTime ? (
                <Text style={styles.pickDateTimeText}>
                  {dayjs.unix(endTime).format('hh:mm A')}
                </Text>
              ) : (
                <Text style={styles.pickDateTimeText}>End Time</Text>
              )}
            </TouchableOpacity>
          </View>
          <ConfirmDialog
            visible={isConfirmDialogVisible}
            onCancel={() => {
              setConfirmDialogVisible(false);
            }}
            onConfirm={() => {
              // handleSell();
              setConfirmDialogVisible(false);
            }}
            title="Confirm"
            message="Are you sure you want to sell this NFT?"
          />
          <DatePicker
            modal
            mode="date"
            open={datePickerOpen}
            date={new Date()}
            onConfirm={date => {
              setEndDate(dayjs(date).unix());
              console.log(dayjs(date).format('DD/MM/YYYY'));
              setDatePickerOpen(false);
            }}
            onCancel={() => setDatePickerOpen(false)}
          />
          <DatePicker
            modal
            mode="time"
            open={timePickerOpen}
            date={new Date()}
            onConfirm={date => {
              setEndTime(dayjs(date).unix());
              setTimePickerOpen(false);
            }}
            onCancel={() => setTimePickerOpen(false)}
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
