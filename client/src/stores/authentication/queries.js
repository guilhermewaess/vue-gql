import { gql } from 'apollo-boost';

// mutations
const SIGIN_WITH_SOCIAL = gql`
  mutation($token: String!) {
    signInWithSocial(token: $token) {
      userId
      userName
      email
      emailVerified
      password
      avatar
      joinDate
      token
    }
  }
`;

export default SIGIN_WITH_SOCIAL;
