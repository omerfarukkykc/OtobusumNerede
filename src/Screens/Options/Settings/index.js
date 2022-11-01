import React from 'react'
import { View,Text,Button } from 'react-native'
import BackButton from '../../../Components/BackButton'


export default class Settings extends React.Component{
  constructor({navigation}){
    super()
    this.state = {
      goBack:navigation.goBack,
      name:"Ömer Faruk Kayıkcı"
    }
  }
  handleStateValues(){
    this.setState({name:"Kayıkcı"})
  }
  render(){
    return (
    <View>
      <Text>{this.state.name}</Text>
      <Button title='Değiştir' onPress={()=>this.handleStateValues()}></Button>
      <Button title='Heyyy' onPress={this.state.goBack}></Button>
    </View>
    )
  }
}

/*
export default function Settings({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <BackButton goBack={navigation.goBack}/>
      <Text>
        Welcome to Settings page!
      </Text>
      <Button 
      onPress={() => navigation.navigate('TabA Details')}
      title="Go to TabA Details"
      />
    </View>
  );
}*/