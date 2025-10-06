import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { obtenerDenuncias } from "../firebase/firestoreService.js";

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [denuncia, setDenuncia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDenuncia = async () => {
      try {
        setLoading(true);
        const denuncias = await obtenerDenuncias();
        const denunciaEncontrada = denuncias.find((d) => d.id === parseInt(id));
        
        if (denunciaEncontrada) {
          setDenuncia(denunciaEncontrada);
        } else {
          setError("Denuncia no encontrada");
        }
      } catch (err) {
        setError("Error al cargar la denuncia");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarDenuncia();
  }, [id]);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Resuelto":
        return "bg-green-100 text-green-800";
      case "En proceso":
        return "bg-yellow-100 text-yellow-800";
      case "En investigación":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
