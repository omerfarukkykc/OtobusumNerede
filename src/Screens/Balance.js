import React from 'react'
import { View, Text, Button } from 'react-native'

export default class Balance extends React.Component {

  constructor({ props, navigation }) {
    super(props)
    this.state = {
      navigation: navigation,
      data: [],
    }

  }
  componentDidMount() {
    /*
    getBalance().then((item) => {
      this.setState({
        data: item,
      })
    })
    */
  }


  TestFunction = async () => {
    
    
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>

        </Text>
        <Button
          onPress={/*() => this.state.navigation.navigate('Welcome')*/ this.TestFunction}
          title="Go to TaadassbA Details"
        />
      </View>
    );
  }
}