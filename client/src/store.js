import Vue from 'vue';
import Vuex from 'vuex';
import auth from './stores/authentication';
import posts from './stores/posts';
import ui from './stores/ui';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    posts,
    ui,
  },
  strict: true,
});
