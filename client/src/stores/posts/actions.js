import { gql } from 'apollo-boost';
import { SET_POSTS } from './mutationTypes';
import { SET_LOADING } from '../ui/mutationTypes';
import apolloClient from '../../apolloClient';

export async function getPosts({ commit }) {
  try {
    commit(`ui/${SET_LOADING}`, true, { root: true });
    const { data } = await apolloClient.query({
      query: gql`
        query {
          getPosts {
            _id
            title
            imgUrl
          }
        }
      `,
    });

    commit(SET_POSTS, data.getPosts);
    console.log('TCL: getPosts -> posts', { result: data.getPosts });
  } catch (error) {
    console.log(error);
  } finally {
    commit(`ui/${SET_LOADING}`, false, { root: true });
  }
}

export function test() {}
