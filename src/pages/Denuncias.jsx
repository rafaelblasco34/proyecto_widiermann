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
return (
    <div className="container-page">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Denuncias Registradas</h1>
          <p className="text-gray-600 mt-2">Consulta el estado de las denuncias</p>
        </div>

        <div className="grid gap-4">
          {denuncias.map((denuncia) => (
            <div key={denuncia.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
              <Link to={/denuncias/${denuncia.id}} className="block">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">{denuncia.titulo}</h3>
                    <p className="text-gray-600 mt-1">{denuncia.descripcion}</p>
                    <p className="text-sm text-gray-500 mt-2">Fecha: {denuncia.fecha}</p>
                  </div>
                  <span className={px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(denuncia.estado)}}>
                    {denuncia.estado}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {denuncias.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600">No hay denuncias registradas</h3>
            <p className="text-gray-500">Las denuncias aparecerán aquí una vez que sean registradas</p>
          </div>
        )}
      </div>
    </div>
|);
}