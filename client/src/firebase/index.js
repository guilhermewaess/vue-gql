import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.VUE_APP_FB_APIKEY,
  authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
  appId: process.env.VUE_APP_FB_APP_ID,
};

firebase.initializeApp(config);
