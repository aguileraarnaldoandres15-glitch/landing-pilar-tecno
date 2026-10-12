// importamos las librerías necesarias para renderizar la aplicación en el DOM

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from "./App.tsx";

// Renderizamos la aplicación en el elemento con id "root" del DOM, envolviendo la aplicación en StrictMode y BrowserRouter para habilitar el enrutamiento
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);