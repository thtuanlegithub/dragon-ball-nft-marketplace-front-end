import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { STYLES } from '../../config/styles'
import { COLORS } from '../../config'
import NFTItem from '../../components/NFTItem'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover digital art & Collect NFTs</Text>
      <Text style={styles.subTitle}>NFT marketplace UI created with Anima for Figma. Collect, buy and sell art from more than 20k NFT artists.</Text>
      <NFTItem/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: COLORS.background.primary,
    paddingTop: 24,
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