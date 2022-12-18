import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { BarIndicator } from 'react-native-indicators'

export default function Loading({ name }) {



    return (
        <View style={{ position:'absolute', width: "100%", height: "100%", backgroundColor: "#f9a03f", alignItems: 'center' }}>
            <View style={{
                flex: 1,
                padding: 20,
                marginTop: "30%",
                alignItems: 'center'

            }}>
                
                    <Image
                        source={require('../Assets/logo.png')}
                        style={{ margin: 20, width: 300, height: 200 }}
                        tintColor="#110b11"
                    />
                    <Text style={
                        {
                            fontSize: 30,
                            fontWeight: "bold",
                            marginBottom: 20,
                            color: "#110b11"
                        }
                    }>{name}</Text>
            </View>
            <View style={
                {
                    flex: 2
                }}>
                <BarIndicator size={40} color={"#110b11"} count={6}></BarIndicator>
            </View>

        </View>
    )
}

