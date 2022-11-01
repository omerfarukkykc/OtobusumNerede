import React, { useRef } from 'react';
import {View, Text, Button,StyleSheet,Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE,PROVIDER_DEFAULT,Marker,Callout, Polyline} from 'react-native-maps';
import { getRoute } from '../../../../../Network/Api';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class RouteMap extends React.Component{
    
    constructor({props,route,navigation}){
        super(props)
        const {routeName ,routeID} = route.params.route
        this.state = {
            routeName:routeName,
            routeID:routeID,
            data:[],
            isLoading : true,
            longitude:0,
            latitude:0,
            isPanelActive:false,
            latitudeDelta: 0.095,
            longitudeDelta: 0.0221,
            markers : [],
            routeLine: [],
            isRouteLineG:true,
        }
        
        
    }
    componentDidMount(){
        getRoute(this.state.routeID).then((item)=>{
            var latitude = 0
            var longitude = 0
            item.stations.forEach(element => {
                latitude += element.location.latitude
                longitude += element.location.longitude
            });
            latitude /= item.stations.length
            longitude /= item.stations.length
            this.setState({
                data:item,
                routeLine:item.routeLineG,
                latitude:latitude,
                longitude:longitude,
                isLoading:false
            })
            
        })
        
    }
    fixRegion = () => {
        var latitude = 0
        var longitude = 0
        var index = 0
        this.state.data.stations.forEach(element => {
            if(this.state.isRouteLineG&& element.direction == "G"){
                latitude += element.location.latitude
                longitude += element.location.longitude
                index+=1
            }else if(!this.state.isRouteLineG&& element.direction == "D"){
                latitude += element.location.latitude
                longitude += element.location.longitude
                index+=1
            }
            
        });
        latitude /= index
        longitude /= index
        this.setState({
            latitude:latitude,
            longitude:longitude,
            latitudeDelta: 0.095,
            longitudeDelta: 0.0221,
        })
    }
    openPanel = () => {
        this.setState({
            isPanelActive:true,
            ready: false
        })
        
    };
    changeDirection = () => {
        if(this.state.isRouteLineG){
            this.setState({
                routeLine:this.state.data.routeLineD,
                isRouteLineG: false
            })
        }else{
            this.setState({
                routeLine:this.state.data.routeLineG,
                isRouteLineG: true
            })
        }
        this.fixRegion()
    };
    
    closePanel = () => {
        this.setState({
            isPanelActive:false
        })
    };
    focusLocation = (marker,latitude,longitude) => {
        this.closePanel()
        marker.showCallout();
        this.setState({
            latitude:latitude,
            longitude:longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.0121
        })
    };
    getMarker = (prop,key) => {
        
        
    };
    getStatonInfo = (prop,key) => {
        var index = 0
        return this.state.data.stations.map((prop, key) => {
            if(this.state.isRouteLineG && prop.direction == "D"){
            }else if(!this.state.isRouteLineG && prop.direction == "G"){
            }else{
                //console.log(this.state.markers.find((item,idx)=>{ return idx ==key}))
                index+=1
                return (
                    <TouchableOpacity key={key} onPress={()=>this.focusLocation(this.state.markers.find((item,idx)=>{ return idx ==key}),prop.location.latitude,prop.location.longitude)}>
                        <View style={{
                        width: '100%',
                        paddingBottom:10,
                        flexDirection:'row',
                        alignItems:'center'
                        }}>
                            <View style={{
                                width: 30,
                                height: 30,
                                backgroundColor:'green',
                                borderRadius:20,
                                justifyContent:'center',
                                alignItems:'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize:15
                                    
                                }}>
                                {index}
                                </Text>
                            </View>
                            <Text style={{
                                paddingLeft:20,
                                fontWeight:'700',
                                color: 'black',
                                fontSize:15
                            }}>
                                {prop.stationName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        })
        
    };
    render (){
        
        if(!this.state.isLoading){
            return(
                <View style={styles.container}>
                    
                    <MapView.Animated
                        provider={PROVIDER_DEFAULT} // remove if not using Google Maps
                        style={styles.map}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        region={
                            {
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta:  this.state.latitudeDelta,
                            longitudeDelta: this.state.longitudeDelta,
                            }}>
                            <Polyline
                                coordinates={this.state.routeLine}
                                strokeColor="#0e1736" // fallback for when `strokeColors` is not supported by the map-provider
                                strokeWidth={5}
                            />
                        {
                            this.state.data.stations.map((prop, key) => {
                                if(this.state.isRouteLineG && prop.direction == "D"){
                                }else if(!this.state.isRouteLineG && prop.direction == "G"){
                                }else{
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
                                                (prop.sequence == 1)?require('../../../../../Assets/mipmap-xxxhdpi/startmark.png'):
                                                (prop.sequence == this.state.data.stations.length?require('../../../../../Assets/mipmap-xxxhdpi/stopmark.png'):require('../../../../../Assets/mipmap-xxxhdpi/statmark.png'))
                                            }
                                        >
                                            <Callout>
                                                <View >
                                                    <Text style={{
                                                        color: 'black',
                                                    }}>
                                                        {prop.stationName}
                                                    </Text>
                                                </View>
                                            </Callout>
                                        </Marker>
                                    )
                                }
                            })
                        }
                    </MapView.Animated>
                    <View
                        style={{
                            position: 'absolute',
                            top: 18, 
                            left: 18,
                            alignSelf: 'flex-end',
                            borderRadius:20 
                            
                        }}
                    >
                        <Button onPress={()=>{this.changeDirection()}} title='Yön Değiştir'/>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 18, 
                            left: 18,
                            alignSelf: 'flex-end' 
                        }}
                    >
                        <Button onPress={()=>{this.openPanel()}} title='Hat Bilgi'/>
                    </View>
                    <SwipeablePanel 
                        fullWidth={true}
                        openLarge={true}
                        showCloseButton={true}
                        onClose={() => this.closePanel()}
                        onPressCloseButton={() => this.closePanel()}
                        isActive={this.state.isPanelActive}
                        >
                            
                    <View style={{
                        padding: 30,
                    }}>
                    {
                        this.getStatonInfo()
                    }
                    </View>
                    </SwipeablePanel>
                </View>
                )
        }
        
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