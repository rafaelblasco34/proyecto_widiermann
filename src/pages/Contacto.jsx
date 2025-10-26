import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      console.log("CONTACTO:", form);
      setForm({ nombre: "", email: "", mensaje: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };
return (
    <div className="container-page">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold gradient-text mb-4">
            Contacto
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Tienes alguna consulta? Estamos aquí para ayudarte
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="card bg-success-50 border-success-200 mb-8">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-success-600 text-2xl" />
              <div>
                <h3 className="font-semibold text-success-800">¡Mensaje enviado!</h3>
                <p className="text-success-700">Te contactaremos pronto.</p>
              </div>
            </div>
          </div>
        )}
<div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="card">
              <h3 className="text-2xl font-heading font-semibold mb-6 text-gray-800">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Email</p>
                    <p className="text-gray-600">contacto@denunciasonline.com</p>
                    <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Teléfono</p>
                    <p className="text-gray-600">+54 11 1234-5678</p>
                    <p className="text-sm text-gray-500">Lunes a Viernes 9:00-18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-warning-500 to-warning-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Dirección</p>
                    <p className="text-gray-600">Av. Corrientes 1234, CABA</p>
                    <p className="text-sm text-gray-500">Buenos Aires, Argentina</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Horarios de Atención</p>
                    <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                    <p className="text-sm text-gray-500">Sábados: 9:00 - 13:00</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional Info Card */}
            <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
              <h4 className="font-heading font-semibold text-gray-800 mb-3">
                ¿Por qué contactarnos?
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  Consultas sobre denuncias existentes
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  Soporte técnico de la plataforma
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  Información sobre el proceso
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  Reportar problemas o sugerencias
                </li>
              </ul>
            </div>
          </div>