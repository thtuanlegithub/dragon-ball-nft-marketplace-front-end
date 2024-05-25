import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { FONTS } from '../config';

const BottomTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              height: 64,
              position: 'absolute',
              bottom: 16,
              left: 16,
              right: 16, 
              borderRadius: 20,
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
                blurType="materialDark"
                blurAmount={10}
              />
            </View>
            )
          }}
        >
          <BottomTab.Screen
            options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {
              paddingVertical: 8,
              
              }
            }}
            name="Home"
            component={HomeScreen}
          />
          <BottomTab.Screen
            name="Profile"
            component={ProfileScreen}
          />
        </BottomTab.Navigator>
    </NavigationContainer>
  );
}

export default MainTabNavigator;
