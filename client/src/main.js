import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';
import apolloClient from './apolloClient';
import './firebase';
import './plugins/vuetify';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(VueApollo);

// const defaultClient = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
// });
const apolloProvider = new VueApollo({ defaultClient: apolloClient });

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  store,
  created() {
    const token = store.getters['auth/getToken'];
    if (token) {
      store.dispatch('auth/onAppStartLogin');
    }
  },
  render: h => h(App),
}).$mount('#app');
