import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Inicializar Storage con configuración explícita para evitar problemas CORS
let storage;
try {
  storage = getStorage(app, firebaseConfig.storageBucket);
  console.log('Firebase Storage inicializado correctamente:', firebaseConfig.storageBucket);
} catch (error) {
  console.error('Error inicializando Firebase Storage:', error);
  storage = getStorage(app);
}

export { storage };