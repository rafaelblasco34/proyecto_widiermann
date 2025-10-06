import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
}

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
      <form onSubmit={handleSubmit} className="card space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-semibold">Ingresar</h2>
        
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.general}
          </div>
        )}
        
        <div>
          <input 
            name="username" 
            placeholder="Usuario" 
            className={`w-full border p-2 rounded-xl ${errors.username ? 'border-red-500' : ''}`}
            value={form.username} 
            onChange={handleChange}
            disabled={loading}
          />
          {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Contraseña" 
            className={`w-full border p-2 rounded-xl ${errors.password ? 'border-red-500' : ''}`}
            value={form.password} 
            onChange={handleChange}
            disabled={loading}
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>

        <button 
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
              Iniciando sesión...
            </>
          ) : (
            'Entrar'
          )}
        </button>
        
        <p className="text-sm opacity-70 text-center">
          Los usuarios se obtienen desde Firebase
        </p>
        
        <p className="text-sm text-center opacity-70">
          ¿No tienes cuenta?{" "}
          <button 
            type="button" 
            onClick={() => navigate("/registro")}
            className="text-blue-600 hover:underline"
            disabled={loading}
          >
            Crear cuenta
          </button>
        </p>
      </form>
    </div>
  );

