import { FaExclamationTriangle, FaShieldAlt, FaBolt, FaCheckCircle, FaUserPlus, FaFileAlt, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="min-h-screen bg-white/90 relative">
      <div className="h-3 bg-gradient-to-r from-primary via-policeYellow to-primary relative z-10 shadow-md"></div>
      
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-primary/20 shadow-lg p-1">
              <img 
                src={`${process.env.PUBLIC_URL || ''}/descarga.jpeg`}
                alt="Logo Policía Neuquén" 
                className="h-full w-full object-contain rounded-full"
                style={{
                  filter: 'brightness(1.05) saturate(1.1)',
                  mixBlendMode: 'darken'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4 font-heading">DenunciasOnline</h1>
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
          <h3 className="text-2xl font-bold text-primary mb-4 font-heading">¿Cómo Funciona?</h3>
          <p className="text-gray-700 mb-12 font-body text-lg">Proceso simple y transparente en solo 3 pasos</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Paso 1 */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                  <FaUserPlus className="text-2xl" />
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <span className="bg-policeYellow text-primary font-bold px-3 py-1 rounded-full text-sm">1</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-3 font-heading">Regístrate</h4>
                <p className="text-gray-600 font-body text-sm leading-relaxed">
                  Crea tu cuenta de forma rápida y segura. Solo necesitas tu nombre, email y un usuario.
                </p>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                  <FaFileAlt className="text-2xl" />
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <span className="bg-policeYellow text-primary font-bold px-3 py-1 rounded-full text-sm">2</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-3 font-heading">Completa el Formulario</h4>
                <p className="text-gray-600 font-body text-sm leading-relaxed">
                  Describe el incidente, selecciona el tipo de denuncia, la ubicación y adjunta pruebas como imágenes o videos.
                </p>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                  <FaPaperPlane className="text-2xl" />
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <span className="bg-policeYellow text-primary font-bold px-3 py-1 rounded-full text-sm">3</span>
                </div>
                <h4 className="text-lg font-bold text-primary mb-3 font-heading">Envía tu Denuncia</h4>
                <p className="text-gray-600 font-body text-sm leading-relaxed">
                  Envía tu denuncia directamente a la comisaría seleccionada. Podrás hacer seguimiento de su estado en tiempo real.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <Link to="/registro" className="btn btn-primary inline-flex items-center gap-2">
              <FaUserPlus className="text-sm" />
              Comenzar Ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}