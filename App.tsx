import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from './src/config'
import { STYLES } from './src/config/styles'
import HomeScreen from './src/screens/HomeScreen'
import MainTabNavigator from './src/navigators/MainNavigator'

const App = () => {
  return (
    <MainTabNavigator/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  }
})

export default App