import { createContext, useContext, useState, useEffect } from "react";
import { obtenerUsuarios } from "../firebase/firestoreService.js";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const cargarUsuarioGuardado = async () => {
      try {
        const saved = localStorage.getItem("user");
        if (saved) {
          const usuarioGuardado = JSON.parse(saved);
          // Verificar que el usuario aún existe en Firebase
          const usuarios = await obtenerUsuarios();
          const usuarioValido = usuarios.find(u => 
            u.id === usuarioGuardado.id && 
            u.username === usuarioGuardado.username &&
            u.activo === true
          );

             if (usuarioValido) {
            setUser(usuarioGuardado);
          } else {
            // Usuario ya no existe o está inactivo, limpiar localStorage
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Error al cargar usuario guardado:", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

     cargarUsuarioGuardado();
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);
      
      // Obtener usuarios desde Firebase
      const usuarios = await obtenerUsuarios();
      
      // Buscar usuario por username y password
      const found = usuarios.find(u => 
        u.username === username && 
        u.password === password && 
        u.activo === true
      );

        if (!found) {
        throw new Error("Credenciales inválidas o usuario inactivo");
      }
      
      // Crear objeto de usuario para el contexto
      const usuarioSesion = { 
        id: found.id,
        username: found.username, 
        nombre: found.nombre,
        email: found.email,
        rol: found.rol || 'usuario'
      };

       setUser(usuarioSesion);
      localStorage.setItem("user", JSON.stringify(usuarioSesion));
      
      console.log("Usuario autenticado:", usuarioSesion);
    } catch (error) {
      console.error("Error en login:", error);
      throw new Error(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

   const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("Usuario deslogueado");
  };

  const actualizarUsuario = (datosActualizados) => {
    if (user) {
      const usuarioActualizado = { ...user, ...datosActualizados };
      setUser(usuarioActualizado);
      localStorage.setItem("user", JSON.stringify(usuarioActualizado));
    }
  };

   // Mostrar loading mientras se verifica la sesión
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthCtx.Provider value={{ 
      user, 
      login, 
      logout, 
      actualizarUsuario,
      loading 
    }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);