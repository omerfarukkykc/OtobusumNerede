import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native'
import { Callout, Marker } from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icon from 'react-native-vector-icons/Ionicons';
import { SwipeablePanel } from 'rn-swipeable-panel';
export default class CustomSwipePanel extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <SwipeablePanel
                fullWidth={true}
                openLarge={true}
                showCloseButton={true}
                onClose={this.props.onClose}
                onPressCloseButton={this.props.onClose}
                isActive={this.props.isActive}
            >
                <View style={{ padding: 30 }}>
                    {
                        this.getStatonInfo(
                            this.props.stations,
                            this.props.isRouteLineG, 
                            this.props.markers, 
                            this.props.focusCallBack)
                    }
                </View>
            </SwipeablePanel>
        )
    }
    getStatonInfo = () => {
        var index = 0
        return this.props.stations.map((prop, key) => {
            if (this.props.isRouteLineG && prop.direction == "D") {
                return
            }
            if (!this.props.isRouteLineG && prop.direction == "G") {
                return
            }
            index += 1
            return (<SwipablePanelItem 
                key={index} index={index} onPress={() =>{
                    this.props.focusCallBack(this.props.markers.find((item, idx) => { return idx == key }), prop.location.latitude, prop.location.longitude)
            }}
            stationName={prop.stationName} 
            />)
            
        })
    
    };
}

export function SwipablePanelItem({key,index,onPress,stationName}) {
    return (
        <TouchableOpacity key={key} onPress={onPress}>
            <View style={styles.itemContent}>
                <View style={styles.itemCircle}>
                    <Text style={styles.itemIndex}>
                        {index}
                    </Text>
                </View>
                <Text style={styles.itemStationName}>
                    {stationName}
                </Text>
            </View>
        </TouchableOpacity>
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
    itemCircle:{
        width: 30,
        height: 30,
        backgroundColor: 'green',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContent: {
        width: '100%',
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemStationName:{
        paddingLeft: 20,
        fontWeight: '700',
        color: 'black',
        fontSize: 15
    },
    itemIndex:{
        color: 'white',
        fontSize: 15

    }
})
