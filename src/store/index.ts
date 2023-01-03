import { InjectionKey } from "vue";
import { createStore, Store } from "vuex"
import alerts from "@/store/modules/alerts";
import auth from "@/store/modules/auth";
import documents from "@/store/modules/documents";

export interface State {
  loading: boolean,
}

export const key: InjectionKey<Store<State>> = Symbol('injection Key');

export const store = createStore<State>({
  state: {
    loading: false,
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
  },
  actions: {},
  modules: {
    auth,
    documents,
    alerts,
  }
})