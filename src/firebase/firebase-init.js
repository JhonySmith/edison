import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from './firebase-config.js';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const authorization = firebaseApp.auth();
export const dataBase = firebaseApp.firestore();
export const dbEventsConfig = dataBase.collection('state').doc('config');
export const dbUsers = dataBase.collection('state').doc('users');
