import React, {useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';

import {COLORS} from '../config';
import {STYLES} from '../config/styles';

import AuctionTimer from './AuctionTimer';
import GradientButton, {GradientButtonMode} from './GradientButton';
import {AuctionType} from '../screens/AuctionScreen';
import ConfirmDialog from './ConfirmDialog';
import PlaceBidBottomSheet from '../screens/AuctionScreen/components/PlaceBidBottomSheet';

const itemCardRadius = 30;

const AuctionItem = (props: AuctionType) => {
  const [isConfirmStopDialogVisible, setConfirmStopDialogVisible] =
    useState(false);

  const [isConfirmFinishDialogVisible, setConfirmFinishDialogVisible] =
    useState<boolean>(false);

  const wallet_address = useSelector((state: any) => state.wallet.address);

  const handleStopAuction = () => {
    // handle stop auction logic here
  };

  const handleFinishAuction = () => {
    // handle finish auction logic here
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.AuctionIDContainer}>
        <Text style={styles.AuctionID}>NFT-{props.tokenId}</Text>
      </View>
      {wallet_address === props.auctioneer && (
        <View style={styles.yourNFTWrapper}>
          <Text style={styles.yourNFTText}>OWNED</Text>
        </View>
      )}
      <AuctionTimer endDateTime={props.endTime} />
      <View style={styles.imageWrapper}>
        {props?.image && (
          <>
            <View style={{position: 'relative'}}>
              <Image style={styles.image} source={{uri: props.image}} />
              {props.lastBid === wallet_address && (
                <View style={styles.youAreHighestWrapper}>
                  <Text style={styles.youAreHighestText}>HIGHEST BIDDER</Text>
                </View>
              )}
            </View>
            <Image style={styles.bgImage} source={{uri: props.image}} />
          </>
        )}
        <BlurView style={styles.absolute} blurType="regular" blurAmount={8} />
      </View>
      <View style={styles.description}>
        <Text style={styles.itemName}>{props.name}</Text>
        <View style={styles.rowSpaceBetween}>
          <Text style={STYLES.text.SpaceMonoBase}>Highest bid</Text>
          <Text style={{...STYLES.text.SpaceMonoH5, color: COLORS.yellow[0]}}>
            {props.lastBid} FTM
          </Text>
        </View>
        <View style={{marginTop: 8}}>
          {/* props.auctioner != wallet_address && props.endtime > dayjs().unix() */}
          {props.auctioneer !== wallet_address &&
            props.endTime > dayjs().unix() && (
              <PlaceBidBottomSheet {...props} />
            )}

          {/* props.auctioner != wallet_address && props.endtime <= dayjs().unix() */}
          {props.auctioneer !== wallet_address &&
            props.endTime <= dayjs().unix() && (
              <Text style={styles.finishedText}>Auction Finished!</Text>
            )}

          {/* props.auctioner === wallet_address && props.endtime > dayjs().unix() */}
          {props.auctioneer === wallet_address &&
            props.endTime <= dayjs().unix() && (
              <GradientButton
                mode={GradientButtonMode.GREEN}
                content="Finished"
                onPress={() => setConfirmFinishDialogVisible(true)}
                customContainerStyles={{width: '100%'}}
              />
            )}

          {/* props.auctioner === wallet_address && props.endtime <= dayjs().unix() */}
          {props.auctioneer === wallet_address &&
            props.endTime > dayjs().unix() && (
              <GradientButton
                onPress={() => setConfirmStopDialogVisible(true)}
                mode={GradientButtonMode.GRAY}
                content="Stop"
                customContainerStyles={{width: '100%'}}
              />
            )}
        </View>
      </View>
      <ConfirmDialog
        title="Confirm"
        message="Are you sure to stop that auction?"
        visible={isConfirmStopDialogVisible}
        onCancel={() => setConfirmStopDialogVisible(false)}
        onConfirm={() => {
          handleStopAuction();
          setConfirmStopDialogVisible(false);
        }}
      />
      <ConfirmDialog
        visible={isConfirmFinishDialogVisible}
        message="Are you sure to finish that auction?"
        onCancel={() => setConfirmFinishDialogVisible(false)}
        onConfirm={() => {
          handleFinishAuction();
          setConfirmFinishDialogVisible(false);
        }}
      />
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
  finishedText: {
    ...STYLES.text.WorkSansH5,
    color: COLORS.orange[0],
    textAlign: 'center',
    marginTop: 8,
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
    top: 60,
    right: 18,
  },
  yourNFTText: {
    ...STYLES.text.WorkSansH7,
    color: COLORS.yellow[1],
  },
  youAreHighestWrapper: {
    backgroundColor: COLORS.yellow[0],
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    position: 'absolute',
    zIndex: 2,
    bottom: 12,
    right: 12,
    opacity: 0.9,
  },
  youAreHighestText: {
    ...STYLES.text.WorkSans_SM_14,
    color: COLORS.text.black,
  },
});

export default AuctionItem;
