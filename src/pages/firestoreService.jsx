import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const firebaseConfig = {
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
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
      numeroExpediente: `EXP-${Date.now()}`,
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

export const obtenerUsuarios = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const usuarios = [];
    
    querySnapshot.forEach((doc) => {
      usuarios.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return usuarios;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const crearUsuario = async (usuarioData) => {
  try {
    const docRef = await addDoc(collection(db, "usuarios"), {
      ...usuarioData,
      createdAt: new Date(),
      activo: usuarioData.activo !== false
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};
export const actualizarUsuario = async (id, datos) => {
  try {
    const usuarioRef = doc(db, "usuarios", id);
    await updateDoc(usuarioRef, datos);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

export const eliminarUsuario = async (id) => {
  try {
    await deleteDoc(doc(db, "usuarios", id));
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

export const subirImagen = async (archivo, carpeta = 'denuncias') => {
  try {
    const nombreArchivo = `${Date.now()}_${archivo.name}`;
    const imagenRef = ref(storage, `${carpeta}/${nombreArchivo}`);
    
    const snapshot = await uploadBytes(imagenRef, archivo);
    const url = await getDownloadURL(snapshot.ref);
    
    return {
      nombre: nombreArchivo,
      url: url,
      ruta: snapshot.ref.fullPath
    };
  } catch (error) {
    console.error("Error al subir imagen:", error);
    throw error;
  }
};

export const eliminarImagen = async (rutaImagen) => {
  try {
    const imagenRef = ref(storage, rutaImagen);
    await deleteObject(imagenRef);
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    throw error;
  }
};

export const obtenerUbicaciones = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "ubicaciones"));
    const ubicaciones = [];
    
    querySnapshot.forEach((doc) => {
      ubicaciones.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return ubicaciones;
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error);
    throw error;
  }
};

export const crearUbicacion = async (ubicacionData) => {
  try {
    const docRef = await addDoc(collection(db, "ubicaciones"), {
      ...ubicacionData,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al crear ubicación:", error);
    throw error;
  }
};
