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
import TestTailwind from "./test-tailwind.jsx";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <TestTailwind />
        <Navbar />
        <div className="container-page">
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
