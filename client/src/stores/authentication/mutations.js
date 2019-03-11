import { LOGIN } from './mutationTypes';

export default {
  [LOGIN](state) {
    state.isLogged = true;
  },
};
