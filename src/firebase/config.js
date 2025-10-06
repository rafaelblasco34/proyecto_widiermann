import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
<<<<<<< HEAD


=======
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyAkYKDv-ewuBxiQWojq1NHi64BJRcuUyf8",
  authDomain: "proyecto-widi-b83ae.firebaseapp.com",
  projectId: "proyecto-widi-b83ae",
  storageBucket: "proyecto-widi-b83ae.firebasestorage.app",
  messagingSenderId: "631199394536",
  appId: "1:631199394536:web:894399e5dc16c813f9f75d"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
>>>>>>> 9e74ba2833f27bbe190376ef69cfff72bcdae1e2
