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
