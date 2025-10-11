import React, { useState } from 'react';
import { crearDenuncia, subirImagen } from '../firebase/firestoreService.js';

const AltaDato = ({ onDenunciaAgregada }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: '',
    ubicacion: '',
    direccion: '',
    comisaria: '',
    coordenadas: { lat: '', lng: '' }
  });
  const [imagenes, setImagenes] = useState([]);
  const [imagenesSubiendo, setImagenesSubiendo] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const tiposDenuncia = [
    'Robo',
    'Vandalismo',
    'Ruidos molestos',
    'Violencia',
    'Tráfico',
    'Fraude',
    'Otros'
  ];

  const comisarias = [
    'Comisaría Central',
    'Comisaría 2da',
    'Comisaría 3ra',
    'Comisaría 4ta',
    'Comisaría 5ta'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCoordenadasChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      coordenadas: {
        ...prev.coordenadas,
        [name]: value
      }
    }));
  };

  const handleImagenChange = async (e) => {
    const archivos = Array.from(e.target.files);
    
    for (const archivo of archivos) {
      if (archivo.size > 5 * 1024 * 1024) { // 5MB límite
        setMensaje(La imagen ${archivo.name} es muy grande. Máximo 5MB.);
        continue;
      }

      setImagenesSubiendo(prev => [...prev, archivo.name]);
      
      try {
        const imagenData = await subirImagen(archivo);
        setImagenes(prev => [...prev, imagenData]);
      } catch (error) {
        console.error("Error al subir imagen:", error);
        setMensaje(Error al subir ${archivo.name});
      } finally {
        setImagenesSubiendo(prev => prev.filter(nombre => nombre !== archivo.name));
      }
    }
  };

   const eliminarImagen = (index) => {
    setImagenes(prev => prev.filter((_, i) => i !== index));
  };

