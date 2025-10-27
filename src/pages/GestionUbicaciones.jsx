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
if (loading) {
    return (
      <div className="container-page">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⏳</div>
          <h3 className="text-xl font-semibold text-gray-600">Cargando ubicaciones...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Ubicaciones</h1>
            <p className="text-gray-600 mt-2">Administra las ubicaciones donde ocurren incidentes</p>
          </div>
          <button 
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="btn btn-primary"
          >
            {mostrarFormulario ? "Cancelar" : "Nueva Ubicación"}
          </button>
        </div>

        {mostrarFormulario && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Agregar Nueva Ubicación</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    name="nombre"
                    placeholder="Nombre de la ubicación"
                    className="w-full border p-2 rounded-xl"
                    value={form.nombre}
                    onChange={(e) => setForm({...form, nombre: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <select
                    name="tipo"
                    className="w-full border p-2 rounded-xl"
                    value={form.tipo}
                    onChange={(e) => setForm({...form, tipo: e.target.value})}
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="parque">Parque</option>
                    <option value="calle">Calle</option>
                    <option value="comercial">Zona Comercial</option>
                    <option value="residencial">Zona Residencial</option>
                    <option value="publico">Espacio Público</option>
                  </select>
                </div>
              </div>
              
              <div>
                <input
                  name="direccion"
                  placeholder="Dirección completa"
                  className="w-full border p-2 rounded-xl"
                  value={form.direccion}
                  onChange={(e) => setForm({...form, direccion: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    name="lat"
                    type="number"
                    step="any"
                    placeholder="Latitud"
                    className="w-full border p-2 rounded-xl"
                    value={form.coordenadas.lat}
                    onChange={(e) => setForm({...form, coordenadas: {...form.coordenadas, lat: e.target.value}})}
                  />
                </div>
                <div>
                  <input
                    name="lng"
                    type="number"
                    step="any"
                    placeholder="Longitud"
                    className="w-full border p-2 rounded-xl"
                    value={form.coordenadas.lng}
                    onChange={(e) => setForm({...form, coordenadas: {...form.coordenadas, lng: e.target.value}})}
                  />
                </div>
              </div>

              <div>
                <textarea
                  name="descripcion"
                  placeholder="Descripción de la ubicación"
                  className="w-full border p-2 rounded-xl h-20"
                  value={form.descripcion}
                  onChange={(e) => setForm({...form, descripcion: e.target.value})}
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn btn-primary">
                  Crear Ubicación
                </button>
                <button 
                  type="button" 
                  onClick={() => setMostrarFormulario(false)}
                  className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
         <div className="grid gap-4">
          {ubicaciones.map((ubicacion) => (
            <div key={ubicacion.id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{ubicacion.nombre}</h3>
                  <p className="text-gray-600 mt-1">{ubicacion.direccion}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>Tipo: {ubicacion.tipo}</span>
                    {ubicacion.coordenadas && (ubicacion.coordenadas.lat || ubicacion.coordenadas.lng) && (
                      <span>Coords: {ubicacion.coordenadas.lat}, {ubicacion.coordenadas.lng}</span>
                    )}
                  </div>
                  {ubicacion.descripcion && (
                    <p className="text-gray-600 mt-2 text-sm">{ubicacion.descripcion}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {ubicaciones.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-xl font-semibold text-gray-600">No hay ubicaciones registradas</h3>
            <p className="text-gray-500">Las ubicaciones aparecerán aquí una vez que sean registradas</p>
          </div>
        )}
      </div>
    </div>
  );
}
