import mutations from './mutations';
import * as actions from './actions';

const state = {
  isLogged: false,
  user: null,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
