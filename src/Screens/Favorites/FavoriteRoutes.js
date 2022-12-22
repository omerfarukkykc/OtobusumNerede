import React from 'react';
import BackgroundCustom from '../../Components/BackgroundCustom';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, TextInput, SafeAreaView, ScrollView, FlatList, BackHandler } from 'react-native'
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { black, green100 } from 'react-native-paper/lib/typescript/styles/colors';
import { forEach } from 'react-native-axios/lib/utils';
import { ApiClient } from '../../Network/ApiClient';
import Loading from '../../Components/Loading';
import { RefreshControl } from 'react-native-gesture-handler';

export default class FavoriteRoutes extends React.Component {

  constructor({ props, navigation }) {
    super(props);
    this.apiClient = new ApiClient();
    this.state = { isToggleOn: false }
    this.state = {
      navigation: navigation,
      data: [],
      isLoading: true,
      refreshing:false
    }
    
  }

  
  componentDidMount() {
    this.apiClient.getFavorites().then((res) => {
      this.setState({
        data: res.routes
      })
    }).finally(() => {
      setTimeout(() => {
        this.setState({
          isLoading: false
        })
      }, 500)
    })
  }

  
  
  onRefresh = () => {
    this.apiClient.getFavorites().then((res) => {
      this.setState({
        data: res.routes
      })
    }).finally(() => {
      setTimeout(() => {
        this.setState({
          refreshing: false
        })
      }, 500)
    })
  }
  renderItem(item) {
    item = item.item.route
    return (
      <TouchableOpacity style={styles.item} title="Press me" onPress={() => this.state.navigation.navigate('Route', {
        routeName: item.routeName,
        routeID: item.routeID,
      })}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon style={styles.black} size={35} name="bus-outline" />
          <Text style={styles.itemText}>{item.routeName}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Loading />
      )
    }
    return (
      <BackgroundCustom  >
        
        <View style={styles.content}>
          <FlatList nestedScrollEnabled
            data={this.state.data}
            renderItem={(item) => this.renderItem(item)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh()}
              />
            }
          />
        </View>
        
      </BackgroundCustom>
    )

  };

}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    paddingStart: 10,
    flex: 1,
    height: 50
  },
  itemText: {
    color: 'black',
    fontSize: 19,
    paddingStart: 10
  },

  black: {
    color: 'black'
  }

})