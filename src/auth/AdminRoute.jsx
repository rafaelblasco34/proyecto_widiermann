import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function AdminRoute() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.rol !== 'administrador') {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
}
