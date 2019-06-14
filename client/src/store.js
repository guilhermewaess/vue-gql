import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from './stores/authentication';
import ui from './stores/ui';

Vue.use(Vuex);
const persitedState = createPersistedState({
  paths: ['auth.token'],
});

export default new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    ui,
  },
  plugins: [persitedState],
  strict: false, // TODO: remove posts from vuex
});
