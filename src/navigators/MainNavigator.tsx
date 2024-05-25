import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BlurView} from '@react-native-community/blur';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {COLORS} from '../config';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuctionScreen from '../screens/AuctionScreen';
import DiscoverScreen from '../screens/DiscoverScreen';

const BottomTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarLabelStyle: {
            color: 'white',
          },
          tabBarLabel: ({focused, color}) => {
            let label: string = '';
            if (route.name === 'Home') {
              label = 'Home';
            } else if (route.name === 'Profile') {
              label = 'Profile';
            } else if (route.name === 'Auction') {
              label = 'Auction';
            } else if (route.name === 'Discover') {
              label = 'Discover';
            }
            return (
              <Text
                style={{
                  color: focused ? 'white' : 'gray',
                  paddingBottom: 8,
                  fontSize: 12,
                }}>
                {label}
              </Text>
            );
          },
          tabBarStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'transparent',
            height: 65,
            position: 'absolute',
            bottom: 12,
            left: 16,
            right: 16,
            elevation: 0,
            backgroundColor: 'transparent',
          },
          tabBarIcon: ({focused, size = 20}) => {
            let iconName;
            let iconStyle = focused ? 'solid' : 'regular';
            let iconOpacity = focused ? 1 : 0.2;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Discover') {
              iconName = 'compass';
            } else if (route.name === 'Auction') {
              iconName = 'gavel';
            } else if (route.name === 'Profile') {
              iconName = 'user-alt';
            }
            let validIconStyle = typeof iconStyle === 'string' ? {} : iconStyle;
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={'white'}
                style={{...validIconStyle, opacity: iconOpacity}}
              />
            );
          },
          tabBarBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                borderRadius: 20,
                overflow: 'hidden',
              }}>
              <BlurView
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                blurType="dark"
                blurAmount={10}
                blurRadius={20}
              />
            </View>
          ),
        })}>
        <BottomTab.Screen name="Home" component={HomeScreen} />
        <BottomTab.Screen name="Discover" component={DiscoverScreen} />
        <BottomTab.Screen name="Auction" component={AuctionScreen} />
        <BottomTab.Screen name="Profile" component={ProfileScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default MainTabNavigator;
