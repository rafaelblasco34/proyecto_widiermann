import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerDenuncias } from "../firebase/firestoreService.js";
import { FaExclamationTriangle, FaClock, FaCheckCircle, FaSearch, FaFilter, FaPlus } from "react-icons/fa";

export default function Denuncias() {
  const [denuncias, setDenuncias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const cargarDenuncias = async () => {
      try {
        setLoading(true);
        const denunciasData = await obtenerDenuncias();
        setDenuncias(denunciasData);
      } catch (err) {
        setError("Error al cargar las denuncias");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    cargarDenuncias();
  }, []);
    const getEstadoColor = (estado) => {
    switch (estado) {
      case "Resuelto":
        return "status-resolved";
      case "En proceso":
        return "status-in-progress";
      case "En investigación":
        return "status-investigation";
      default:
        return "status-pending";
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "Resuelto":
        return <FaCheckCircle className="text-success-600" />;
      case "En proceso":
        return <FaClock className="text-warning-600" />;
      case "En investigación":
        return <FaExclamationTriangle className="text-primary-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };