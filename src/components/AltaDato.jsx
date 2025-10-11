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

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.titulo.trim()) {
      setMensaje('El título es obligatorio');
      return;
    }

    if (!formData.descripcion.trim()) {
      setMensaje('La descripción es obligatoria');
      return;
    }

    if (!formData.tipo.trim()) {
      setMensaje('Debe seleccionar un tipo de denuncia');
      return;
    }

    if (!formData.ubicacion.trim()) {
      setMensaje('La ubicación es obligatoria');
      return;
    }

      if (!formData.comisaria.trim()) {
      setMensaje('Debe seleccionar una comisaría');
      return;
    }

    try {
      setCargando(true);
      setMensaje('');

      const denunciaData = {
        titulo: formData.titulo.trim(),
        descripcion: formData.descripcion.trim(),
        tipo: formData.tipo,
        ubicacion: formData.ubicacion.trim(),
        direccion: formData.direccion.trim(),
        comisaria: formData.comisaria,
        coordenadas: formData.coordenadas,
        imagenes: imagenes
      };

      const id = await crearDenuncia(denunciaData);
      
      setMensaje('Denuncia registrada exitosamente');
      console.log('Denuncia creada con ID:', id);
      
      // Limpiar formulario
      setFormData({
        titulo: '',
        descripcion: '',
        tipo: '',
        ubicacion: '',
        direccion: '',
        comisaria: '',
        coordenadas: { lat: '', lng: '' }
      });
      setImagenes([]);

          // Notificar al componente padre si existe la función
      if (onDenunciaAgregada) {
        onDenunciaAgregada();
      }

    } catch (error) {
      setMensaje('Error al registrar la denuncia: ' + error.message);
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  const limpiarFormulario = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      tipo: '',
      ubicacion: '',
      direccion: '',
      comisaria: '',
      coordenadas: { lat: '', lng: '' }
    });
    setImagenes([]);
    setMensaje('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Registrar Nueva Denuncia</h2>
        
        {mensaje && (
          <div className={`mb-4 p-4 rounded ${
            mensaje.includes('Error') || mensaje.includes('obligatorio') || mensaje.includes('Debe')
              ? 'bg-red-100 border border-red-400 text-red-700'
              : 'bg-green-100 border border-green-400 text-green-700'
          }`}>
            {mensaje}
          </div>
        )}

         <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
              Título de la Denuncia *
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Robo en zona comercial"
              required
            />
          </div>

          
