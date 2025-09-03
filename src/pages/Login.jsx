import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const [f, setF] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();

  const onChange = e => setF({ ...f, [e.target.name]: e.target.value });
  
  const onSubmit = e => {
    e.preventDefault();
    try {
      login(f.username, f.password);
      nav("/");
    } catch (e) { 
      setErr(e.message); 
    }
  };

  return (
    <div className="container-page">
      <form onSubmit={onSubmit} className="card space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-semibold">Ingresar</h2>
        {err && <p className="text-red-600">{err}</p>}
        <input 
          name="username" 
          placeholder="Usuario" 
          className="w-full border p-2 rounded-xl"
          value={f.username} 
          onChange={onChange} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Contraseña" 
          className="w-full border p-2 rounded-xl"
          value={f.password} 
          onChange={onChange} 
        />
        <button className="btn btn-primary w-full">Entrar</button>
        <p className="text-sm opacity-70">Usuarios de prueba: <b>admin/1234</b>, <b>usuario/abcd</b></p>
      </form>
    </div>
  );
}
