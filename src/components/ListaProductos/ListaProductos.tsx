import { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Spinner } from "react-bootstrap";
import { obtenerProductos } from "../../services/productoService";
import type { Producto } from "../../types/Producto";
import FormularioProducto from "../FormularioProducto/FormularioProducto"; // <-- Importamos el form

const ListaProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Separamos la llamada a la API en una función para poder llamarla después de crear un producto
  const cargarDatos = () => {
    setCargando(true);
    obtenerProductos()
      .then(setProductos)
      .catch(() => setError("No se pudieron cargar los repuestos de la API"))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <>
      {/* Colocamos el formulario arriba, y le pasamos cargarDatos para que actualice la lista */}
      <FormularioProducto alCrear={cargarDatos} />

      <h3 className="mb-4">Repuestos Disponibles</h3>

      {cargando && (
        <div className="text-center mt-4">
          <Spinner animation="border" role="status" />
          <span className="ms-2">Cargando inventario...</span>
        </div>
      )}
      
      {error && <p className="text-danger mt-4 text-center">{error}</p>}
      
      {!cargando && !error && productos.length === 0 && (
        <p className="text-center mt-4">No hay repuestos en el inventario.</p>
      )}

      {!cargando && !error && productos.length > 0 && (
        <Row className="mt-4">
          {productos.map((producto) => (
            <Col md={4} key={producto._id} className="mb-4">
              <Card className="h-100 shadow-sm border-0 bg-light">
                <Card.Body>
                  <Card.Title className="fw-bold">{producto.nombre}</Card.Title>
                  <Card.Text className="text-secondary">
                    {producto.descripcion}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <h5 className="mb-0 text-success fw-bold">${producto.precio}</h5>
                    <Badge bg={producto.stock > 5 ? "primary" : "danger"} pill>
                      Stock: {producto.stock}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ListaProductos;