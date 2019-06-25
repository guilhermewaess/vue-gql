import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = JSON.parse(process.env.VUE_APP_FIREBASE);

firebase.initializeApp(config);
