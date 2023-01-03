import axios from "axios";
import $api from '@/api/http';
import { AuthDataInterface } from "@/interfaces/auth.interface";

export async function loginApi(authData: AuthDataInterface) {
	try {
		return await $api.post('/login', authData);
	} catch (e: any) {
		throw new Error(e.response.data.message);
	}
}
export async function registrationApi(authData: AuthDataInterface) {
	try {
		return await $api.post('/registration', authData);
	} catch (e: any) {
		throw new Error(e.response.data.message);
	}
}
export async function logoutApi() {
	try {
		return await $api.post('/logout');
	} catch (e: any) {
		throw new Error(e);
	}
}
export async function checkAuthApi() {
	try {
		return await axios.get(`${import.meta.env.VITE_BASE_URL}/refresh`, {withCredentials: true});
	} catch (e: any) {
		throw new Error(e);
	}
}