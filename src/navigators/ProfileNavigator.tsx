import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {ProfileParamList} from './config';
import WalletScreen from '../screens/WalletScreen';
import {SCREEN} from './AppRoute';
import ProfileScreen from '../screens/ProfileScreen';
import {COLORS} from '../config';
import NFTPropertyScreen from '../screens/NFTPropertyScreen';
import SellingNFT from '../screens/SellingNFTScreen';
import UpForAuctionScreen from '../screens/UpForAuctionScreen';

const ProfileStack = createStackNavigator<ProfileParamList>();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={({route}) => ({
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        fullScreenGestureEnabled: true,
        headerTitle: '',
        headerBackground(props) {
          return (
            <View
              style={{
                backgroundColor: COLORS.background.primary,
                flex: 1,
              }}
            />
          );
        },
        headerTintColor: COLORS.text.primary,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}
      initialRouteName={SCREEN.PROFILE}>
      <ProfileStack.Screen name={SCREEN.PROFILE} component={ProfileScreen} />
      <ProfileStack.Screen
        name={SCREEN.NFT_PROPERTY}
        component={NFTPropertyScreen}
      />
      <ProfileStack.Screen name={SCREEN.SELLING_NFT} component={SellingNFT} />
      <ProfileStack.Screen
        name={SCREEN.UP_FOR_AUCTION_NFT}
        component={UpForAuctionScreen}
      />
      <ProfileStack.Screen name={SCREEN.WALLET} component={WalletScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;

const styles = StyleSheet.create({});
