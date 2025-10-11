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
