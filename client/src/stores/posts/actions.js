import { SET_POSTS } from './mutationTypes';
import { SET_LOADING } from '../ui/mutationTypes';
import { GET_POSTS, ADD_POST } from './queries';
import apolloClient from '../../apolloClient';

export async function getPosts({ commit }) {
  try {
    commit(`ui/${SET_LOADING}`, true, { root: true });
    const { data } = await apolloClient.query({
      query: GET_POSTS,
    });

    commit(SET_POSTS, data.getPosts);
    console.log('TCL: getPosts -> posts', { result: data.getPosts });
  } catch (error) {
    console.log(error);
  } finally {
    commit(`ui/${SET_LOADING}`, false, { root: true });
  }
}

export async function addPost(_, post) {
  try {
    const { data } = await apolloClient.mutate({
      mutation: ADD_POST,
      variables: {
        post,
      },
    });

    console.log(data.addPost);
  } catch (error) {
    console.error(error);
  }
}
