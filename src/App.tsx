// importamos las librerías necesarias para la aplicación

import { Routes, Route } from "react-router-dom";
import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import PaginaInicio from "./pages/PaginaInicio";
import PaginaInventario from "./pages/PaginaInventario";

function App() {
  return (
    <>
      <BarraNavegacion />
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/inventario" element={<PaginaInventario />} />
      </Routes>
    </>
  );
}

export default App;