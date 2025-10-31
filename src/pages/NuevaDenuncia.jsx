import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearDenuncia, subirImagen, obtenerUbicaciones, subirImagenConProgreso } from "../firebase/firestoreService.js";

export default function NuevaDenuncia() {
  const [form, setForm] = useState({ 
    titulo: "", 
    descripcion: "", 
    comisaria: "",
    tipo: "",
    ubicacion: "",
    direccion: "",
    coordenadas: { lat: "", lng: "" }
  });
  const [imagenes, setImagenes] = useState([]);
  const [imagenesSubiendo, setImagenesSubiendo] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({}); // { nombreArchivo: porcentaje }
  const [urlImagen, setUrlImagen] = useState(""); // URL de imagen desde Drive u otro servicio
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!form.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio";
    } else if (form.titulo.trim().length < 5) {
      newErrors.titulo = "El título debe tener al menos 5 caracteres";
    }

    if (!form.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    } else if (form.descripcion.trim().length < 20) {
      newErrors.descripcion = "La descripción debe tener al menos 20 caracteres";
    }

    if (!form.comisaria.trim()) {
      newErrors.comisaria = "Debe seleccionar una comisaría";
    }

    if (!form.tipo.trim()) {
      newErrors.tipo = "Debe seleccionar un tipo de denuncia";
    }

    if (!form.ubicacion.trim()) {
      newErrors.ubicacion = "La ubicación es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImagenChange = async (e) => {
    const archivos = Array.from(e.target.files);
    
    if (archivos.length === 0) return;
    
    for (const archivo of archivos) {
      if (archivo.size > 5 * 1024 * 1024) { 
        alert(`La imagen ${archivo.name} es muy grande. Máximo 5MB.`);
        continue;
      }

      // Validar tipo de archivo
      if (!archivo.type.startsWith('image/')) {
        alert(`El archivo ${archivo.name} no es una imagen válida.`);
        continue;
      }

      setImagenesSubiendo(prev => [...prev, archivo.name]);
      setUploadProgress(prev => ({ ...prev, [archivo.name]: 0 }));
      
      try {
        console.log("Iniciando subida de imagen:", archivo.name);
        const imagenData = await subirImagenConProgreso(archivo, (percent) => {
          console.log(`Progreso de ${archivo.name}: ${percent}%`);
          setUploadProgress(prev => ({ ...prev, [archivo.name]: percent }));
        });
        
        console.log("Imagen subida exitosamente:", imagenData);
        setImagenes(prev => [...prev, imagenData]);
        
        // Limpiar el input después de subir exitosamente
        e.target.value = '';
      } catch (error) {
        console.error("Error completo al subir imagen:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        
        let errorMessage = `Error al subir ${archivo.name}`;
        
        // Manejo de errores específicos de Firebase Storage
        if (error.code) {
          switch(error.code) {
            case 'storage/unauthorized':
              errorMessage = `❌ No tienes permiso para subir imágenes. Verifica las reglas de Firebase Storage en Firebase Console.`;
              break;
            case 'storage/quota-exceeded':
              errorMessage = `❌ Se ha excedido la cuota de almacenamiento de Firebase.`;
              break;
            case 'storage/canceled':
              errorMessage = `❌ La subida de ${archivo.name} fue cancelada.`;
              break;
            case 'storage/invalid-format':
              errorMessage = `❌ El formato del archivo no es válido. Solo se permiten imágenes (jpg, png, gif, etc.).`;
              break;
            case 'storage/unauthenticated':
              errorMessage = `❌ No estás autenticado. Por favor, inicia sesión.`;
              break;
            default:
              errorMessage = `❌ Error ${error.code}: ${error.message || 'Error desconocido al subir la imagen'}`;
          }
        } else if (error.message) {
          errorMessage = `❌ Error: ${error.message}`;
        }
        
        console.error("Mensaje de error mostrado al usuario:", errorMessage);
        alert(errorMessage);
        setErrors({ general: errorMessage });
      } finally {
        setImagenesSubiendo(prev => prev.filter(nombre => nombre !== archivo.name));
        setUploadProgress(prev => {
          const { [archivo.name]: _, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const eliminarImagen = (index) => {
    setImagenes(prev => prev.filter((_, i) => i !== index));
  };

  // Convertir URL de Drive a formato directo
  const convertirUrlDrive = (url) => {
    // Si es un link de Drive compartido, convertir a formato de vista previa
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }
    // Si ya es una URL directa de imagen, devolverla tal cual
    return url;
  };

  // Validar y agregar URL de imagen
  const handleAgregarUrl = () => {
    if (!urlImagen.trim()) {
      setErrors({ ...errors, urlImagen: "Debes ingresar una URL válida" });
      return;
    }

    // Validar que sea una URL válida
    try {
      const urlObj = new URL(urlImagen.trim());
      const urlConvertida = convertirUrlDrive(urlImagen.trim());
      
      // Agregar la imagen usando la URL
      const nuevaImagen = {
        url: urlConvertida,
        nombre: urlObj.pathname.split('/').pop() || 'imagen.jpg',
        ruta: 'url-externa',
        tipo: 'url'
      };

      setImagenes(prev => [...prev, nuevaImagen]);
      setUrlImagen("");
      setErrors({ ...errors, urlImagen: "" });
    } catch (error) {
      setErrors({ ...errors, urlImagen: "URL no válida. Asegúrate de incluir http:// o https://" });
    }
  };

  const handleSubmit = async e => { 
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrors({});
      
      const denunciaData = {
        ...form,
        imagenes: imagenes,
        fechaCreacion: new Date(),
        estado: "En proceso"
      };
      
      const denunciaId = await crearDenuncia(denunciaData);
      alert(`Denuncia creada exitosamente con ID: ${denunciaId}`);
      console.log("DENUNCIA CREADA:", { id: denunciaId, ...denunciaData });
      navigate("/denuncias");
    } catch (error) {
      console.error("Error al crear denuncia:", error);
      setErrors({ general: "Error al crear la denuncia. Inténtalo de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-page">
      <form onSubmit={handleSubmit} className="card space-y-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold">Nueva denuncia</h2>
        
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.general}
          </div>
        )}
        
        <div>
          <input 
            name="titulo" 
            placeholder="Título de la denuncia" 
            className={`w-full border p-2 rounded-xl ${errors.titulo ? 'border-red-500' : ''}`}
            value={form.titulo} 
            onChange={handleChange}
            disabled={loading}
            required 
          />
          {errors.titulo && <p className="text-red-600 text-sm mt-1">{errors.titulo}</p>}
        </div>

        <div>
          <select
            name="tipo"
            className={`w-full border p-2 rounded-xl ${errors.tipo ? 'border-red-500' : ''}`}
            value={form.tipo}
            onChange={handleChange}
            disabled={loading}
            required
          >
            <option value="">Seleccionar tipo de denuncia</option>
            <option value="robo">Robo</option>
            <option value="vandalismo">Vandalismo</option>
            <option value="ruidos">Ruidos molestos</option>
            <option value="violencia">Violencia</option>
            <option value="trafico">Tráfico</option>
            <option value="otros">Otros</option>
          </select>
          {errors.tipo && <p className="text-red-600 text-sm mt-1">{errors.tipo}</p>}
        </div>

        <div>
          <input 
            name="ubicacion" 
            placeholder="Ubicación del incidente (ej: Parque Central, Calle Principal)" 
            className={`w-full border p-2 rounded-xl ${errors.ubicacion ? 'border-red-500' : ''}`}
            value={form.ubicacion} 
            onChange={handleChange}
            disabled={loading}
            required
          />
          {errors.ubicacion && <p className="text-red-600 text-sm mt-1">{errors.ubicacion}</p>}
        </div>

        <div>
          <input 
            name="direccion" 
            placeholder="Dirección específica (opcional)" 
            className="w-full border p-2 rounded-xl"
            value={form.direccion} 
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input 
              name="lat" 
              type="number" 
              step="any"
              placeholder="Latitud (opcional)" 
              className="w-full border p-2 rounded-xl"
              value={form.coordenadas.lat} 
              onChange={(e) => setForm({...form, coordenadas: {...form.coordenadas, lat: e.target.value}})}
              disabled={loading}
            />
          </div>
          <div>
            <input 
              name="lng" 
              type="number" 
              step="any"
              placeholder="Longitud (opcional)" 
              className="w-full border p-2 rounded-xl"
              value={form.coordenadas.lng} 
              onChange={(e) => setForm({...form, coordenadas: {...form.coordenadas, lng: e.target.value}})}
              disabled={loading}
            />
          </div>
        </div>
        
        <div>
          <textarea 
            name="descripcion" 
            placeholder="Descripción detallada del incidente" 
            className={`w-full border p-2 rounded-xl h-32 ${errors.descripcion ? 'border-red-500' : ''}`}
            value={form.descripcion} 
            onChange={handleChange}
            disabled={loading}
            required
          />
          {errors.descripcion && <p className="text-red-600 text-sm mt-1">{errors.descripcion}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imágenes del incidente
          </label>
          
          {/* Opción 1: Subir archivos (si tienes Firebase Storage) */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Opción 1: Subir archivos (máximo 5MB cada una)</p>
            <input 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleImagenChange}
              disabled={loading}
              className="w-full border p-2 rounded-xl"
            />
          </div>
          
          {/* Opción 2: Pegar URL de Drive u otro servicio */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">
              Opción 2: Pegar enlace de imagen (Drive, Imgur, etc.)
            </p>
            <div className="flex gap-2">
              <input 
                type="url" 
                placeholder="https://drive.google.com/file/d/... o URL directa de imagen"
                value={urlImagen}
                onChange={(e) => {
                  setUrlImagen(e.target.value);
                  if (errors.urlImagen) {
                    setErrors({ ...errors, urlImagen: "" });
                  }
                }}
                disabled={loading}
                className={`flex-1 input-field ${errors.urlImagen ? 'input-error' : ''}`}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAgregarUrl();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAgregarUrl}
                disabled={loading || !urlImagen.trim()}
                className="btn btn-primary px-4 py-2"
              >
                Agregar
              </button>
            </div>
            {errors.urlImagen && (
              <p className="text-red-600 text-sm mt-1">{errors.urlImagen}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              💡 Tip: En Google Drive, haz clic derecho en la imagen → "Obtener enlace" → copia y pega aquí
            </p>
          </div>
          
          {imagenesSubiendo.length > 0 && (
            <div className="mt-2 space-y-2">
              <p className="text-sm text-blue-700 font-medium">Subiendo imágenes...</p>
              {imagenesSubiendo.map((nombre) => (
                <div key={nombre} className="">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span className="truncate max-w-[70%]">{nombre}</span>
                    <span>{uploadProgress[nombre] ? `${uploadProgress[nombre]}%` : '0%'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
                    <div
                      className="bg-primary h-2 rounded"
                      style={{ width: `${uploadProgress[nombre] || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {imagenes.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Imágenes agregadas ({imagenes.length})
              </p>
              <div className="grid grid-cols-2 gap-2">
                {imagenes.map((imagen, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={imagen.url} 
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-24 object-cover rounded border"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
                        console.error('Error cargando imagen:', imagen.url);
                      }}
                    />
                    {imagen.tipo === 'url' && (
                      <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        URL
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => eliminarImagen(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      disabled={loading}
                      title="Eliminar imagen"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <select
            name="comisaria"
            className={`w-full border p-2 rounded-xl ${errors.comisaria ? 'border-red-500' : ''}`}
            value={form.comisaria}
            onChange={handleChange}
            disabled={loading}
            required
          >
            <option value="">Seleccionar comisaría</option>
            <option value="comisaria central">Comisaría Central</option>
            <option value="comisaria neuquen">Comisaría Neuquen</option>
            <option value="comisaria n°41">Comisaría N°41</option>
            <option value="comisaria N°17 La Sirena">Comisaría N°17 La Sirena</option>
            <option value="comisaria N°21">Comisaría N°21</option>
            <option value="comisaria n°3">Comisaría n°3</option>
            <option value="comisaria N°44">Comisaría N°44</option>
            <option value="comisaria N°18">Comisaría N°18</option> 
            <option value="comisaria Barrio Islas Malvinas">Comisaría Barrio Islas Malvinas</option>

          </select>
          {errors.comisaria && <p className="text-red-600 text-sm mt-1">{errors.comisaria}</p>}
        </div>
        
        <div className="flex gap-4">
          <button 
            type="submit" 
            className="btn btn-primary flex-1"
            disabled={loading || imagenesSubiendo.length > 0}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                Enviando...
              </>
            ) : (
              "Enviar denuncia"
            )}
          </button>
          <button 
            type="button" 
            onClick={() => navigate("/denuncias")} 
            className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}