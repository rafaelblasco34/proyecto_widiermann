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
        alert(Usuario creado exitosamente con ID: ${usuarioId});
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
      password: "", // No mostrar contraseña existente
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