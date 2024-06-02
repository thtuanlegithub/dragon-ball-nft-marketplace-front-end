import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {SCREEN} from './AppRoute';
import {COLORS} from '../config';
import {ProfileParamList} from './config';
import ProfileScreen from '../screens/ProfileScreen';
import NFTPropertyScreen from '../screens/NFTPropertyScreen';
import SellingNFT from '../screens/SellingNFTScreen';
import UpForAuctionScreen from '../screens/UpForAuctionScreen';
import StackNavigatorHeaderBackground from '../components/StackNavigatorHeaderBackground';

const ProfileStack = createStackNavigator<ProfileParamList>();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={() => ({
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        fullScreenGestureEnabled: true,
        headerTitle: '',
        headerBackground() {
          return <StackNavigatorHeaderBackground />;
        },
        headerTintColor: COLORS.text.primary,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyle: {backgroundColor: COLORS.background.primary},
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
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;

const styles = StyleSheet.create({});
