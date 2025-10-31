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
    
    for (const archivo of archivos) {
      if (archivo.size > 5 * 1024 * 1024) { 
        alert(`La imagen ${archivo.name} es muy grande. Máximo 5MB.`);
        continue;
      }

      setImagenesSubiendo(prev => [...prev, archivo.name]);
      
      try {
        const imagenData = await subirImagenConProgreso(archivo, (percent) => {
          setUploadProgress(prev => ({ ...prev, [archivo.name]: percent }));
        });
        setImagenes(prev => [...prev, imagenData]);
      } catch (error) {
        console.error("Error al subir imagen:", error);
        alert(`Error al subir ${archivo.name}`);
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
            Imágenes del incidente (máximo 5MB cada una)
          </label>
          <input 
            type="file" 
            multiple 
            accept="image/*"
            onChange={handleImagenChange}
            disabled={loading}
            className="w-full border p-2 rounded-xl"
          />
          
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
            <div className="mt-4 grid grid-cols-2 gap-2">
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
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    disabled={loading}
                  >
                    ×
                  </button>
                </div>
              ))}
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
