import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerDenuncias } from "../firebase/firestoreService.js";

export default function Denuncias() {
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