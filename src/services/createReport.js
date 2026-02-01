import { getAccessToken } from "./acessToken";
import axios from "axios";

const url_api = import.meta.env.VITE_URBANIFY_API;

export const createReport = async ({ data, file }) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data)); // Adiciona os dados como string JSON
  formData.append("file", file); // Adiciona o arquivo

  try {
    const accessToken = getAccessToken();

    const res = await axios.post(`${url_api}/report`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (err) {
    console.error("[AXIOS-GET]: ", err);
  }
};
