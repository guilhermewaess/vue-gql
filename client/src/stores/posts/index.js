import mutations from './mutations';
import * as actions from './actions';
import getters from './getters';

const state = {
  posts: [],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
