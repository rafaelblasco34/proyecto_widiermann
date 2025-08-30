import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
export default function Login() {
  const [f, setF] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();
const { login } = useAuth();}
const onChange = e => setF({ ...f, [e.target.name]: e.target.value });
  const onSubmit = e => {
     e.preventDefault();
    try {
      login(f.username, f.password);