import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearDenuncia, subirImagen, obtenerUbicaciones } from "../firebase/firestoreService.js";

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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
}

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
      if (archivo.size > 5 * 1024 * 1024) { // 5MB límite
        alert(`La imagen ${archivo.name} es muy grande. Máximo 5MB.`);
        continue;
      }

      setImagenesSubiendo(prev => [...prev, archivo.name]);
      
      try {
        const imagenData = await subirImagen(archivo);
        setImagenes(prev => [...prev, imagenData]);
      } catch (error) {
        console.error("Error al subir imagen:", error);
        alert(`Error al subir ${archivo.name}`);
      } finally {
        setImagenesSubiendo(prev => prev.filter(nombre => nombre !== archivo.name));
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