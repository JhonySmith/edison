import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from './firebase-config.js';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const dataBase = firebaseApp.database();