import { useState, useEffect } from "react";
import { obtenerUbicaciones, crearUbicacion } from "../firebase/firestoreService.js";

export default function GestionUbicaciones() {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    coordenadas: { lat: "", lng: "" },
    tipo: "",
    descripcion: ""
  });

  useEffect(() => {
    const cargarUbicaciones = async () => {
      try {
        setLoading(true);
        const ubicacionesData = await obtenerUbicaciones();
        setUbicaciones(ubicacionesData);
      } catch (err) {
        setError("Error al cargar las ubicaciones");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarUbicaciones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ubicacionId = await crearUbicacion(form);
     alert(`Ubicaicon creada exitosamente con ID: ${usuarioId}`);
      setForm({ nombre: "", direccion: "", coordenadas: { lat: "", lng: "" }, tipo: "", descripcion: "" });
      setMostrarFormulario(false);
      const ubicacionesData = await obtenerUbicaciones();
      setUbicaciones(ubicacionesData);
    } catch (error) {
      console.error("Error al crear ubicación:", error);
      alert("Error al crear la ubicación");
    }
  };
