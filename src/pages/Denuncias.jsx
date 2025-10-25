import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerDenuncias } from "../firebase/firestoreService.js";
import { FaExclamationTriangle, FaClock, FaCheckCircle, FaSearch, FaFilter, FaPlus } from "react-icons/fa";

export default function Denuncias() {
  const [denuncias, setDenuncias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
