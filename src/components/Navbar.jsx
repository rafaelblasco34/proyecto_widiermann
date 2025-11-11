import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { 
  FaHome, 
  FaExclamationTriangle, 
  FaEnvelope, 
  FaSignInAlt, 
   FaUserPlus,
  FaUserShield,
  FaSignOutAlt
} from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-lg relative z-20 border-b-4 border-primary">
      <div className="h-3 bg-gradient-to-r from-primary via-policeYellow to-primary shadow-lg"></div>
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-primary/20 shadow-lg p-1">
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
            <span className="text-2xl font-bold text-primary font-heading drop-shadow-sm">
              DenunciasOnline
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center gap-1 text-primary hover:text-blue-900 text-sm font-body transition-colors">
              <FaHome className="text-xs" />
              Inicio
            </Link>
            {user && user.rol === 'administrador' && (
              <Link to="/panel" className="flex items-center gap-1 text-primary hover:text-blue-900 text-sm font-body transition-colors">
                <FaUserShield className="text-xs" />
                Panel
              </Link>
            )}
            <Link to="/denuncias" className="flex items-center gap-1 text-primary hover:text-blue-900 text-sm font-body transition-colors">
              <FaExclamationTriangle className="text-xs" />
              Denuncias
            </Link>
            <Link to="/contacto" className="flex items-center gap-1 text-primary hover:text-blue-900 text-sm font-body transition-colors">
              <FaEnvelope className="text-xs" />
              Contacto
            </Link>
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  {user.nombre || user.username}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-primary hover:text-blue-900 text-sm font-body transition-colors"
                >
                  <FaSignOutAlt className="text-xs" />
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1 text-primary hover:text-blue-900 text-sm font-body transition-colors">
                  Ingresar
                </Link>
                <Link to="/registro" className="flex items-center gap-1 text-primary hover:text-blue-900 text-sm font-body transition-colors">
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              className="text-primary hover:text-blue-900 focus:outline-none p-2 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}