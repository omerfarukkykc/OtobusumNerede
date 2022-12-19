import React, { useRef } from 'react';
import { View, Text, Button, StyleSheet, Image, BackHandler, LogBox, ToastAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT, Marker, Callout, Polyline } from 'react-native-maps';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ApiClient } from '../../../../Network/ApiClient';
import Loading from '../../../../Components/Loading';
import CustomMarker, { BusCallout, StationCallout } from './CustomMarker';
import CustomSwipePanel, { SwipablePanelItem, swipablePanelItem } from './CustomSwipePanel';
export default class RouteMap extends React.Component {

    constructor({ props, route, navigation }) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.apiClient = new ApiClient();
        const { routeName, routeID } = route.params.route
        this.state = {
            routeName: routeName,
            routeID: routeID,
            data: [],
            isLoading: true,
            longitude: 0,
            latitude: 0,
            isPanelActive: false,
            latitudeDelta: 0.095,
            longitudeDelta: 0.0221,
            markers: [],
            routeLine: [],
            isRouteLineG: true,
            intervalId: 0,
            busses: [],
            visible: false
        }
        LogBox.ignoreAllLogs()
    }

    componentDidMount() {
        this.apiClient.getRoute(this.state.routeID).then((item) => {
            var latitude = 0
            var longitude = 0
            item.stations.forEach(element => {
                latitude += element.location.latitude
                longitude += element.location.longitude
            });

            latitude /= item.stations.length
            longitude /= item.stations.length
            this.setState({
                data: item,
                routeLine: item.routeLineG,
                latitude: latitude,
                longitude: longitude,

            })
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
            var interID = setInterval(() => {
                this.apiClient.getRoute(this.state.routeID).then((res) => {
                    if (res.busses == null || res.busses == undefined) {
                        return
                    }
                    this.setState({
                        busses: res.busses
                    })
                }).catch((err) => {
                    console.log("Otobüs Konumu güncellenemedi: " + err)
                })

            }, 2000)
            this.setState({
                intervalId: interID
            })


        }).finally(() => {
            setTimeout(() => {
                this.setState({
                    isLoading: false,
                })
            }, 500)
        })

    }
    handleBackButtonClick() {
        clearInterval(this.state.intervalId)
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    fixRegion = () => {
        var latitude = 0
        var longitude = 0
        var index = 0
        this.state.data.stations.forEach(element => {
            if (this.state.isRouteLineG && element.direction == "G") {
                latitude += element.location.latitude
                longitude += element.location.longitude
                index += 1
            } else if (!this.state.isRouteLineG && element.direction == "D") {
                latitude += element.location.latitude
                longitude += element.location.longitude
                index += 1
            }

        });
        latitude /= index
        longitude /= index
        this.setState({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.095,
            longitudeDelta: 0.0221,
        })
    }
    openPanel = () => {
        this.setState({
            isPanelActive: true,
            ready: false
        })

    };
    changeDirection = () => {
        if (this.state.isRouteLineG) {
            this.setState({
                routeLine: this.state.data.routeLineD,
                isRouteLineG: false
            })
        } else {
            this.setState({
                routeLine: this.state.data.routeLineG,
                isRouteLineG: true
            })
        }
        this.fixRegion()
    };
    closePanel = () => {
        this.setState({
            isPanelActive: false
        })
    };
    focusLocation = (marker, latitude, longitude) => {
        this.closePanel()
        marker.showCallout();
        this.setState({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.0121
        })
    };
    toggleButtons = () => {
        this.setState({
            visible: !this.state.visible
        })
    }
    addFavorite(){
        this.apiClient.addFavoriteRoute(this.state.routeID).then((res)=>{
            ToastAndroid.show("Favorilere Eklendi",ToastAndroid.SHORT)
        }).catch((err)=>{
            ToastAndroid.show("Favorilere Eklenemedi",ToastAndroid.SHORT)
        })
    }
    render() {
        if (this.state.isLoading) {
            return (<Loading />)
        }

        return (
            <View style={styles.container}>
                <MapView.Animated provider={PROVIDER_DEFAULT} style={styles.map} showsUserLocation={true}
                    showsMyLocationButton={true}
                    region={
                        {
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: this.state.latitudeDelta,
                            longitudeDelta: this.state.longitudeDelta,
                        }}>
                    <Polyline
                        coordinates={this.state.routeLine}
                        strokeColor="#0e1736"
                        strokeWidth={4}
                    />
                    {
                        //Station Markers
                        this.state.data.stations.map((prop, key) => {
                            if (this.state.isRouteLineG && prop.direction == "D") {
                                return
                            }
                            if (!this.state.isRouteLineG && prop.direction == "G") {
                                return
                            }
                            return (
                                <Marker
                                    ref={(ref) => {
                                        this.state.markers.push(ref)
                                    }}
                                    coordinate={
                                        {
                                            latitude: prop.location.latitude,
                                            longitude: prop.location.longitude,
                                            latitudeDelta: 0.001,
                                            longitudeDelta: 0.001,
                                        }
                                    }
                                    key={key}
                                    icon={
                                        (prop.sequence == 1) ?
                                            require('../../../../Assets/mipmap-xxxhdpi/startmark.png') :
                                            (prop.sequence == this.state.data.stations.length ?
                                                require('../../../../Assets/mipmap-xxxhdpi/stopmark.png') :
                                                require('../../../../Assets/mipmap-xxxhdpi/statmark.png'))
                                    }
                                >
                                    <StationCallout stationName={prop.stationName} />
                                </Marker>
                            )

                        })
                    }
                    {
                        //Bus Markers
                        this.state.busses.filter(x => x.active == true).map((prop, key) => {
                            return (
                                <Marker
                                    coordinate={
                                        {
                                            latitude: prop.location.latitude,
                                            longitude: prop.location.longitude,
                                            latitudeDelta: 0.001,
                                            longitudeDelta: 0.001,
                                        }
                                    }
                                    key={key}
                                    icon={
                                        require('../../../../Assets/mipmap-xxxhdpi/busnewmark.png')
                                    }
                                >
                                    <BusCallout prop={prop} />
                                </Marker>
                            )
                        })
                    }
                </MapView.Animated>

                <View style={styles.buttonGroup}>

                    
                    {this.state.visible &&
                        <View style = {styles.toggelledButtons}>
                            <TouchableOpacity style={styles.button} onPress={() => { this.changeDirection() }}  >
                                <Text style={styles.buttonText}>
                                    Yön Değiştir
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => { this.openPanel() }}  >
                                <Text style={styles.buttonText}>
                                    Hat Bilgi
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => { this.addFavorite() }}  >
                                <Text style={styles.buttonText}>
                                    Favori
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <TouchableOpacity style={[styles.button,styles.toggleButton]} onPress={() => { this.toggleButtons() }}  >
                        <Text style={styles.buttonText}>
                            Seçenekler
                        </Text>
                    </TouchableOpacity>
                </View>
                <CustomSwipePanel
                    stations={this.state.data.stations}
                    isActive={this.state.isPanelActive}
                    onClose={this.closePanel}
                    isRouteLineG={this.state.isRouteLineG}
                    markers={this.state.markers}
                    focusCallBack={this.focusLocation}
                />
            </View>
        )

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
    toggleButton:{
        backgroundColor: '#f9a03f',
    },
    toggelledButtons: {
        
    }

});