import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: '#607d8b',
    secondary: '#009688',
    accent: '#03a9f4',
    error: '#f44336',
    warning: '#ff9800',
    info: '#00bcd4',
    success: '#4caf50',
  },
});
