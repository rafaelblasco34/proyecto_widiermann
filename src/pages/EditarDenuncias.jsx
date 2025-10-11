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
   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await actualizarDenuncia(denuncia.id, form);
      alert('Denuncia actualizada exitosamente');
      onClose();
    } catch (err) {
      setError('Error al actualizar la denuncia');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };