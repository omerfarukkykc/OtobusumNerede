import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { BarIndicator } from 'react-native-indicators'
import LottieView from "lottie-react-native";
export default function Loading({ name }) {
    return (
        <View style={styles.container}>
            <View style={styles.animation}>
                <LottieView
                    source={require('../Assets/splashwait.json')}//
                    autoPlay
                    loop={true}
                    speed={1}
                />
            </View>
            {
                name != null ? 
                <Text style={styles.name}>
                    {name}
                </Text> : 
                <BarIndicator style={styles.indicator} size={40} color={"#6E4D42"} count={6}></BarIndicator>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    animation: {
        flex: 4,
        width: "80%",
        alignItems: 'center',
    },
    indicator:{
        flex: 3,
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#6E4D42"
    },
    name:{
        flex: 2,
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#6E4D42"
    }
})