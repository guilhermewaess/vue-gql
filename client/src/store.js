import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from './stores/authentication';
import posts from './stores/posts';
import ui from './stores/ui';

Vue.use(Vuex);
const persitedState = createPersistedState({
  paths: ['auth.token'],
});

export default new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    posts,
    ui,
  },
  plugins: [persitedState],
  strict: true,
});
