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
    async getUser() {
        const api = await createApi();
        try {
            const response = await api.get('/auth/user');
            return response.data;
        } catch (error) {
            console.error(error);
        }
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
    async getVersion() {
        const api = await createApi();
        const response = await api.get('/version');
        return response.data
    }
}
