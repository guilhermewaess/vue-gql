import { SET_LOADING } from './mutationTypes';

export default {
  [SET_LOADING](state, payload) {
    state.loading = payload;
  },
};
