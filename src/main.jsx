import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx"; // Importa o AuthProvider
import { ReportProvider } from "./context/reportContext.jsx"; // Importa o AuthProvider

import "./styles/reset.css";
import "./styles/index.css";
import "./styles/fonts.css";
import "./styles/colors.css";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ReportProvider>
      <App />
    </ReportProvider>
  </AuthProvider>
);
