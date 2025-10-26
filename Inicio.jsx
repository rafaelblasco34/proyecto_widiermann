export default function Inicio (){
    return (
        <section className="card">
        <h1 className="text-2xl font-bold mb-4">Bienvenido a denunciasOnline</h1>
        <p>Realizá denuncias y contactá comisarías sin moverte de tu casa</p>
        </section>
    );
}
import { FaExclamationTriangle, FaShieldAlt, FaBolt, FaCheckCircle, FaHome, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="min-h-screen bg-white">
  
      <div className="bg-green-800 h-1"></div>
      
     
      <div className="max-w-4xl mx-auto px-6 py-12"></div>

      <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">DenunciasOnline</h1>
          
   
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <Link to="/" className="flex items-center gap-1 text-black hover:text-green-600">
              <FaHome className="text-xs" />
              Inicio
            </Link>
            <Link to="/denuncias" className="flex items-center gap-1 text-black hover:text-green-600">
              <FaExclamationTriangle className="text-xs" />
              Denuncias
            </Link>
            <Link to="/contacto" className="flex items-center gap-1 text-black hover:text-green-600">
              <FaEnvelope className="text-xs" />
              Contacto
            </Link>
            <Link to="/login" className="flex items-center gap-1 text-black hover:text-green-600">
              Ingresar
            </Link>
            <Link to="/registro" className="flex items-center gap-1 text-black hover:text-green-600">
              Crear cuenta
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
            <Link to="/" className="flex items-center gap-1 text-black hover:text-green-600">
              <FaHome className="text-xs" />
              Inicio
            </Link>
            <Link to="/denuncias" className="flex items-center gap-1 text-black hover:text-green-600">
              <FaExclamationTriangle className="text-xs" />
              Denuncias
            </Link>
            <Link to="/contacto" className="flex items-center gap-1 text-black hover:text-green-600">
              <FaEnvelope className="text-xs" />
              Contacto
            </Link>
          </div>
        </div>