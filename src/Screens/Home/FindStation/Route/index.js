import React from 'react'
import { View,Text,Button } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import RouteMap from './RouteMap'
import RouteTimes from './RouteTimes'
export default function Route({route,navigation}) {
    
  return (
    <Tab.Navigator>
      <Tab.Screen name="Otobüsüm Nerede" component={RouteMap} initialParams={{route: route.params}} />
      <Tab.Screen name="Hat Hareket Saatleri" component={RouteTimes} initialParams={{route: route.params}}/>
    </Tab.Navigator>
  );
}