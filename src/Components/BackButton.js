import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icon from 'react-native-vector-icons/Ionicons';

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
          <Icon style={{color:'111',opacity:0.8}} size={35} name="chevron-back-outline" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})
