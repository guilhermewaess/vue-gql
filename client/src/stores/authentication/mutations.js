import {
  LOGIN, UPDATE_TOKEN, SIGN_OUT, REFRESH_USER,
} from './mutationTypes';

export default {
  [LOGIN](state, payload) {
    state.user = payload;
    state.isLogged = true;
  },
  [UPDATE_TOKEN](state, payload) {
    state.token = payload;
  },
  [SIGN_OUT](state) {
    state.token = null;
    state.user = null;
    state.isLogged = false;
  },
  [REFRESH_USER](state, payload) {
    state.user = payload;
  },
};
