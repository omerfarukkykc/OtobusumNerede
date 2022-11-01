import React from 'react'
import { createStackNavigator} from '@react-navigation/stack';
import Stations from './Stations'
import BalanceQuery from './BalanceQuery'
import BusTime from './BusTime'
import FindBus from './FindBus'
import Welcome from './Welcome'
import Dealers from './Dealers'
import FindStation from './FindStation'
import Route from './FindStation/Route';
import Station from './FindStation/Station';

const Stack = createStackNavigator();
export default function TabA() {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Yetkili Bayi ve Kart Merkezleri" component={Dealers} />
        <Stack.Screen name="Otobüsüm Nerede" component={FindBus} />
        <Stack.Screen name="Hat Hareket Saatleri" component={BusTime} />
        <Stack.Screen name="Bakiye Sorgulama" component={BalanceQuery} />
        <Stack.Screen name="Akıllı Duraklar" component={Stations} />
        <Stack.Screen name="Hat ve Durak Arama" component={FindStation} />
        <Stack.Screen name="Route" component={Route} />
        <Stack.Screen name="Station" component={Station} />

    </Stack.Navigator>
    );
  }