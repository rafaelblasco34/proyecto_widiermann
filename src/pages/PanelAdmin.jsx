import { useState, useEffect } from "react";
import { obtenerDenuncias, eliminarDenuncia } from "../firebase/firestoreService.js";
import EditarDenuncia from "./EditarDenuncias.jsx";
import { 
  FaExclamationTriangle, 
  FaEdit, 
  FaTrash, 
  FaCheckCircle, 
  FaClock,
  FaSearch,
  FaFilter
} from "react-icons/fa";

export default function PanelAdmin() {
  const [denuncias, setDenuncias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [denunciaEditando, setDenunciaEditando] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarDenuncias();
  }, []);

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

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta denuncia?")) {
      return;
    }

    try {
      await eliminarDenuncia(id);
      alert("Denuncia eliminada exitosamente");
      cargarDenuncias();
    } catch (err) {
      alert("Error al eliminar la denuncia");
      console.error("Error:", err);
    }
  };

  const handleEditar = (denuncia) => {
    setDenunciaEditando(denuncia);
  };

  const handleCerrarEdicion = () => {
    setDenunciaEditando(null);
    cargarDenuncias();
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Resuelto":
        return "bg-green-100 text-green-800 border-green-300";
      case "En proceso":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "En investigación":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "Resuelto":
        return <FaCheckCircle className="text-green-600" />;
      case "En proceso":
        return <FaClock className="text-yellow-600" />;
      default:
        return <FaExclamationTriangle className="text-blue-600" />;
    }
  };

  // Filtrar denuncias
  const denunciasFiltradas = denuncias.filter(denuncia => {
    const coincideEstado = filtroEstado === "todos" || denuncia.estado === filtroEstado;
    const coincideBusqueda = 
      !busqueda || 
      denuncia.titulo?.toLowerCase().includes(busqueda.toLowerCase()) ||
      denuncia.descripcion?.toLowerCase().includes(busqueda.toLowerCase()) ||
      denuncia.id?.toLowerCase().includes(busqueda.toLowerCase());
    
    return coincideEstado && coincideBusqueda;
  });

  if (loading) {
    return (
      <div className="container-page">
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft">
            <FaExclamationTriangle className="text-white text-3xl" />
          </div>
          <h3 className="text-2xl font-heading font-semibold text-gray-700 mb-2">Cargando panel...</h3>
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
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold gradient-text mb-4">
            Panel de Administración
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gestiona y modifica todas las denuncias del sistema
          </p>
        </div>

        {/* Estadísticas */}
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

        {/* Filtros y búsqueda */}
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaSearch className="text-primary-600" />
                Buscar
              </label>
              <input
                type="text"
                placeholder="Buscar por título, descripción o ID..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaFilter className="text-primary-600" />
                Filtrar por estado
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="input-field"
              >
                <option value="todos">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En proceso">En proceso</option>
                <option value="En investigación">En investigación</option>
                <option value="Resuelto">Resuelto</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listado de denuncias */}
        <div className="space-y-4">
          {denunciasFiltradas.length === 0 ? (
            <div className="card text-center py-12">
              <FaExclamationTriangle className="text-4xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No se encontraron denuncias
              </h3>
              <p className="text-gray-500">
                {busqueda || filtroEstado !== "todos" 
                  ? "Intenta ajustar los filtros de búsqueda"
                  : "No hay denuncias registradas en el sistema"}
              </p>
            </div>
          ) : (
            denunciasFiltradas.map((denuncia) => (
              <div
                key={denuncia.id}
                className="card border-2 border-gray-100 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-heading font-bold text-gray-800 mb-1">
                          {denuncia.titulo || "Sin título"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ID: {denuncia.id}
                        </p>
                      </div>
                      <div className={`${getEstadoColor(denuncia.estado)} flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm whitespace-nowrap`}>
                        {getEstadoIcon(denuncia.estado)}
                        <span>{denuncia.estado || "Pendiente"}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-700 text-sm line-clamp-2">
                        {denuncia.descripcion || "Sin descripción"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      {denuncia.tipo && (
                        <div className="text-gray-600">
                          <span className="font-medium">Tipo:</span> {denuncia.tipo}
                        </div>
                      )}
                      {denuncia.ubicacion && (
                        <div className="text-gray-600">
                          <span className="font-medium">Ubicación:</span> {denuncia.ubicacion}
                        </div>
                      )}
                      {denuncia.comisaria && (
                        <div className="text-gray-600">
                          <span className="font-medium">Comisaría:</span> {denuncia.comisaria}
                        </div>
                      )}
                      <div className="text-gray-600">
                        <span className="font-medium">Fecha:</span>{" "}
                        {denuncia.fecha
                          ? (typeof denuncia.fecha === 'string'
                              ? new Date(denuncia.fecha).toLocaleDateString('es-AR')
                              : new Date(denuncia.fecha.seconds * 1000).toLocaleDateString('es-AR'))
                          : denuncia.fechaCreacion
                            ? (typeof denuncia.fechaCreacion === 'string'
                                ? new Date(denuncia.fechaCreacion).toLocaleDateString('es-AR')
                                : new Date(denuncia.fechaCreacion.seconds * 1000).toLocaleDateString('es-AR'))
                            : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2 md:min-w-[140px]">
                    <button
                      onClick={() => handleEditar(denuncia)}
                      className="btn btn-primary flex items-center justify-center gap-2 px-4 py-2"
                    >
                      <FaEdit />
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(denuncia.id)}
                      className="btn bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 px-4 py-2"
                    >
                      <FaTrash />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de edición */}
      {denunciaEditando && (
        <EditarDenuncia
          denuncia={denunciaEditando}
          onClose={handleCerrarEdicion}
        />
      )}
    </div>
  );
}
