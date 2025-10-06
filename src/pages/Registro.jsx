import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const [form, setForm] = useState({ 
    nombre: "", 
    email: "", 
    username: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (form.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    }

    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "El email no tiene un formato válido";
    }

    if (!form.username.trim()) {
      newErrors.username = "El usuario es obligatorio";
    } else if (form.username.trim().length < 3) {
      newErrors.username = "El usuario debe tener al menos 3 caracteres";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la contraseña";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    if (validateForm()) {
      alert("Registro exitoso. Ya puedes iniciar sesión.");
      console.log("REGISTRO:", form);
      navigate("/login");
    }
  };

  return (
  <div className="container-page">
    <form onSubmit={handleSubmit} className="card space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center">Crear cuenta</h2>
      
      {errors.general && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errors.general}
        </div>
      )}
      
      <div>
        <input
          name="nombre"
          placeholder="Nombre completo"
          className={`w-full border p-2 rounded-xl ${errors.nombre ? 'border-red-500' : ''}`}
          value={form.nombre}
          onChange={handleChange}
          disabled={loading}
          required
        />
        {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>}
      </div>
      
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={`w-full border p-2 rounded-xl ${errors.email ? 'border-red-500' : ''}`}
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          required
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <input
          name="username"
          placeholder="Usuario"
          className={`w-full border p-2 rounded-xl ${errors.username ? 'border-red-500' : ''}`}
          value={form.username}
          onChange={handleChange}
          disabled={loading}
          required
        />
        {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
      </div>
      
      <div>
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          className={`w-full border p-2 rounded-xl ${errors.password ? 'border-red-500' : ''}`}
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          required
        />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
      </div>
      
      <div>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
          className={`w-full border p-2 rounded-xl ${errors.confirmPassword ? 'border-red-500' : ''}`}
          value={form.confirmPassword}
          onChange={handleChange}
          disabled={loading}
          required
        />
        {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>
      
      <button 
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
            Creando cuenta...
          </>
        ) : (
          'Crear cuenta'
        )}
      </button>
      
      <p className="text-sm text-center opacity-70">
        ¿Ya tienes cuenta?{" "}
        <button 
          type="button" 
          onClick={() => navigate("/login")}
          className="text-blue-600 hover:underline"
          disabled={loading}
        >
          Inicia sesión
        </button>
      </p>
    </form>
  </div>
);
} 