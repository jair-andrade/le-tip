import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    headerValue: { currency: 0, symbol: '' },
  },
  mutations: {
    setHeaderValue(state, value) {
      state.headerValue = value;
    },
  },
  actions: {
    updateHeaderValue({ commit }, value) {
      commit("setHeaderValue", value);
    },
  },
  getters: {
    headerValue: (state) => state.headerValue,
  },
});
