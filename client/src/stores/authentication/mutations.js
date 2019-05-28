import { LOGIN, UPDATE_TOKEN, SIGN_OUT } from './mutationTypes';

export default {
  [LOGIN](state, payload) {
    state.isLogged = true;
    state.user = payload;
  },
  [UPDATE_TOKEN](state, payload) {
    state.token = payload;
  },
  [SIGN_OUT](state) {
    state.token = null;
    state.user = null;
    state.isLogged = false;
  },
};
