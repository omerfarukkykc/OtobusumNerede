import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native'
import { Callout, Marker } from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icon from 'react-native-vector-icons/Ionicons';
export default class CustomMarker extends React.Component {
    constructor(props){
        super(props)
        //{ key, ref, markerIcon, location }
    }
    render() {
        return (
            <Marker
                coordinate={
                    {
                        latitude: this.props.location.latitude,
                        longitude: this.props.location.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }
                }
                key={this.props.key}
                icon={
                    this.props.markerIcon
                }
            >
                {this.props.children}
            </Marker>
        )
    }
}

export function StationCallout({stationName}) {
    return (
        <Callout>
            <View >
                <Text style={{
                    color: 'black',
                }}>
                    {stationName}
                </Text>
            </View>
        </Callout>
    )
}
export function BusCallout({prop}) {
    return (
        <Callout>
        <View style={
            {
                padding: 10,
                alignItems: 'center'
            }
        } >
            <Text style={{
                color: 'black',
                padding: 2,
            }}>
                Marka : {prop.model.modelName}
            </Text>
            <Text style={{
                color: 'black',
                padding: 2,
            }}>
                Marka : {prop.brand.brandName}

            </Text >
            <Text style={{
                color: 'black',
                padding: 2,
            }}>
                Plaka : {prop.plate}
            </Text>
        </View>
    </Callout>
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
