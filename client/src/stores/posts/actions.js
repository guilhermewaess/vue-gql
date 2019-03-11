import { gql } from 'apollo-boost';
import { SET_POSTS } from './mutationTypes';

import apolloClient from '../../apolloClient';

export async function getPosts({ commit }) {
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
}

export function test() {}
