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
        setMensaje(`La imagen ${archivo.name} es muy grande. Máximo 5MB.`);
        continue;
      }

      setImagenesSubiendo(prev => [...prev, archivo.name]);
      
      try {
        const imagenData = await subirImagen(archivo);
        setImagenes(prev => [...prev, imagenData]);
      } catch (error) {
        console.error("Error al subir imagen:", error);
        setMensaje(`Error al subir ${archivo.name}`);
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

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Denuncia *
              </label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecciona un tipo</option>
                {tiposDenuncia.map(tipo => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

              <div>
              <label htmlFor="comisaria" className="block text-sm font-medium text-gray-700 mb-2">
                Comisaría *
              </label>
              <select
                id="comisaria"
                name="comisaria"
                value={formData.comisaria}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecciona una comisaría</option>
                {comisarias.map(comisaria => (
                  <option key={comisaria} value={comisaria}>
                    {comisaria}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación del Incidente *
            </label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Parque Central, Calle Principal"
              required
            />
          </div>

          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
              Dirección Específica
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Dirección exacta (opcional)"
            />
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="lat" className="block text-sm font-medium text-gray-700 mb-2">
                Latitud
              </label>
              <input
                type="number"
                id="lat"
                name="lat"
                value={formData.coordenadas.lat}
                onChange={handleCoordenadasChange}
                step="any"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: -34.6037"
              />
            </div>

              <div>
              <label htmlFor="lng" className="block text-sm font-medium text-gray-700 mb-2">
                Longitud
              </label>
              <input
                type="number"
                id="lng"
                name="lng"
                value={formData.coordenadas.lng}
                onChange={handleCoordenadasChange}
                step="any"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: -58.3816"
              />
            </div>
          </div>

           <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción Detallada *
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe detalladamente lo que ocurrió..."
              required
            />
          </div>

           <div>
            <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes del Incidente
            </label>
            <input
              type="file"
              id="imagenes"
              multiple
              accept="image/*"
              onChange={handleImagenChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">Máximo 5MB por imagen</p>
            
            {imagenesSubiendo.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-blue-600">Subiendo imágenes...</p>
                {imagenesSubiendo.map((nombre, index) => (
                  <p key={index} className="text-xs text-gray-500">• {nombre}</p>
                ))}
              </div>
               )}

            {imagenes.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                {imagenes.map((imagen, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={imagen.url} 
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => eliminarImagen(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={limpiarFormulario}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={cargando}
            >
              Limpiar
            </button>
            <button
              type="submit"
              disabled={cargando || imagenesSubiendo.length > 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {cargando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Registrando...
                </>
              ) : (
                'Registrar Denuncia'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AltaDato;

