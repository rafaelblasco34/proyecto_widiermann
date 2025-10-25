import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Registro() {
  const [form, setForm] = useState({ 
    nombre: "", 
    email: "", 
    username: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        alert("Registro exitoso. Ya puedes iniciar sesión.");
        console.log("REGISTRO:", form);
        setLoading(false);
        navigate("/login");
      }, 1000);
    }
  };
  return (
    <div className="container-page">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaUserPlus className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-gray-800 mb-2">
            Crear Cuenta
          </h2>
          <p className="text-gray-600">
            Únete a nuestra plataforma de denuncias
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          {errors.general && (
            <div className="bg-accent-50 border border-accent-200 text-accent-700 px-4 py-3 rounded-xl flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              {errors.general}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaUser className="text-primary-600" />
              Nombre completo
            </label>
            <input
              name="nombre"
              placeholder="Ingresa tu nombre completo"
              className={`input-field ${errors.nombre ? 'input-error' : ''}`}
              value={form.nombre}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.nombre && <p className="error-message">{errors.nombre}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaEnvelope className="text-primary-600" />
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Ingresa tu email"
              className={`input-field ${errors.email ? 'input-error' : ''}`}
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
    <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaUser className="text-primary-600" />
              Usuario
            </label>
            <input
              name="username"
              placeholder="Elige un nombre de usuario"
              className={`input-field ${errors.username ? 'input-error' : ''}`}
              value={form.username}
              onChange={handleChange}
              disabled={loading}
              required
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaLock className="text-primary-600" />
              Contraseña
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Crea una contraseña segura"
                className={`input-field pr-12 ${errors.password ? 'input-error' : ''}`}
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
<div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaLock className="text-primary-600" />
              Contraseña
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Crea una contraseña segura"
                className={`input-field pr-12 ${errors.password ? 'input-error' : ''}`}
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>