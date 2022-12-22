import React from 'react'
import { View,Text,Button } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import FavoriteRoutes from './FavoriteRoutes'
import FavoriteStations from './FavoriteStations'
export default function Favorites({navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Favori Hatlar"  component={FavoriteRoutes} />
      <Tab.Screen name="Favori Duraklar" component={FavoriteStations} />
    </Tab.Navigator>
  );
}