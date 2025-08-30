import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
export default function Login() {
  const [f, setF] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();}
  const onChange = e => setF({ ...f, [e.target.name]: e.target.value });
  const onSubmit = e => {
     e.preventDefault();
    try {
      login(f.username, f.password);
       nav("/");
    } catch (e) { setErr(e.message); }
  };
  return (
    <form onSubmit={onSubmit} className="card space-y-4 max-w-md mx-auto"></form> )
    <h2 className="text-xl font-semibold">Ingresar</h2>;
      {err && <p className="text-red-600">{err}</p>}