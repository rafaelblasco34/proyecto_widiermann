import { useState } from 'react';
import { actualizarDenuncia } from '../firebase/firestoreService.js';

export default function EditarDenuncia({ denuncia, onClose }) {
  const [form, setForm] = useState({
    titulo: denuncia.titulo || '',
    descripcion: denuncia.descripcion || '',
    estado: denuncia.estado || 'En proceso',
    comisaria: denuncia.comisaria || '',
    tipo: denuncia.tipo || '',
    ubicacion: denuncia.ubicacion || '',
    direccion: denuncia.direccion || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };