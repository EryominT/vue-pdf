import axios from "axios";
import {AuthResponse} from "@/interfaces/auth.interface";
import { store } from "@/store";

const $api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BASE_URL,
});

$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        try {
            originalRequest._isRetry = true;
            const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_BASE_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            store.commit('auth/logout');
            store.dispatch('alerts/add', {
                text: 'Время сессии истекло',
                timeout: 5000,
                critical: true,
            });
            setTimeout(() => {
                location.reload();
            }, 5000);
        }
    }
    throw error;
})

export default $api;

