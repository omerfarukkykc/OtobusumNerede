import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info'
const demoServer = 'http://209.250.237.146:8080/api';
const server = 'http://10.0.2.2:8080/api';
const getHost = async () =>{
    const isEmulator = await  DeviceInfo.isEmulator()
    return (isEmulator)?server:demoServer;
}
const getToken = async (username, password,host) =>{
    try {
        token = await AsyncStorage.getItem('access_token');
        if(token == null){
            throw new Error("Token not found");
        }
        return token;

    } catch (ex) {
        let data = JSON.stringify({
            username: username,
            password: password
        })
        return await axios.create({
            baseURL: host,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).post('/auth/authenticate', data).then((response)=>{
            AsyncStorage.setItem('access_token',response.data);
            return response.data;
        })
    }
}
export const createApi = async (username,password) => {
    const host = await getHost();  
    token = await getToken(username,password,host);    
    const api = axios.create({
        baseURL: host,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    try{
        if(await api.get('/version').status == 403){
            throw new Error("Token expired");
        }
    }
    catch(ex){
        await AsyncStorage.removeItem('access_token');
        return createApi(username,password);
    }
    return api;
};