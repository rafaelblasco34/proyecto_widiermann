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
            <select name="tipo" value={form.tipo} onChange={handleChange} className="w-full border p-2 rounded" >
               <option value="">Seleccionar tipo</option>
              <option value="robo">Robo</option>
              <option value="vandalismo">Vandalismo</option>
              <option value="ruidos">Ruidos molestos</option>
              <option value="violencia">Violencia</option>
              <option value="trafico">Tráfico</option>
              <option value="otros">Otros</option>
            </select>
           </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado *
            </label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="En proceso">En proceso</option>
              <option value="En investigación">En investigación</option>
              <option value="Resuelto">Resuelto</option>
              <option value="Cerrado">Cerrado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación
            </label>
            <input
              type="text"
              name="ubicacion"
              value={form.ubicacion}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Ubicación del incidente"
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección Específica
            </label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Dirección exacta"
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full border p-2 rounded h-20"
              required
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comisaría
            </label>
            <select
              name="comisaria"
              value={form.comisaria}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Seleccionar comisaría</option>
              <option value="central">Comisaría Central</option>
              <option value="2da">Comisaría 2da</option>
              <option value="3ra">Comisaría 3ra</option>
              <option value="4ta">Comisaría 4ta</option>
            </select>
          </div>
           <div className="flex gap-2">
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
