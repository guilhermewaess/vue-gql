import ApolloClient from 'apollo-boost';
import store from './store';

export default new ApolloClient({
  uri: 'http://localhost:4000/graphql',
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
      for (const err of graphQLErrors) {
        console.dir('GraphQLError', err);
      }
    }
  },
});
