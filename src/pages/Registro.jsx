import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const [form, setForm] = useState({ 
    nombre: "", 
    email: "", 
    username: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (form.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    }

    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "El email no tiene un formato válido";
    }

    if (!form.username.trim()) {
      newErrors.username = "El usuario es obligatorio";
    } else if (form.username.trim().length < 3) {
      newErrors.username = "El usuario debe tener al menos 3 caracteres";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la contraseña";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    if (validateForm()) {
      alert("Registro exitoso. Ya puedes iniciar sesión.");
      console.log("REGISTRO:", form);
      navigate("/login");
    }
  };
}
