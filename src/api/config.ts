import axios, { AxiosInstance } from 'axios';
import { baseURL } from './data';



// Base configuration for axios
const api: AxiosInstance = axios.create({
    baseURL: baseURL,
});

// Function to get the auth token from storage
const getAuthToken = (): string | null => localStorage.getItem('authToken');

// Interceptor to add token to headers of every request
api.interceptors.request.use(
    config => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';


        

        return config;
    },
    error => Promise.reject(error)
);


export default api;
