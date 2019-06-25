import ApolloClient from 'apollo-boost';
import store from './store';

export default new ApolloClient({
  uri: process.env.VUE_APP_API,
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: store.getters['auth/getToken'] || '',
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.error('[NetworkError]', networkError);
    }

    if (graphQLErrors) {
      console.dir('GraphQLError', graphQLErrors);
    }
  },
});
