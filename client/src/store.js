import Vue from 'vue';
import Vuex from 'vuex';
import auth from './stores/authentication';
import posts from './stores/posts';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    posts,
  },
  strict: true,
});
