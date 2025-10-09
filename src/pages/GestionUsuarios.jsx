import { useState, useEffect } from "react";
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from "../firebase/firestoreService.js";

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    username: "",
    password: "",
    rol: "usuario",
    activo: true
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const usuariosData = await obtenerUsuarios();
      setUsuarios(usuariosData);
    } catch (err) {
      setError("Error al cargar los usuarios");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (usuarioEditando) {
        await actualizarUsuario(usuarioEditando.id, form);
        alert("Usuario actualizado exitosamente");
      } else {
        const usuarioId = await crearUsuario(form);
        alert(`Usuario creado exitosamente con ID: ${usuarioId}`);
      }
       limpiarFormulario();
      cargarUsuarios();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      alert("Error al guardar el usuario");
    }
  };

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setForm({
      nombre: usuario.nombre || "",
      email: usuario.email || "",
      username: usuario.username || "",
      password: "", 
      rol: usuario.rol || "usuario",
      activo: usuario.activo !== false
    });
    setMostrarFormulario(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await eliminarUsuario(id);
        alert('Usuario eliminado exitosamente');
        cargarUsuarios();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert('Error al eliminar el usuario');
      }
    }
  };

  const limpiarFormulario = () => {
    setForm({
      nombre: "",
      email: "",
      username: "",
      password: "",
      rol: "usuario",
      activo: true
    });
    setUsuarioEditando(null);
    setMostrarFormulario(false);
  };
   if (loading) {
    return (
      <div className="container-page">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⏳</div>
          <h3 className="text-xl font-semibold text-gray-600">Cargando usuarios...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
            <p className="text-gray-600 mt-2">Administra los usuarios del sistema</p>
          </div>
          <button 
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="btn btn-primary"
          >
            {mostrarFormulario ? "Cancelar" : "Nuevo Usuario"}
          </button>
        </div>

        {mostrarFormulario && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">
              {usuarioEditando ? "Editar Usuario" : "Agregar Nuevo Usuario"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    name="nombre"
                    type="text"
                    value={form.nombre}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-xl"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usuario *
                  </label>
                  <input
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-xl"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña {usuarioEditando ? "(dejar vacío para mantener actual)" : "*"}
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-xl"
                    required={!usuarioEditando}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rol
                  </label>
                  <select
                    name="rol"
                    value={form.rol}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-xl"
                  >
                    <option value="usuario">Usuario</option>
                    <option value="admin">Administrador</option>
                    <option value="oficial">Oficial de Policía</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    name="activo"
                    type="checkbox"
                    checked={form.activo}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Usuario activo
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn btn-primary">
                  {usuarioEditando ? "Actualizar" : "Crear"} Usuario
                </button>
                <button 
                  type="button" 
                  onClick={limpiarFormulario}
                  className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {usuarios.map((usuario) => (
            <div key={usuario.id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{usuario.nombre}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      usuario.activo === false 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {usuario.activo === false ? 'Inactivo' : 'Activo'}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      usuario.rol === 'admin' 
                        ? 'bg-purple-100 text-purple-800'
                        : usuario.rol === 'oficial'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {usuario.rol}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Usuario:</strong> {usuario.username}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>ID:</strong> {usuario.id}</p>
                    {usuario.createdAt && (
                      <p><strong>Creado:</strong> {new Date(usuario.createdAt.seconds * 1000).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEditar(usuario)}
                    className="btn btn-primary text-sm"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleEliminar(usuario.id)}
                    className="btn bg-red-500 hover:bg-red-600 text-white text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {usuarios.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-600">No hay usuarios registrados</h3>
            <p className="text-gray-500">Los usuarios aparecerán aquí una vez que sean registrados</p>
          </div>
        )}
      </div>
    </div>
  );
}