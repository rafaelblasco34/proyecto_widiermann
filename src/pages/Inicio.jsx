import { FaExclamationTriangle, FaShieldAlt, FaBolt, FaCheckCircle, FaHome, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="min-h-screen bg-white/90 relative">
      <div className="h-3 bg-gradient-to-r from-primary via-policeYellow to-primary relative z-10 shadow-md"></div>
      
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <img 
              src="/descarga.jpeg" 
              alt="Logo Policía Neuquén" 
              className="h-24 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h1 className="text-4xl font-bold text-primary mb-4 font-heading">DenunciasOnline</h1>
          </div>
          
   
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
            <Link to="/" className="flex items-center gap-1 text-primary hover:text-blue-900 font-body transition-colors">
              <FaHome className="text-xs" />
              Inicio
            </Link>
            <Link to="/denuncias" className="flex items-center gap-1 text-primary hover:text-blue-900 font-body transition-colors">
              <FaExclamationTriangle className="text-xs" />
              Denuncias
            </Link>
            <Link to="/contacto" className="flex items-center gap-1 text-primary hover:text-blue-900 font-body transition-colors">
              <FaEnvelope className="text-xs" />
              Contacto
            </Link>
            <Link to="/login" className="flex items-center gap-1 text-primary hover:text-blue-900 font-body transition-colors">
              Ingresar
            </Link>
            <Link to="/registro" className="flex items-center gap-1 text-primary hover:text-blue-900 font-body transition-colors">
              Crear cuenta
            </Link>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link to="/denuncias/nueva" className="btn btn-primary flex items-center gap-2">
              <FaExclamationTriangle className="text-sm" />
              Realizar Denuncia
            </Link>
            <Link to="/denuncias" className="btn btn-outline flex items-center gap-2">
              <FaCheckCircle className="text-sm" />
              Ver Denuncias
            </Link>
          </div>
        </div>

        <div className="space-y-12 mb-16">
          <div className="text-center">
            <h3 className="text-xl font-bold text-primary mb-4 font-heading">Denuncias Rápidas</h3>
            <p className="text-gray-700 mb-4 max-w-md mx-auto font-body">
              Realiza tu denuncia de forma sencilla y segura con nuestro formulario intuitivo y fácil de usar.
            </p>
            <div className="flex justify-center">
              <FaShieldAlt className="text-gray-400 text-2xl" />
            </div>
          </div>

          
          <div className="text-center">
            <h3 className="text-xl font-bold text-primary mb-4 font-heading">Datos Protegidos</h3>
            <p className="text-gray-700 mb-4 max-w-md mx-auto font-body">
              Tus datos están completamente seguros y protegidos con encriptación de nivel empresarial.
            </p>
            <div className="flex justify-center">
              <FaBolt className="text-gray-400 text-2xl" />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold text-primary mb-4 font-heading">Respuesta Rápida</h3>
            <p className="text-gray-700 mb-4 max-w-md mx-auto font-body">
              Procesamiento eficiente y seguimiento en tiempo real del estado de tu denuncia.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h3 className="text-xl font-bold text-primary mb-4 font-heading">Nuestros Números</h3>
          <p className="text-gray-700 mb-8 font-body">Miles de usuarios confían en nuestra plataforma</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1 font-heading">1,250+</div>
              <div className="text-sm text-gray-600 font-body">Denuncias Procesadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1 font-heading">850+</div>
              <div className="text-sm text-gray-600 font-body">Usuarios Activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1 font-heading">95%</div>
              <div className="text-sm text-gray-600 font-body">Tasa de Resolución</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1 font-heading">24/7</div>
              <div className="text-sm text-gray-600 font-body">Soporte Disponible</div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-primary mb-4 font-heading">¿Cómo Funciona?</h3>
          <p className="text-gray-700 mb-8 font-body">Proceso simple y transparente en solo 3 pasos</p>
          
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