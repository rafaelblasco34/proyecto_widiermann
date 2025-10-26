import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAkYKDv-ewuBxiQWojq1NHi64BJRcuUyf8",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "proyecto-widi-b83ae.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "proyecto-widi-b83ae",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "proyecto-widi-b83ae.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "631199394536",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:631199394536:web:894399e5dc16c813f9f75d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)
src/firebase/firestoreService.js

