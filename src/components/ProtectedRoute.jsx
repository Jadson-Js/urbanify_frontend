import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = () => {
  const { user } = useAuth(); // Obtém o usuário do contexto

  if (!user) return <Navigate to="/" replace />; // Se não estiver autenticado, redireciona para login
  if (user.role !== "ADMIN") return <Navigate to="/" replace />; // Se não for ADMIN, também redireciona

  return <Outlet />; // Se estiver autenticado e for ADMIN, renderiza a rota protegida
};

export default ProtectedRoute;
