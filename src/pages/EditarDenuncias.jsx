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
   return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Editar Denuncia</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Denuncia
            </label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            ></select>