import { useState } from "react";

export default function Denuncias() {
  const [denuncias] = useState([
    {
      id: 1,
      titulo: "Robo en zona comercial",
      descripcion: "Se reportó un robo en la zona comercial del centro",
      fecha: "2024-01-15",
      estado: "En proceso"
    },
    {
      id: 2,
      titulo: "Vandalismo en parque",
      descripcion: "Daños en mobiliario urbano del parque central",
      fecha: "2024-01-14",
      estado: "Resuelto"
    },
    {
      id: 3,
      titulo: "Ruidos molestos",
      descripcion: "Ruidos excesivos en horario nocturno",
      fecha: "2024-01-13",
      estado: "En investigación"
    }
  ]);

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

  return (
    <div className="container-page">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Denuncias Registradas</h1>
          <p className="text-gray-600 mt-2">Consulta el estado de las denuncias</p>
        </div>

        <div className="grid gap-4">
          {denuncias.map((denuncia) => (
            <div key={denuncia.id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{denuncia.titulo}</h3>
                  <p className="text-gray-600 mt-1">{denuncia.descripcion}</p>
                  <p className="text-sm text-gray-500 mt-2">Fecha: {denuncia.fecha}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(denuncia.estado)}`}>
                  {denuncia.estado}
                </span>
              </div>
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
  );
}
import { Link } from "react-router-dom";
export default function Denuncias() {
  return (
    <h2 className="text-xl font-semibold mb-2">Denuncias</h2>
      <p className="mb-4">Creá una nueva denuncia o consultá el procedimiento.</p>
      <Link to="/denuncias/nueva" className="btn btn-primary">Nueva denuncia</Link>
  );
}
