import { createContext, useContext, useState, useEffect } from "react";

const AuthCtx = createContext();

const FAKE_USERS = [
  { username: "admin", password: "1234", nombre: "Admin" },
  { username: "usuario", password: "abcd", nombre: "Usuario Demo" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (username, password) => {
    if (!username || !password) {
    throw new Error("Debe completar usuario y contraseña");
  }
    const found = FAKE_USERS.find(u => u.username === username);
  if (!found || found.password !== password) {
    throw new Error("Credenciales inválidas");
  }
    const u = { username: found.username, nombre: found.nombre };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
