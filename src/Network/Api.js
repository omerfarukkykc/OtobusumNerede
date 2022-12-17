import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const host = 'http://10.0.2.2:8080/api';
const getToken = async (username, password) =>{
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
    
    token = await getToken(username,password);    
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