import { initializeApp } from "firebase/app";
import {
  getDatabase,
  set,
  onValue,
  ref as dbRef,
  update,
  push as dbPush,
  child,
} from "firebase/database";
import {
  getStorage,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
  ref,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const database = getDatabase();

export {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
  listAll,
  set,
  onValue,
  update,
  dbRef,
  dbPush,
  child,
};
