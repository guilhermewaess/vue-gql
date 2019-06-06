import { SET_POSTS } from './mutationTypes';
import { SET_LOADING } from '../ui/mutationTypes';
import { GET_POSTS, ADD_POST } from './queries';
import apolloClient from '../../apolloClient';
import router from '../../router';

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
    await apolloClient.mutate({
      mutation: ADD_POST,
      variables: {
        post,
      },
      update: (cache, { data: { addPost: addedPost } }) => {
        // read the query
        const cacheData = cache.readQuery({ query: GET_POSTS });
        // update data
        cacheData.getPosts.unshift(addedPost);
        // write back to the query
        cache.writeQuery({
          query: GET_POSTS,
          data: cacheData,
        });
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addPost: {
          __typename: 'Post',
          _id: -1,
          ...post,
        },
      },
    });
    router.push({ name: 'home' });
  } catch (error) {
    console.error(error);
  }
}
