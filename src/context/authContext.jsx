import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "../services/acessToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // Inicializa como `undefined` para diferenciar de `null`

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  if (user === undefined) {
    return null; // Evita renderizar antes da verificação do token
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
