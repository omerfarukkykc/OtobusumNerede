import React from 'react'
import { View,Text,Button } from 'react-native'
import BackButton from '../../../Components/BackButton'
export default function LostStuff({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <BackButton goBack={navigation.goBack}/>

      <Text>
        Welcome to LostStuff page!
      </Text>
      <Button 
      onPress={() => navigation.navigate('TabA Details')}
      title="Go to TabA Details"
      />
    </View>
  );
}