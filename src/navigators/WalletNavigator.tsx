import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {SCREEN} from './AppRoute';
import WalletScreen from '../screens/WalletScreen';
import ImportWalletScreen from '../screens/ImportWalletScreen';
import CreateWalletScreen from '../screens/CreateWalletScreen';
import {COLORS} from '../config';
import StackNavigatorHeaderBackground from '../components/StackNavigatorHeaderBackground';

const WalletStack = createStackNavigator();

const WalletNavigator = () => {
  return (
    <WalletStack.Navigator
      screenOptions={({route}) => ({
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
      })}>
      <WalletStack.Screen name={SCREEN.WALLET} component={WalletScreen} />
      <WalletStack.Screen
        name={SCREEN.IMPORT_WALLET}
        component={ImportWalletScreen}
      />
      <WalletStack.Screen
        name={SCREEN.CREATE_WALLET}
        component={CreateWalletScreen}
      />
    </WalletStack.Navigator>
  );
};

export default WalletNavigator;
