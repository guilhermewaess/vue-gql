import { SET_POSTS } from './mutationTypes';

export default {
  [SET_POSTS](state, payload) {
    state.posts = payload;
  },
};
