import { LOGIN } from './mutationTypes';

export default {
  [LOGIN](state, payload) {
    state.isLogged = true;
    state.user = payload;
  },
};
