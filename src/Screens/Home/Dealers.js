import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import Loading from '../../Components/Loading';
import { ApiClient } from '../../Network/ApiClient';
export default class Dealers extends React.Component {
  constructor(props) {
    super(props);
    this.apiClient = new ApiClient();
    this.state = {
      data: [],
      isLoading: true,

      latitude: 42,
      longitude: 31,
      latitudeDelta: 0.095,
      longitudeDelta: 0.0221,

    }
  }
  componentDidMount() {
    this.apiClient.getDealers().then((res) => {
      var latitude = 0
      var longitude = 0
      res.forEach(element => {
        latitude += element.location.latitude
        longitude += element.location.longitude
      });
      latitude /= res.length
      longitude /= res.length

      this.setState({
        data: res,

        latitude: latitude,
        longitude: longitude,


      })
    }).finally(() => {
      setTimeout(() => {
        this.setState({
          isLoading: false
        })
      }, 500)
    })
  }
  render() {
    if (this.state.isLoading) {
      return (<Loading />)
    }

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_DEFAULT} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: this.state.longitude,
            longitude: this.state.latitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}>
          {
            this.state.data.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.longitude,
                    longitude: marker.location.latitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                  }}
                  title={marker.dealerName}
                  icon={
                    require('../../Assets/mipmap-xxxhdpi/stopmark.png')
                  }
                />
              )
            })
          }
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});