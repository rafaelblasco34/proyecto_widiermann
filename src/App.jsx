import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Inicio from "./pages/Inicio.jsx";
import Denuncias from "./pages/Denuncias.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import NuevaDenuncia from "./pages/NuevaDenuncia.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 relative">
        <div 
          className="fixed top-0 left-0 w-full h-full z-0 opacity-80 pointer-events-none"
          style={{
            backgroundImage: 'url(/descarga.jpeg)',
            backgroundSize: 'auto 60%',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="fixed inset-0 z-0 bg-white/20 pointer-events-none"></div>
        
        <Navbar />
        <div className="container-page relative z-10">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/denuncias" element={<Denuncias />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/denuncias/nueva" element={<NuevaDenuncia />} />
            </Route>
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}