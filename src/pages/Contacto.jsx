import { useState } from "react";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert("Mensaje enviado correctamente. Te contactaremos pronto.");
    console.log("CONTACTO:", form);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div className="container-page">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Contacto</h1>
          <p className="text-gray-600 mt-2">¿Tienes alguna consulta? Contáctanos</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">📧</div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contacto@denunciasonline.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl mr-3">📞</div>
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-gray-600">+54 11 1234-5678</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl mr-3">📍</div>
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-gray-600">Av. Corrientes 1234, CABA</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl mr-3">🕒</div>
                  <div>
                    <p className="font-medium">Horarios</p>
                    <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="nombre"
                placeholder="Tu nombre"
                className="w-full border p-3 rounded-xl"
                value={form.nombre}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Tu email"
                className="w-full border p-3 rounded-xl"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="mensaje"
                placeholder="Tu mensaje"
                className="w-full border p-3 rounded-xl h-32"
                value={form.mensaje}
                onChange={handleChange}
                required
              />
              <button className="btn btn-primary w-full">Enviar mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
