import React, { createContext, useState } from "react";

// Criação do contexto
export const ReportContext = createContext();

// Provedor do contexto
export const ReportProvider = ({ children }) => {
  const [modalData, setModalData] = useState();

  return (
    <ReportContext.Provider value={{ modalData, setModalData }}>
      {children}
    </ReportContext.Provider>
  );
};
