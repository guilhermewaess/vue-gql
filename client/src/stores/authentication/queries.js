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
export const VALIDATE_TOKEN = gql`
  query($token: String!){
    validateToken(token: $token){
      userName
        email
        emailVerified
        avatar
        joinDate
    }
  }
`;