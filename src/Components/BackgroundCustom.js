import React from 'react'
import {View,Text, ImageBackground, StyleSheet, KeyboardAvoidingView ,Keyboard  } from 'react-native'
import { IconButton, MD3Colors } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import { theme } from '../Core/theme'
import Icon from 'react-native-vector-icons/Ionicons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function BackgroundCustom({ children }) {

return (
    <SafeAreaView style ={styles.container}>
      <BottomTabBarHeightContext.Consumer>
        {tabBarHeight => (
          <View style={styles.header}  onPress={Keyboard.dismiss}>
            { children }
          </View>
        )}
      </BottomTabBarHeightContext.Consumer>
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header:{
    flex: 1,
    
  },
  footer:{
    flexDirection:'row',
    justifyContent:'space-around',
    //backgroundColor:'transparent'
  },
  container:{
    flex: 1,
    flexDirection:'column',
  },
  
})
