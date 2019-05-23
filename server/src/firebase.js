import firebase from 'firebase-admin'

const config = require('../firebase-sdk.json')

firebase.initializeApp({
  credential: firebase.credential.cert(config),
  databaseURL: 'https://vue-gql-guiwaess.firebaseio.com'
})
