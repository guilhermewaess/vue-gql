import firebase from 'firebase-admin'

// const config = require('../firebase-sdk.json')

export const initFirebase = () => {
  const config = JSON.parse(process.env.FIREBASE)
  firebase.initializeApp({
    credential: firebase.credential.cert(config),
    databaseURL: 'https://vue-gql-guiwaess.firebaseio.com'
  })
}
