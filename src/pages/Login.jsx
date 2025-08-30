import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
export default function Login() {
  const [f, setF] = useState({ username: "", password: "" });