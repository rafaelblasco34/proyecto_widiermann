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
export const obtenerDenuncia = async (id) => {
  try {
    const denunciaRef = doc(db, 'denuncias', id);
    const denunciaSnap = await getDoc(denunciaRef);
    
    if (denunciaSnap.exists()) {
      return {
        id: denunciaSnap.id,
        ...denunciaSnap.data()
      };
    } else {
      throw new Error('Denuncia no encontrada');
    }
  } catch (error) {
    console.error('Error obteniendo denuncia:', error);
    throw error;
  }
};

// Crear nueva denuncia
export const crearDenuncia = async (denunciaData) => {
  try {
    const denunciasRef = collection(db, 'denuncias');
    const docRef = await addDoc(denunciasRef, {
      ...denunciaData,
      fecha: new Date().toISOString(),
      estado: 'Pendiente',
      fechaCreacion: new Date()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creando denuncia:', error);
    throw error;
  }
};

// Actualizar denuncia
export const actualizarDenuncia = async (id, datosActualizados) => {
  try {
    const denunciaRef = doc(db, 'denuncias', id);
    await updateDoc(denunciaRef, {
      ...datosActualizados,
      fechaActualizacion: new Date()
    });
    
    return true;
  } catch (error) {
    console.error('Error actualizando denuncia:', error);
    throw error;
  }
};

// Eliminar denuncia
export const eliminarDenuncia = async (id) => {
  try {
    const denunciaRef = doc(db, 'denuncias', id);
    await deleteDoc(denunciaRef);
    
    return true;
  } catch (error) {
    console.error('Error eliminando denuncia:', error);
    throw error;
  }
};


