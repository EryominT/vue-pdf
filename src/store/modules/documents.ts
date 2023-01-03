import { geDocumentsApi } from "@/api/documents.api";
import { DocumentGetParamsInterface } from "@/interfaces/documents.interface";
import { ActionContext } from "vuex";

interface stateType {};

export default {
	namespaced: true,
	state () {},
	getters: {},
	mutations: {},
	actions: {
		async getDocuments(context: ActionContext<stateType, any>, getParams: DocumentGetParamsInterface) {
			const { data } = await geDocumentsApi(getParams);
			return data;
		},
	},
};