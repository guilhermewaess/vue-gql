// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import apolloClient from '../../apolloClient';
import SIGIN_WITH_SOCIAL from './queries';
import { LOGIN } from './mutationTypes';

// import { LOGIN } from './mutationTypes';

export async function loginWithGoogle({ commit }) {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(googleProvider);

  const { data: { signInWithSocial } } = await apolloClient.mutate({
    mutation: SIGIN_WITH_SOCIAL,
    variables: { token: await firebase.auth().currentUser.getIdToken() },
  });

  commit(LOGIN, signInWithSocial)
}

export function test() {}
