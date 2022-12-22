import AsyncStorage from '@react-native-async-storage/async-storage';
import LogIn from '../Screens/Options/LogIn';
import { createApi } from './Api';

export class ApiClient {
    constructor() {
    }
    static async logIn(username, password) {
        return await createApi(username, password);
    }
    static logOut(username, password) {
        AsyncStorage.removeItem('access_token');
    }
    async getUserId() {
        var userID = 0;
        userID = await AsyncStorage.getItem("userID");
        if(userID == null){
            const api = await createApi();
            const response = await api.get('/auth/user');
            userID = response.data;
            AsyncStorage.setItem("userID", String(response.data))
        }
        return userID;
    }
    async getRoutes() {
        const api = await createApi();
        const response = await api.get('/district/931/route').catch((err) => {
            console.error(err)
        });
        return response.data
    }
    async getStations() {
        const api = await createApi();
        const response = await api.get('/district/931/station',);
        return response.data
    }
    async getRoute(routeID) {
        const api = await createApi();
        const response = await api.get('/route/' + routeID);
        return response.data
    }
    async getRouteTimes(routeID) {
        const api = await createApi();
        const response = await api.get('/route/' + routeID + '/times');
        return response.data
    }
    async getBalance(userID) {
        const api = await createApi();
        const response = await api.get(`/users/${await this.getUserId()}/balance`);
        return response.data
    }
    async getBalanceLog(userID) {
        const api = await createApi();
        const response = await api.get(`/users/${await this.getUserId()}/balanceLogs/`);
        return response.data
    }
    async addFavoriteStation(stationID) {
        const api = await createApi();
        const response = await api.post(`/users/${await this.getUserId()}/favorites/station/${stationID}`);
        return response.data
    }
    async addFavoriteRoute(stationID) {
        const api = await createApi();
        const response = await api.post(`/users/${await this.getUserId()}/favorites/route/${stationID}`);
        return response.data
    }
    async getFavorites() {
        const api = await createApi();
        const response = await api.get(`/users/${await this.getUserId()}/favorites`);
        return response.data
    }
    async getVersion() {
        const api = await createApi();
        const response = await api.get('/version');
        return response.data
    }
}
