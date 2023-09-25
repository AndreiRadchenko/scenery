// import * as firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthErrorCodes,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAGFn8i7iCiS1i-csHsLtpI1wloSrSYO4M',
  authDomain: 'scenery-53dd5.firebaseapp.com',
  projectId: 'scenery-53dd5',
  storageBucket: 'scenery-53dd5.appspot.com',
  messagingSenderId: '79662982640',
  appId: '1:79662982640:web:98dfe37ad87fc22ecc6935',
  measurementId: 'G-FQLGS3MW5K',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
