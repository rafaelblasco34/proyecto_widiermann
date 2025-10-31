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
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from './config.js';

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


export const obtenerUsuarios = async () => {
  try {
    const usuariosRef = collection(db, 'usuarios');
    const querySnapshot = await getDocs(usuariosRef);
    
    const usuarios = [];
    querySnapshot.forEach((doc) => {
      usuarios.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return usuarios;
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    throw error;
  }
};

export const verificarUsuarioExistente = async (username, email) => {
  try {
    const usuarios = await obtenerUsuarios();
    const usuarioExistente = usuarios.find(
      u => u.username === username || u.email === email
    );
    return usuarioExistente !== undefined;
  } catch (error) {
    console.error('Error verificando usuario existente:', error);
    throw error;
  }
};

export const crearUsuario = async (usuarioData) => {
  try {
    const usuariosRef = collection(db, 'usuarios');
    const docRef = await addDoc(usuariosRef, {
      ...usuarioData,
      fechaCreacion: new Date(),
      activo: true,
      rol: usuarioData.rol || 'usuario'
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creando usuario:', error);
    throw error;
  }
};

export const obtenerDenunciasPorUsuario = async (userId) => {
  try {
    const denunciasRef = collection(db, 'denuncias');
    const q = query(
      denunciasRef, 
      where('usuarioId', '==', userId),
      orderBy('fecha', 'desc')
    );
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
    console.error('Error obteniendo denuncias por usuario:', error);
    throw error;
  }
};


export const obtenerDenunciasPorEstado = async (estado) => {
  try {
    const denunciasRef = collection(db, 'denuncias');
    const q = query(
      denunciasRef, 
      where('estado', '==', estado),
      orderBy('fecha', 'desc')
    );
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
    console.error('Error obteniendo denuncias por estado:', error);
    throw error;
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
    console.error('Error subiendo imagen:', error);
    throw error;
  }
};

// Subida con progreso, notifica porcentaje [0..100]
export const subirImagenConProgreso = (archivo, onProgress, carpeta = 'denuncias') => {
  return new Promise((resolve, reject) => {
    try {
      const nombreArchivo = `${Date.now()}_${archivo.name}`;
      const imagenRef = ref(storage, `${carpeta}/${nombreArchivo}`);
      const task = uploadBytesResumable(imagenRef, archivo);

      task.on('state_changed', (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (typeof onProgress === 'function') onProgress(percent);
      }, (error) => {
        reject(error);
      }, async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve({ nombre: nombreArchivo, url, ruta: task.snapshot.ref.fullPath });
      });
    } catch (error) {
      reject(error);
    }
  });
};


export const obtenerUbicaciones = async () => {
  try {
    const ubicacionesRef = collection(db, 'ubicaciones');
    const querySnapshot = await getDocs(ubicacionesRef);
    
    const ubicaciones = [];
    querySnapshot.forEach((doc) => {
      ubicaciones.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return ubicaciones;
  } catch (error) {
    console.error('Error obteniendo ubicaciones:', error);
    throw error;
  }
};


export const crearUbicacion = async (ubicacionData) => {
  try {
    const ubicacionesRef = collection(db, 'ubicaciones');
    const docRef = await addDoc(ubicacionesRef, {
      ...ubicacionData,
      fechaCreacion: new Date()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creando ubicación:', error);
    throw error;
  }
};


export const obtenerComisarias = async () => {
  try {
    const comisariasRef = collection(db, 'comisarias');
    const querySnapshot = await getDocs(comisariasRef);
    
    const comisarias = [];
    querySnapshot.forEach((doc) => {
      comisarias.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return comisarias;
  } catch (error) {
    console.error('Error obteniendo comisarias:', error);
    throw error;
  }
};


export const crearComisaria = async (comisariaData) => {
  try {
    const comisariasRef = collection(db, 'comisarias');
    const docRef = await addDoc(comisariasRef, {
      ...comisariaData,
      fechaCreacion: new Date()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creando comisaria:', error);
    throw error;
  }
};