import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { FONTS } from '../config';
import AuctionScreen from '../screens/AuctionScreen';

const BottomTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
              color: 'white',
              paddingVertical: 8,
            },
            tabBarStyle: {
              borderColor: 'transparent',
              height: 64,
              position: 'absolute',
              bottom: 16,
              left: 16,
              right: 16, 
              elevation: 0,
              backgroundColor: 'transparent', // Make the background transparent
            },
            tabBarBackground: () => (
              <View style={{ flex: 1, backgroundColor: 'transparent',  borderRadius: 20, overflow: 'hidden' }}>
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
            )
          }}
        >
          <BottomTab.Screen
            name="Home"
            component={HomeScreen}
          />
          <BottomTab.Screen
            name="Profile"
            component={ProfileScreen}
        />
          <BottomTab.Screen
            name="Auction"
            component={AuctionScreen}
          />
        </BottomTab.Navigator>
    </NavigationContainer>
  );
}

export default MainTabNavigator;
