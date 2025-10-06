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