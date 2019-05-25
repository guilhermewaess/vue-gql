import { LOGIN, UPDATE_TOKEN } from './mutationTypes';

export default {
  [LOGIN](state, payload) {
    state.isLogged = true;
    state.user = payload;
  },
  [UPDATE_TOKEN](state, payload) {
    state.token = payload;
  },
};
