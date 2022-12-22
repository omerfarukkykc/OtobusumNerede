import React from 'react'
import { View, Text, Button, StyleSheet, ToastAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { ApiClient } from '../../../../Network/ApiClient';

export default class Station extends React.Component {
  constructor({ route, navigation }) {
    super()
    const { stationID, stationName } = route.params
    this.apiClient = new ApiClient()
    this.state = {
      stationID: stationID,
      stationName: stationName,
      visible: false,
      isFavorite:false
    }
  }
  componentDidMount(){
    this.apiClient.getFavorites().then((res)=>{
      res.stations.map((prop,key)=>{
        if(prop.station.stationID == this.state.stationID){
          this.setState({
            isFavorite:true
          })
        }
      })
    })
  }
  openPanel = () => {

  }

  toggleFavorite= ()=>{
    this.apiClient.addFavoriteStation(this.state.stationID).then((res)=>{
      ToastAndroid.show((res=="")?"Favorilerden Çıkarıldı":"Favorilere Eklendi",ToastAndroid.SHORT)
      this.setState({
        isFavorite:(res=="")?false:true
      })
    }).catch((err)=>{
        ToastAndroid.show("Favorilere Eklenemedi",ToastAndroid.SHORT)
    })
  }
  toggleButtons = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.header}>
          <View style={styles.headerGroup}>
            <Icon style={{ color: 'white' }} size={40} name="flag-outline" />
            <View>
              <Text style={styles.smartStation}>Akıllı Durak</Text>
              <Text style={styles.stationName}>{this.state.stationName}</Text>
            </View>
          </View>
          <Text style={styles.routesText}>Yaklaşan Otobüsler</Text>
        </View>
        <View style={styles.buttonGroup}>
          {this.state.visible &&
            <View style={styles.toggelledButtons}>
              <TouchableOpacity style={styles.button} onPress={() => { this.openPanel() }}  >
                <Text style={styles.buttonText}>
                  Durak Bilgi
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => { this.toggleFavorite() }}  >
                <Text style={styles.buttonText}>
                  {this.state.isFavorite?
                    "Favori Çıkar":"Favori Ekle"
                  }
                </Text>
              </TouchableOpacity>
            </View>
          }
          <TouchableOpacity style={[styles.button, styles.toggleButton]} onPress={() => { this.toggleButtons() }}  >
            <Text style={styles.buttonText}>
              Seçenekler
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#307efc',
    paddingTop: 10,
    paddingStart: 5
  },
  headerGroup: {
    flexDirection: 'row',
    paddingBottom: 15
  },
  smartStation: {
    color: "white",
    paddingHorizontal: 5,
    fontSize: 20
  },
  stationName: {
    color: "white",
    paddingLeft: 5
  },
  routesText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 17,
    paddingBottom: 5
  },
  button: {
    margin: 5,
    width: 100,
    borderRadius: 10,
    backgroundColor: 'rgba(120, 153, 212, 1)',
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
  },
  buttonGroup: {
    right: 0,
    bottom: 0,
    margin: 5,
    position: 'absolute',
  },
  toggleButton: {
    backgroundColor: '#f9a03f',
  },
  toggelledButtons: {

  }

})