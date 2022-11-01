import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from 'react-native-device-info'
import { create } from "react-test-renderer";
export function getHost() {
    return DeviceInfo.isEmulator()?'http://95.179.246.191:8080/api':'http://95.179.246.191:8080/api'
}
let Api = axios.create({
    baseURL: getHost(),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});
export function LogOut() {
    
    Api = axios.create({
        baseURL: getHost(),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    AsyncStorage.removeItem("access_token")
}
export async function APILogIn(username,password) {
    
    let data = JSON.stringify({
        username: username,
        password: password
    })
    
    const response = await Api.post('/auth/authenticate', data)
    

    Api = axios.create({
        baseURL: getHost(),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ response.data
        }
    });
    AsyncStorage.setItem("access_token", response.data)
    return response.data;
}
export async function getRoutes() {
   
    const response = await Api.get( '/district/931/route').catch((err)=>{
        console.error(err)
    });
    return response.data
}
export async function getStations() {
    const response = await Api.get( '/district/931/station',);
    return response.data
}
export async function getRoute(routeID){
    const response = await Api.get( '/route/'+routeID);
    return response.data
}
export async function getRouteTimes(routeID){
    const response = await Api.get( '/route/'+routeID+'/times');
    return response.data
}
export async function getVersion(){
    const response = await Api.get( '/version');
    return response.data
}
export async function getRefreshToken(token) {
    let data = JSON.stringify({
        username: "omer.twd@gmail.com",
        password: "123456"
    })
    return response.data;
}


export async function isLoggedIn(){
    return await AsyncStorage.getItem("access_token")!=null
}
export async function getStorageToken(){
    return await AsyncStorage.getItem("access_token")
}