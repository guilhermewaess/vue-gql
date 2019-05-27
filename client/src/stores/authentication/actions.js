import firebase from 'firebase/app';
import router from '../../router';
import apolloClient from '../../apolloClient';
import { SIGIN_WITH_SOCIAL, GET_USER } from './queries';
import { LOGIN, UPDATE_TOKEN } from './mutationTypes';

// import { LOGIN } from './mutationTypes';

export async function loginWithGoogle({ commit }) {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  await firebase.auth().signInWithPopup(googleProvider);
  const token = await firebase.auth().currentUser.getIdToken();
  const { data: { signInWithSocial } } = await apolloClient.mutate({
    mutation: SIGIN_WITH_SOCIAL,
    variables: { token },
  });

  commit(LOGIN, signInWithSocial);
  commit(UPDATE_TOKEN, token);
}

export async function onAppStartLogin({ commit }) {
  try {
    const { data: { getUser } } = await apolloClient.query({
      query: GET_USER,
    });
    const user = getUser;
    commit(LOGIN, user);
  } catch (error) {
    commit(UPDATE_TOKEN, null);
    router.push({ name: 'signin' });
  }
}

export function loginWithFacebook() {}
