import firebase from 'firebase/app';
import router from '../../router';
import apolloClient from '../../apolloClient';
import { SIGIN_WITH_SOCIAL, GET_USER } from './queries';
import {
  LOGIN, UPDATE_TOKEN, SIGN_OUT, REFRESH_USER,
} from './mutationTypes';

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
  router.push({ name: 'home' });
}

export async function onAppStartLogin({ commit }) {
  try {
    const { data: { getUser } } = await apolloClient.query({
      query: GET_USER,
      skip() {
        return true;
      },
    });
    const user = getUser;
    commit(LOGIN, user);
  } catch (error) {
    commit(UPDATE_TOKEN, null);
    router.push({ name: 'signin' });
  }
}

export async function refreshUserData({ commit }) {
  try {
    const { data: { getUser } } = await apolloClient.query({
      query: GET_USER,
      skip() {
        return true;
      },
      fetchPolicy: 'network-only',
    });
    const user = getUser;
    commit(REFRESH_USER, user);
  } catch (error) {
    console.log(error);
  }
}

export async function signOut({ commit }) {
  try {
    await firebase.auth().signOut();
    await apolloClient.resetStore();

    commit(SIGN_OUT);
    router.push({ name: 'home' });
  } catch (error) {
    console.error(error);
  }
}

export function loginWithFacebook() {}
