import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { STYLES } from '../../config/styles'
import { COLORS } from '../../config'
import NFTItem from '../../components/NFTItem'
import Button from '../../components/Button'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover marketplace & Find your Dragon ball character</Text>
      <Text style={styles.subTitle}>Delve into our marketplace powered by Dragon Ball enthusiasts. Purchase, sell, and uncover artwork from NFT artists, showcasing beloved Dragon Ball characters.</Text>
      <NFTItem />
      <Button content='Get Started'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: COLORS.background.primary,
    paddingTop: 24,
    gap: 14,
  },
  title: {
    ...STYLES.text.WorkSansH4,
  },
  subTitle: {
    ...STYLES.text.WorkSansBase,
    marginTop: 16,
  }
})

export default HomeScreen