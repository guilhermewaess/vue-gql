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
  onError: (error) => {
    if (error.networkError) {
      console.error('[NetworkError]', error.networkError);
    }

    if (error.graphQLErrors) {
      console.dir('GraphQLError', error.graphQLErrors);
    }

    console.log({ error });
  },
});
