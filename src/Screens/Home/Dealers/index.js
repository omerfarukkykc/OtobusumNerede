import React from 'react';
import {View, Text, Button,StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE,PROVIDER_DEFAULT} from 'react-native-maps';
export default function Dealers({navigation}) {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.025,
          longitudeDelta: 0.0021,
        }}></MapView>
    </View>
  );
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