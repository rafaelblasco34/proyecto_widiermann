import { useState } from "react";

export default function NuevaDenuncia() {
      const [form, setForm] = useState({ titulo: "", descripcion: "", comisaria: "" });
}
 const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { 
  }
 e.preventDefault();
    alert("Denuncia enviada (simulada). Revisá la consola.");
console.log("DENUNCIA:", form);  
return (
    <form onSubmit={handleSubmit} className="card space-y-4"></form>
)
 <h2 className="text-xl font-semibold">Nueva denuncia</h2>;
      <input name="titulo" placeholder="Título" className="w-full border p-2 rounded-xl"
  />value={form.titulo} onChange={handleChange} required />;
      <textarea name="descripcion" placeholder="Descripción" className="w-full border p-2 rounded-xl h-32" />