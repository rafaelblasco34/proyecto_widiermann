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
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-6">Sistema de Denuncias Online</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Plataforma segura y confiable para realizar denuncias de manera rápida y eficiente. 
            Tu seguridad y privacidad son nuestra máxima prioridad.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link to="/denuncias/nueva" className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium">
              <FaExclamationTriangle className="text-sm" />
              Realizar Denuncia
            </Link>
            <Link to="/denuncias" className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium">
              <FaCheckCircle className="text-sm" />
              Ver Denuncias
            </Link>
          </div>
          
          <div className="flex justify-center">
            <FaExclamationTriangle className="text-gray-400 text-2xl" />
          </div>
        </div>
        <div className="space-y-12 mb-16">
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">Denuncias Rápidas</h3>
            <p className="text-gray-700 mb-4 max-w-md mx-auto">
              Realiza tu denuncia de forma sencilla y segura con nuestro formulario intuitivo y fácil de usar.
            </p>
            <div className="flex justify-center">
              <FaShieldAlt className="text-gray-400 text-2xl" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">Datos Protegidos</h3>
            <p className="text-gray-700 mb-4 max-w-md mx-auto">
              Tus datos están completamente seguros y protegidos con encriptación de nivel empresarial.
            </p>
            <div className="flex justify-center">
              <FaBolt className="text-gray-400 text-2xl" />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">Respuesta Rápida</h3>
            <p className="text-gray-700 mb-4 max-w-md mx-auto">
              Procesamiento eficiente y seguimiento en tiempo real del estado de tu denuncia.
            </p>
          </div>
        </div>
        <div className="text-center mb-16">
          <h3 className="text-xl font-bold text-black mb-4">Nuestros Números</h3>
          <p className="text-gray-700 mb-8">Miles de usuarios confían en nuestra plataforma</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-black mb-1">1,250+</div>
              <div className="text-sm text-gray-600">Denuncias Procesadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black mb-1">850+</div>
              <div className="text-sm text-gray-600">Usuarios Activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black mb-1">95%</div>
              <div className="text-sm text-gray-600">Tasa de Resolución</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black mb-1">24/7</div>
              <div className="text-sm text-gray-600">Soporte Disponible</div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-black mb-4">¿Cómo Funciona?</h3>
          <p className="text-gray-700 mb-8">Proceso simple y transparente en solo 3 pasos</p>
          
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold">
              1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}