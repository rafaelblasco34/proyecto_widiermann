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
    <header className="bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-black">
            DenunciasOnline
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center gap-1 text-black hover:text-green-600 text-sm">
              <FaHome className="text-xs" />
              Inicio
            </Link>
            <Link to="/denuncias" className="flex items-center gap-1 text-black hover:text-green-600 text-sm">
              <FaExclamationTriangle className="text-xs" />
              Denuncias
            </Link>
            <Link to="/contacto" className="flex items-center gap-1 text-black hover:text-green-600 text-sm">
              <FaEnvelope className="text-xs" />
              Contacto
            </Link>
            <Link to="/login" className="flex items-center gap-1 text-black hover:text-green-600 text-sm">
              Ingresar
            </Link>
            <Link to="/registro" className="flex items-center gap-1 text-black hover:text-green-600 text-sm">
              Crear cuenta
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              className="text-black hover:text-green-600 focus:outline-none p-2"
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