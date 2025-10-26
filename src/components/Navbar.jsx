import { Link } from "react-router-dom";
import { 
  FaHome, 
  FaExclamationTriangle, 
  FaEnvelope, 
  FaSignInAlt, 
  FaUserPlus
} from "react-icons/fa";

export default function Navbar() {
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
              <FaSignInAlt className="text-xs" />
              Ingresar
            </Link>
            <Link to="/registro" className="flex items-center gap-1 text-black hover:text-green-600 text-sm">
              <FaUserPlus className="text-xs" />
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
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  FaHome, 
  FaExclamationTriangle, 
  FaEnvelope, 
  FaSignInAlt, 
  FaUserPlus,
  FaTimes
} from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
              <FaSignInAlt className="text-xs" />
              Ingresar
            </Link>
            <Link to="/registro" className="flex items-center gap-1 text-black hover:text-green-600 text-sm">
              <FaUserPlus className="text-xs" />
              Crear cuenta
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              className="text-black hover:text-green-600 focus:outline-none p-2"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Menu movil */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-black hover:text-green-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaHome className="text-xs" />
                Inicio
              </Link>
              <Link 
                to="/denuncias" 
                className="flex items-center gap-2 text-black hover:text-green-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaExclamationTriangle className="text-xs" />
                Denuncias
              </Link>
              <Link 
                to="/contacto" 
                className="flex items-center gap-2 text-black hover:text-green-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaEnvelope className="text-xs" />
                Contacto
              </Link>
              <Link 
                to="/login" 
                className="flex items-center gap-2 text-black hover:text-green-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaSignInAlt className="text-xs" />
                Ingresar
              </Link>
              <Link 
                to="/registro" 
                className="flex items-center gap-2 text-black hover:text-green-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaUserPlus className="text-xs" />
                Crear cuenta
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { 
  FaHome, 
  FaExclamationTriangle, 
  FaEnvelope, 
  FaSignInAlt, 
  FaUserPlus,
  FaTimes,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

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
            {user ? (
              <>
                <span className="flex items-center gap-1 text-black text-sm">
                  <FaUser className="text-xs" />
                  {user.nombre || user.username}
                </span>
                <button 
                  onClick={logout}
                  className="flex items-center gap-1 text-black hover:text-green-600 text-sm"
                >
                  <FaSignOutAlt className="text-xs" />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1 text-black hover:text-green-600 text-sm">
                  <FaSignInAlt className="text-xs" />
                  Ingresar
                </Link>
                <Link to="/registro" className="flex items-center gap-1 text-black hover:text-green-600 text-sm">
                  <FaUserPlus className="text-xs" />
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              className="text-black hover:text-green-600 focus:outline-none p-2"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Menu movil */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-black hover:text-green-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaHome className="text-xs" />
                Inicio
              </Link>
              <Link 
                to="/denuncias" 
                className="flex items-center gap-2 text-black hover:text-green-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaExclamationTriangle className="text-xs" />
                Denuncias
              </Link>
              <Link 
                to="/contacto" 
                className="flex items-center gap-2 text-black hover:text-green-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaEnvelope className="text-xs" />
                Contacto
              </Link>
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-black block px-3 py-2 text-base font-medium">
                    <FaUser className="text-xs" />
                    {user.nombre || user.username}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-black hover:text-green-600 block px-3 py-2 text-base font-medium w-full text-left"
                  >
                    <FaSignOutAlt className="text-xs" />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center gap-2 text-black hover:text-green-600 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaSignInAlt className="text-xs" />
                    Ingresar
                  </Link>
                  <Link 
                    to="/registro" 
                    className="flex items-center gap-2 text-black hover:text-green-600 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUserPlus className="text-xs" />
                    Crear cuenta
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}