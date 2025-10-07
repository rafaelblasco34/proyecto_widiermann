import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nombreUsuario = user?.nombre || "";
  const linkBase= "px-3 py-2 rounded-xl hover:bg-gray-100";
  const active = ({ isActive }) =>
  isActive ? `${linkBase} bg-gray-200` : linkBase;


  return (
    <header className="bg-white shadow">
      <nav className="container-page flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">DenunciasOnline</Link>
        <div className="flex items-center gap-2">
          <NavLink to="/" className={active}>Inicio</NavLink>
          <NavLink to="/denuncias" className={active}>Denuncias</NavLink>
          <NavLink to="/contacto" className={active}>Contacto</NavLink>
          {user ? (
            <>
            <span className="mr-2 font-semibold"> {nombreUsuario}</span>
              <NavLink to="/denuncias/nueva" className={active}>Nueva</NavLink>
              <button onClick={logout} className="btn btn-primary">Salir</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={active}>Ingresar</NavLink>
              <NavLink to="/registro" className={active}>Crear cuenta</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}