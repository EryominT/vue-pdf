import { store } from "@/store";
import $api from "@/api/http";
import { DocumentGetParamsInterface } from "@/interfaces/documents.interface";

export async function geDocumentsApi(getParams: DocumentGetParamsInterface) {
	store.commit('startLoading');
	try {
		return await $api.get(`/docs${getParams.paramName && getParams.paramValue ? '?'+getParams.paramName+'='+getParams.paramValue : ''}`);
	} catch (e: any) {
		let errorText = 'Данные не удалось обновить. Попробуйте повторить попытку позже';
		let isCritical = false;

		if (e?.response?.status !== 401) {
			store.dispatch('alerts/add', {
				text: errorText,
				timeout: 5000,
				critical: isCritical,
			});
		}

		throw new Error(e);
	} finally {
		store.commit('stopLoading');
	}
}