import { useNavigate } from "react-router-dom";
import { saveAccessToken } from "../services/acessToken";
import { authLogin } from "../services/requestHTTP";
import { jwtDecode } from "jwt-decode";

const useAuthGoogle = () => {
  const navigate = useNavigate(); // Use useNavigate para redirecionar

  const signIn = async (authToken) => {
    try {
      const response = await authLogin({ authToken });
      const token = response.data.accessToken;
      const decoded = jwtDecode(token);

      if (response.status !== 200 || decoded.role !== "ADMIN")
        throw new Error();

      const { accessToken } = response.data;
      saveAccessToken(accessToken);
      navigate("/dashboard");
    } catch (err) {
      console.log(`[AXIOS]: ${err}`);
    }
  };

  return {
    // Função de autenticação
    signIn,
  };
};

export default useAuthGoogle;
