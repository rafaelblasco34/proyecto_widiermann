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
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    
    // Validaciones básicas
    if (form.password !== form.confirmPassword) {
      setErr("Las contraseñas no coinciden");
      return;
    }
    
    if (form.password.length < 4) {
      setErr("La contraseña debe tener al menos 4 caracteres");
      return;
    }

    // Simular registro exitoso
    alert("Registro exitoso. Ya puedes iniciar sesión.");
    console.log("REGISTRO:", form);
    navigate("/login");
  };

  return (
    <div className="container-page">
      <form onSubmit={handleSubmit} className="card space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-center">Crear cuenta</h2>
        {err && <p className="text-red-600 text-center">{err}</p>}
        
        <input
          name="nombre"
          placeholder="Nombre completo"
          className="w-full border p-2 rounded-xl"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded-xl"
          value={form.email}
          onChange={handleChange}
          required
        />
        
        <input
          name="username"
          placeholder="Usuario"
          className="w-full border p-2 rounded-xl"
          value={form.username}
          onChange={handleChange}
          required
        />
        
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded-xl"
          value={form.password}
          onChange={handleChange}
          required
        />
        
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
          className="w-full border p-2 rounded-xl"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        
        <button className="btn btn-primary w-full">Crear cuenta</button>
        
        <p className="text-sm text-center opacity-70">
          ¿Ya tienes cuenta?{" "}
          <button 
            type="button" 
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </form>
    </div>
  );
}
export default function Registro() {
  return (
    <section className="card max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Registro (demo)</h2>
      <p>Esta pantalla simula un registro. Podés usar los usuarios de prueba del login.</p>
    </section>
  );
} 