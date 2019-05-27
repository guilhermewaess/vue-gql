import { gql } from 'apollo-boost';

// mutations
export const SIGIN_WITH_SOCIAL = gql`
  mutation($token: String!) {
    signInWithSocial(token: $token) {
      userName
      email
      emailVerified
      avatar
      joinDate
    }
  }
`;

// queries
export const GET_USER = gql`
  query {
    getUser {
      userName
      email
      emailVerified
      avatar
      joinDate
    }
  }
`;
