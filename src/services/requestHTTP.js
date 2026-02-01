import axios from "axios";
import { getAccessToken } from "./acessToken";

const url_api = import.meta.env.VITE_URBANIFY_API;

export const login = async (obj) => {
  try {
    const response = await axios.post(`${url_api}/user/login`, obj, {
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } catch (err) {
    console.error("[LOGIN]: ", err);
    return null;
  }
};

export const authLogin = async (obj) => {
  try {
    const response = await axios.post(`${url_api}/user/auth/google`, obj, {
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } catch (err) {
    console.error("[LOGIN]: ", err);
    return null;
  }
};

// FUNÇÕES PARA AS REQUISIÇÕES NECESSÁRIAS

export const GET = async (extend__url) => {
  try {
    const accessToken = getAccessToken();
    // Incluindo o token no cabeçalho da requisição
    const res = await axios.get(`${url_api}${extend__url}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Adicionando o token no cabeçalho
      },
    });

    return res;
  } catch (err) {
    console.error("[AXIOS-GET]: ", err);
  }
};
