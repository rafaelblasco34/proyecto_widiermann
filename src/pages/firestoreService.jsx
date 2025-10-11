import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const firebaseConfig = {
  // Tu configuración de Firebase aquí
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// Funciones para denuncias con imágenes
export const obtenerDenuncias = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "denuncias"));
    const denuncias = [];
    
    querySnapshot.forEach((doc) => {
      denuncias.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return denuncias;
  } catch (error) {
    console.error("Error al obtener denuncias:", error);
    throw error;
  }
};

export const crearDenuncia = async (denunciaData) => {
  try {
    const docRef = await addDoc(collection(db, "denuncias"), {
      ...denunciaData,
      fecha: new Date().toISOString().split('T')[0],
      estado: "En proceso",
      numeroExpediente: EXP-${Date.now()},
      createdAt: new Date(),
      imagenes: denunciaData.imagenes || []
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al crear denuncia:", error);
    throw error;
  }
};

export const actualizarDenuncia = async (id, datos) => {
  try {
    const denunciaRef = doc(db, "denuncias", id);
    await updateDoc(denunciaRef, datos);
  } catch (error) {
    console.error("Error al actualizar denuncia:", error);
    throw error;
  }
};

export const eliminarDenuncia = async (id) => {
  try {
    await deleteDoc(doc(db, "denuncias", id));
  } catch (error) {
    console.error("Error al eliminar denuncia:", error);
    throw error;
  }
};