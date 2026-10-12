// Realizamos la importación de useState y useEffect para poder manejar el estado y los efectos secundarios en nuestro componente

import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../services/productoService";
import type { Producto } from "../types/Producto";

const PaginaInicio = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  // Llamamos a la API apenas carga el inicio
  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch((err) => console.error("Error al cargar métricas:", err));
  }, []);

  // Calculamos los datos en tiempo real
  const totalRepuestos = productos.length;

  // Consideramos "Bajo Stock" a los repuestos que tengan 10 o menos unidades
  const bajoStock = productos.filter((prod) => prod.stock <= 10).length;

  return (
    <div>
      {/* 1. SECCIÓN HERO */}

      <div 
        className="text-white py-5 mb-5 position-relative"
        style={{
          background: "linear-gradient(rgba(10, 15, 30, 0.85), rgba(10, 15, 30, 0.95)), url(https://i.pinimg.com/1200x/5a/f4/da/5af4da5e40c96e83c6d5ba749bf3e4c0.jpg) no-repeat center center",
          backgroundSize: "cover",
          minHeight: "450px",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Container className="text-center py-5">
          <h1 className="fw-bold display-4 mb-3">
            Gestión de Repuestos
          </h1>
          <p className="lead text-light mb-4 mx-auto" style={{ maxWidth: "650px" }}>
            La solución definitiva para el control, administración y supervisión de tu inventario de repuestos.
          </p>

          {/* Agregamos un botón que redirige a la página de inventario */}

          <div className="d-flex justify-content-center gap-3">
            <Link to="/inventario" className="btn btn-primary btn-lg px-4 py-2 fw-semibold shadow">
              Ver Inventario <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </Container>
      </div>

      <Container>
        {/* 2. TARJETITAS DE ESTADO REAL */}

        <Row className="justify-content-center mb-5 mt-n5" style={{ transform: "translateY(-40px)", zIndex: 5, position: "relative" }}>
          <Col md={4} className="mb-3">
            <Card className="border-0 shadow-lg rounded-4 h-100 p-3">
              <Card.Body className="d-flex align-items-center">
                <div className="bg-light p-3 rounded-3 text-secondary me-3" style={{ fontSize: "2rem" }}>
                  <i className="bi bi-box-seam"></i>
                </div>
                <div>
                  <h6 className="text-secondary mb-1">Total Repuestos</h6>
                  <h3 className="fw-bold mb-1">{totalRepuestos}</h3>
                  <small className="text-muted">Registrados en el sistema</small>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-3">
            <Card className="border-0 shadow-lg rounded-4 h-100 p-3">
              <Card.Body className="d-flex align-items-center">
                <div className="bg-light p-3 rounded-3 text-danger me-3" style={{ fontSize: "2rem" }}>
                  <i className="bi bi-exclamation-triangle"></i>
                </div>
                <div>
                  <h6 className="text-secondary mb-1">Bajo Stock</h6>
                  <h3 className="fw-bold mb-1 text-danger">{bajoStock}</h3>
                  <small className="text-muted">10 unidades o menos</small>
                </div>
              </Card.Body>
            </Card>
          </Col>

          
        </Row>

        {/* 3. SECCIÓN DE CARACTERÍSTICAS */}

        <div className="text-center py-4 mb-5">
          <h2 className="fw-bold mb-5">¿Qué puedes hacer?</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="mb-3 text-primary fs-1">
                <i className="bi bi-pencil-square"></i>
              </div>
              <h5 className="fw-bold">Alta y Edición</h5>
              <p className="text-muted px-3">
                Crea, edita y actualiza tus productos al instante con validaciones automáticas.
              </p>
            </Col>

            <Col md={4}>
              <div className="mb-3 text-warning fs-1">
                <i className="bi bi-graph-down-arrow"></i>
              </div>
              <h5 className="fw-bold">Control de Stock</h5>
              <p className="text-muted px-3">
                Visualiza alertas dinámicas de stock y cantidades críticas de inmediato.
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default PaginaInicio;