import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import { STYLES } from '../config/styles';
import { COLORS } from '../config';

type ButtonProps = {
  content: string;
}

const Button = ({content}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.btnContainer}>
      <Text style={STYLES.text.WorkSansH5}>{content}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.callToAction,
    width: '100%',
    borderRadius: 300,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Button