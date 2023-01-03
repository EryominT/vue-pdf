import { ActionContext } from "vuex";
import { loginApi, registrationApi, logoutApi, checkAuthApi } from "@/api/auth.api";
import { AuthDataInterface, UserInfoInterface } from "@/interfaces/auth.interface";

interface stateType {
	token: string | null;
	isAuth: boolean;
	user: UserInfoInterface;
}

const TOKEN_KEY = 'token';

export default {
	namespaced: true,
	state: {
		token: localStorage.getItem(TOKEN_KEY),
		user: {},
		isAuth: false,
	},
	getters: {
		token(state: stateType) {
			return state.token;
		},
		isAuth(state: stateType, getters: stateType) {
			return !!getters.token;
		},
		user(state: stateType, getters: stateType) {
			return state.user;
		},
	},
	mutations: {
		setToken(state: stateType, token: string) {
			if (token) {
				state.token = token;
				localStorage.setItem(TOKEN_KEY, token);
			}
		},
		logout(state: stateType) {
			state.token = null;
			localStorage.removeItem(TOKEN_KEY);
		},
		setUser(state: stateType, user: any) {
			state.user = user;
		},
	},
	actions: {
		async login(context: ActionContext<stateType, any>, authData: AuthDataInterface) {
			const { data } = await loginApi(authData);
			context.commit('setToken', data.accessToken);
			context.commit('setUser', data.user);
		},
		async registration(context: ActionContext<stateType, any>, authData: AuthDataInterface) {
			const { data } = await registrationApi(authData);
			context.commit('setToken', data.token);
			context.commit('setUser', data.user);
		},
		async logout(context: ActionContext<stateType, any>, authData: AuthDataInterface) {
			await logoutApi();
			localStorage.removeItem('token');
			context.commit('logout');
			context.commit('setUser', {});
		},

		async checkAuth(context: ActionContext<stateType, any>) {
			const { data } = await checkAuthApi();
			context.commit('setToken', data.accessToken);
			context.commit('setUser', data.user);
		}
	},
}