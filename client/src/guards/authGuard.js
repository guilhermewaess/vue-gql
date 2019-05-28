import store from '../store';

export default (to, from, next) => {
  if (store.getters['auth/isLogged']) {
    next();
  } else {
    next({ name: 'signin' });
  }
};
