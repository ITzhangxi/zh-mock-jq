import { createStore } from "vuex";

export default createStore({
  state: {
    updateVisible: false,
    updateModel: {},
  },
  getters: {
    updateVisible(state) {
      return state.updateVisible;
    },
  },
  mutations: {
    setUpdateVisible(state, payload) {
      state.updateVisible = payload;
    },
  },
  actions: {},
  modules: {},
});
