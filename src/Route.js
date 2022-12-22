import React from 'react';
import {Button, View, Text,StyleSheet} from 'react-native';
import {createDrawerNavigator,DrawerItem} from '@react-navigation/drawer';
import {getFocusedRouteNameFromRoute, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SidebarMenu from './Components/SideBarMenu';
import Home from './Screens/Home';
import Favorites from './Screens/Favorites';
import Balance from './Screens/Balance';
import FeedBack from './Screens/Options/FeedBack';
import LostStuff from './Screens/Options/LostStuff';
import Settings from './Screens/Options/Settings';
import Register from './Screens/Options/Register';
import LogIn from './Screens/Options/LogIn';
import {ApiClient} from './Network/ApiClient';
import Loading from './Components/Loading';
const Tab = createBottomTabNavigator();



function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Anasayfa') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Ulaşım Kartlarım') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Favorilerim') {
            iconName = focused ? 'star' : 'star-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarHideOnKeyboard:true,
        
      })}>
      <Tab.Screen name="Anasayfa" component={Home} options={({ route }) => ({
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
              if (routeName != "" && routeName != "Welcome") {
                return { display: "none" }
              }
              return
            })(route),
          })} />
      <Tab.Screen name="Ulaşım Kartlarım" component={Balance} />
      <Tab.Screen name="Favorilerim" component={Favorites} />
    </Tab.Navigator>
  );
}


const Drawer = createDrawerNavigator();
export default class Route extends React.Component {
  constructor(){
    super()
    this.state = {
      isLoading:true
    }
    setTimeout(()=>{
      this.setState({
        isLoading:false
      })
    },3000)
  }


  render() {
    if(this.state.isLoading){
      return(<Loading name={"BARULAŞ"}></Loading>)
    }
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <SidebarMenu {...props} />}
          screenOptions={{headerShown: false}}>
          <Drawer.Screen
            options={{
              title: 'Anasayfa',
              drawerIcon: ({focused, size}) => (
                <Ionicons
                  name="md-home"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
            name="Home"
            component={HomeScreen}
          />
          <Drawer.Screen
            options={{
              title: 'İletişim ve Geri Bildirim',
              drawerIcon: ({focused, size}) => (
                <Ionicons
                  name="chatbox"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
            name="İletişim ve Geri Bildirim"
            component={FeedBack}
          />
          <Drawer.Screen
            options={{
              title: 'Kayıp Eşya',
              drawerIcon: ({focused, size}) => (
                <Ionicons
                  name="briefcase"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
            name="Kayıp Eşya"
            component={LostStuff}
          />
          
          <Drawer.Screen
            options={{
              title: 'Ayarlar',
              drawerIcon: ({focused, size}) => (
                <Ionicons
                  name="settings"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
            name="Ayarlar"
            component={Settings}
          />
          <Drawer.Screen
            options={{
              title: 'Kayıt ol',
              drawerIcon: ({focused, size}) => (
                <Ionicons
                  name="add-circle"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
            name="Kayıt Ol"
            component={Register}
          />
          <Drawer.Screen
            options={{
              title: 'Giriş Yap',
              drawerIcon: ({focused, size}) => (
                <Ionicons
                  name="log-in"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
            name="Giriş Yap"
            component={LogIn}
          />
          
        </Drawer.Navigator>
      </NavigationContainer>
    );
    
  }
}
