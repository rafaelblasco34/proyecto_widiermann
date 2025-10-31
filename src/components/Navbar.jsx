import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { 
  FaHome, 
  FaExclamationTriangle, 
  FaEnvelope, 
  FaSignInAlt, 
  FaUserPlus
} from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-lg relative z-20 border-b-4 border-primary">
      <div className="h-3 bg-gradient-to-r from-primary via-policeYellow to-primary shadow-lg"></div>
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/descarga.jpeg" 
              alt="Logo Policía Neuquén" 
              className="h-16 w-auto object-contain drop-shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="text-2xl font-bold text-primary font-heading drop-shadow-sm">
              DenunciasOnline
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center gap-1 text-primary hover:text-blue-900 text-sm font-body transition-colors">
              <FaHome className="text-xs" />
              Inicio
            </Link>
            <Link to="/denuncias" className="flex items-center gap-1 text-primary hover:text-blue-900 text-sm font-body transition-colors">
              <FaExclamationTriangle className="text-xs" />
              Denuncias
            </Link>
            <Link to="/contacto" className="flex items-center gap-1 text-primary hover:text-blue-900 text-sm font-body transition-colors">
              <FaEnvelope className="text-xs" />
              Contacto
            </Link>
            <Link to="/login" className="flex items-center gap-1 text-primary hover:text-blue-900 text-sm font-body transition-colors">
              Ingresar
            </Link>
            <Link to="/registro" className="flex items-center gap-1 text-primary hover:text-blue-900 text-sm font-body transition-colors">
              Crear cuenta
            </Link>
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