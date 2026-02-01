import { useEffect, useState } from "react";
import { GET } from "../services/requestHTTP";
import { data } from "../../resolvedReports.js";

const useResolvedReports = () => {
  const [resolvedReports, setResolvedReports] = useState([]);

  const findAllReports = async () => {
    //const res = await GET("/report");
    // setReports(res.data.reports); // UTILIZA O REPORT VINDO DO BANCO DE DADOS
    setResolvedReports(data); // UTILIZA O REPORT VINDO DO ARQUIVO.JS
  };

  useEffect(() => {
    findAllReports();
  }, []);

  return { resolvedReports, setResolvedReports };
};

export default useResolvedReports;
