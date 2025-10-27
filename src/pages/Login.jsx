import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { FaUser, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "El usuario es obligatorio";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
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
  
  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrors({});
      await login(form.username, form.password);
      navigate("/");
    } catch (error) { 
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-page">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaSignInAlt className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-gray-800 mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-gray-600">
            Accede a tu cuenta para gestionar tus denuncias
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
              Usuario
            </label>
            <input 
              name="username" 
              placeholder="Ingresa tu usuario" 
              className={`input-field ${errors.username ? 'input-error' : ''}`}
              value={form.username} 
              onChange={handleChange}
              disabled={loading}
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
                type={showPassword ? "text" : "password"}
                name="password" 
                placeholder="Ingresa tu contraseña" 
                className={`input-field pr-12 ${errors.password ? 'input-error' : ''}`}
                value={form.password} 
                onChange={handleChange}
                disabled={loading}
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

          <button 
            className="btn btn-primary w-full text-lg py-4"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner mr-2"></div>
                Iniciando sesión...
              </>
            ) : (
              <>
                <FaSignInAlt className="mr-2" />
                Iniciar Sesión
              </>
            )}
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              Los usuarios se obtienen desde Firebase
            </p>
            
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <button 
                type="button" 
                onClick={() => navigate("/registro")}
                className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors"
                disabled={loading}
              >
                Crear cuenta
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}