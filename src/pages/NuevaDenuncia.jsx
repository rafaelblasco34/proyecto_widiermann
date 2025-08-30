import { useState } from "react";

export default function NuevaDenuncia() {
      const [form, setForm] = useState({ titulo: "", descripcion: "", comisaria: "" });
}
 const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { 
    