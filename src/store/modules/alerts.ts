import { ActionContext } from "vuex";
import { MessageAlertInterface } from "@/interfaces/alert.interface";

interface stateType {
	messages: MessageAlertInterface[],
	lastAI: number,
}

export default {
	namespaced: true,
	state: {
		messages: [],
		lastAI: 0,
	},
	getters: {
		all: (state: stateType) => state.messages,
	},
	mutations: {
		add(state: stateType, { text, critical }: any) {
			state.messages.push({ id: ++state.lastAI, text, critical });
		},
		remove(state: stateType, { id }: any) {
			state.messages = state.messages.filter((msg: any) => msg.id !== id);
		},
	},
	actions: {
		add({ commit, state }: ActionContext<stateType, any>, { text, timeout, critical }: MessageAlertInterface) {
			commit('add', { text, critical });
			const { lastAI } = state;

			if (!critical) {
				setTimeout(() => {
					commit('remove', { id: lastAI });
				}, timeout);
			}
		},
	},
};
