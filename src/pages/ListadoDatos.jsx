import React, { useState, useEffect } from 'react';
import { obtenerDenuncias, eliminarDenuncia, actualizarDenuncia } from '../firebase/firestoreService.js';
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
      alert(Estado actualizado a: ${nuevoEstado});
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