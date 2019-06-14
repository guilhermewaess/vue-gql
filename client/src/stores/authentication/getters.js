export const getToken = state => state.token;
export const isLogged = state => state.isLogged;
export const user = state => state.user;
export const userFavorites = (_, getters) => (getters.user ? getters.user.favorites : []);
