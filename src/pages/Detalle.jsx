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

  if (loading) {
    return (
      <div className="container-page">
        <div className="card text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cargando...</h2>
          <p className="text-gray-600">Obteniendo información de la denuncia</p>
        </div>
      </div>
    );
  }

  if (error || !denuncia) {
    return (
      <div className="container-page">
        <div className="card text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Denuncia no encontrada</h2>
          <p className="text-gray-600 mb-4">
            {error || `No se encontró la denuncia con ID: ${id}`}
          </p>
          <Link to="/denuncias" className="btn btn-primary">
            Volver al listado
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/denuncias")}
          className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Volver al listado
        </button>

        <div className="card space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800">{denuncia.titulo}</h1>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${getEstadoColor(
                denuncia.estado
              )}`}
            >
              {denuncia.estado}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-500">Fecha de denuncia</p>
              <p className="font-semibold">{denuncia.fecha}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Número de expediente</p>
              <p className="font-semibold">{denuncia.numeroExpediente || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Comisaría</p>
              <p className="font-semibold">{denuncia.comisaria || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tipo de denuncia</p>
              <p className="font-semibold">{denuncia.tipo || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ID de denuncia</p>
              <p className="font-semibold">#{denuncia.id}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Ubicación del incidente</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">{denuncia.ubicacion}</p>
              {denuncia.direccion && (
                <p className="text-gray-600 mt-1">{denuncia.direccion}</p>
              )}
              {denuncia.coordenadas && (denuncia.coordenadas.lat || denuncia.coordenadas.lng) && (
                <p className="text-sm text-gray-500 mt-2">
                  Coordenadas: {denuncia.coordenadas.lat}, {denuncia.coordenadas.lng}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h2>
            <p className="text-gray-700">{denuncia.descripcion}</p>
          </div>

          {denuncia.imagenes && denuncia.imagenes.length > 0 && (
            <div className="pt-4 border-t">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Imágenes del incidente</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {denuncia.imagenes.map((imagen, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imagen.url}
                      alt={`Imagen ${index + 1} del incidente`}
                      className="w-full h-48 object-cover rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => window.open(imagen.url, "_blank")}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                        Ver en tamaño completo
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t flex gap-4">
            <button onClick={() => navigate(-1)} className="btn btn-primary">
              Volver
            </button>
            <Link to="/contacto" className="btn bg-gray-200 hover:bg-gray-300 text-gray-800">
              Contactar soporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
