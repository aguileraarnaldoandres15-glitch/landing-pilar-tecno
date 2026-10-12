import { Container } from "react-bootstrap";
import ListaProductos from "../components/ListaProductos/ListaProductos";

const PaginaInventario = () => {
  return (
    <Container className="py-5">
      <h2>Inventario de Repuestos</h2>
      <ListaProductos />
    </Container>
  );
};

export default PaginaInventario;