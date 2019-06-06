import { gql } from 'apollo-boost';

export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      imgUrl
    }
  }
`;

export const ADD_POST = gql`
  mutation($post: AddPostInput!) {
    addPost(post: $post) {
      _id
      title
      imgUrl
      categories
      description
      likes
    }
  }
`;
