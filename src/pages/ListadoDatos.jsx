import React, { useState, useEffect } from 'react';
import { obtenerDenuncias, eliminarDenuncia, actualizarDenuncia } from './firestoreService.js';
import { Link } from 'react-router-dom';
import EditarDenuncia from './EditarDenuncia.jsx';

export default function ListadoDatos() {
  const [denuncias, setDenuncias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const cargarDenuncias = async () => {
      try {
        setLoading(true);
        const denunciasData = await obtenerDenuncias();
        setDenuncias(denunciasData);
      } catch (err) {
        setError("Error al cargar las denuncias");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarDenuncias();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta denuncia?')) {
      try {
        await eliminarDenuncia(id);
       setDenuncias(denuncias.filter(denuncia => denuncia.id !== id));
        alert('Denuncia eliminada exitosamente');
      } catch (error) {
        console.error("Error al eliminar denuncia:", error);
        alert('Error al eliminar la denuncia');
      }
    }
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarDenuncia(id, { estado: nuevoEstado });
      setDenuncias(denuncias.map(denuncia => 
        denuncia.id === id ? { ...denuncia, estado: nuevoEstado } : denuncia
      ));
      alert(`Estado actualizado a: ${nuevoEstado}`);
  } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert('Error al actualizar el estado');
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Resuelto":
        return "bg-green-100 text-green-800";
      case "En proceso":
        return "bg-yellow-100 text-yellow-800";
      case "En investigación":
        return "bg-blue-100 text-blue-800";
      case "Cerrado":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

if (loading) {
    return (
      <div className="container-page">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⏳</div>
          <h3 className="text-xl font-semibold text-gray-600">Cargando denuncias...</h3>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container-page">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠</div>
          <h3 className="text-xl font-semibold text-gray-600">Error al cargar</h3>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Listado de Denuncias</h1>
        <p className="text-gray-600">Gestiona todas las denuncias del sistema</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número de Expediente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {denuncias.map((denuncia) => (
                <tr key={denuncia.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {denuncia.numeroExpediente || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {denuncia.descripcion ? 
                      (denuncia.descripcion.length > 50 ? 
                        `${denuncia.descripcion.substring(0, 50)}...` : 
                        denuncia.descripcion) : 
                      'Sin descripción'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {denuncia.fecha || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(denuncia.estado)}`}>
                      {denuncia.estado || 'Sin estado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      to={`/denuncias/${denuncia.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Ver
                    </Link>
                    <Link
                      to={`/denuncias/editar/${denuncia.id}`}
                      className="text-green-600 hover:text-green-900"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleEliminar(denuncia.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                    <select
                      value={denuncia.estado || ''}
                      onChange={(e) => handleCambiarEstado(denuncia.id, e.target.value)}
                      className="ml-2 text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="En proceso">En proceso</option>
                      <option value="En investigación">En investigación</option>
                      <option value="Resuelto">Resuelto</option>
                      <option value="Cerrado">Cerrado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {denuncias.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-600">No hay denuncias</h3>
          <p className="text-gray-500">No se encontraron denuncias en el sistema</p>
        </div>
      )}
    </div>
  );
}