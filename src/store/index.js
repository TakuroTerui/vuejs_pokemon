import Vue from "vue";
import Vuex from "vuex";
import count from "./modules/count";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: "",
    token: ""
  },
  getters,
  mutations,
  actions,
  plugins: [createPersistedState(
    {
      key: 'appName',
      storage: window.sessionStorage
    }
  )],
  modules: {
    count
  }
});