import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

const state = {
  isLogged: false,
  user: null,
  token: null,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
