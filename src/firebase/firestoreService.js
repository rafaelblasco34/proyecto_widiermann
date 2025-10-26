import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  getDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config.js';
// Obtener todas las denuncias
export const obtenerDenuncias = async () => {
  try {
    const denunciasRef = collection(db, 'denuncias');
    const q = query(denunciasRef, orderBy('fecha', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const denuncias = [];
    querySnapshot.forEach((doc) => {
      denuncias.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return denuncias;
  } catch (error) {
    console.error('Error obteniendo denuncias:', error);
    throw error;
  }
};


