import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerDenuncias } from "../firebase/firestoreService.js";
import { FaExclamationTriangle, FaClock, FaCheckCircle, FaSearch, FaFilter, FaPlus } from "react-icons/fa";

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
        return "status-resolved";
      case "En proceso":
        return "status-in-progress";
      case "En investigación":
        return "status-investigation";
      default:
        return "status-pending";
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "Resuelto":
        return <FaCheckCircle className="text-success-600" />;
      case "En proceso":
        return <FaClock className="text-warning-600" />;
      case "En investigación":
        return <FaExclamationTriangle className="text-primary-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };
    if (loading) {
    return (
      <div className="container-page">
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft">
            <FaExclamationTriangle className="text-white text-3xl" />
          </div>
          <h3 className="text-2xl font-heading font-semibold text-gray-700 mb-2">Cargando denuncias...</h3>
          <p className="text-gray-500">Por favor espera un momento</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-page">
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="text-white text-3xl" />
          </div>
          <h3 className="text-2xl font-heading font-semibold text-gray-700 mb-2">Error al cargar</h3>
          <p className="text-gray-500 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }
    return (
    <div className="container-page">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold gradient-text mb-4">
            Denuncias Registradas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Consulta el estado y seguimiento de todas las denuncias
          </p>
        </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">{denuncias.length}</div>
            <div className="text-gray-600 font-medium">Total Denuncias</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-success-600 mb-2">
              {denuncias.filter(d => d.estado === "Resuelto").length}
            </div>
            <div className="text-gray-600 font-medium">Resueltas</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-warning-600 mb-2">
              {denuncias.filter(d => d.estado === "En proceso").length}
            </div>
            <div className="text-gray-600 font-medium">En Proceso</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {denuncias.filter(d => d.estado === "En investigación").length}
            </div>
            <div className="text-gray-600 font-medium">En Investigación</div>
          </div>
        </div>
                <div className="space-y-4">
          {denuncias.map((denuncia, index) => (
            <div 
              key={denuncia.id} 
              className="card hover:shadow-medium transition-all duration-300 cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={`/denuncias/${denuncia.id}`} className="block">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-heading font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                        {denuncia.titulo}
                      </h3>
                      <span className={`${getEstadoColor(denuncia.estado)} flex items-center gap-2`}>
                        {getEstadoIcon(denuncia.estado)}
                        {denuncia.estado}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {denuncia.descripcion}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {denuncia.fecha}
                      </span>
                      <span className="text-primary-600 font-medium group-hover:underline">
                        Ver detalles →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {denuncias.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="text-white text-4xl" />
            </div>
            <h3 className="text-2xl font-heading font-semibold text-gray-700 mb-4">
              No hay denuncias registradas
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Las denuncias aparecerán aquí una vez que sean registradas en el sistema.
            </p>
            <Link to="/denuncias/nueva" className="btn btn-primary">
              <FaPlus className="mr-2" />
              Crear Primera Denuncia
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}