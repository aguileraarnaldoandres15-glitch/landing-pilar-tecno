// src/components/ListaProductos/ListaProductos.tsx
import { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Spinner } from "react-bootstrap";
import { obtenerProductos } from "../../services/productoService";
import type { Producto } from "../../types/Producto";

const ListaProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect se encarga de pedir los datos a la API apenas el componente se monta
  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch(() => setError("No se pudieron cargar los repuestos de la API"))
      .finally(() => setCargando(false));
  }, []);

  return (
    <>
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
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text className="text-secondary">
                    {producto.descripcion}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-success">${producto.precio}</h5>
                    <Badge bg={producto.stock > 5 ? "primary" : "danger"}>
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