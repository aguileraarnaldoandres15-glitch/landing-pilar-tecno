// Realizamos las importaciones necesarias para el componente ListaProductos

import { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Spinner, Button } from "react-bootstrap";
import { obtenerProductos, eliminarProducto } from "../../services/productoService";
import type { Producto } from "../../types/Producto";
import FormularioProducto from "../FormularioProducto/FormularioProducto";
import ModalConfirmacion from "../ModalConfirmacion/ModalConfirmacion";
import ModalEditarProducto from "../ModalEditarProducto/ModalEditarProducto";

// Creamos el componente ListaProductos que se encargará de mostrar la lista de productos y manejar los modales de edición y eliminación

const ListaProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el Modal de eliminación

  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [estaEliminando, setEstaEliminando] = useState(false);

  // Función para cargar los datos de la API y manejar los estados de carga y error

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

  // Estados para el Modal de edición

  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState<Producto | null>(null);

  const handleClickEditar = (producto: Producto) => {
    setProductoAEditar(producto);
    setMostrarModalEditar(true);
  };

  // Función que se ejecuta al hacer clic en el botón rojo de la tarjeta

  const handleClickEliminar = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setMostrarModal(true);
  };

  // Función que se ejecuta al confirmar dentro del Modal

  const confirmarEliminacion = async () => {
    if (!productoSeleccionado || !productoSeleccionado._id) return;
    
    setEstaEliminando(true);
    try {
      await eliminarProducto(productoSeleccionado._id);
      setMostrarModal(false);
      cargarDatos(); // Recargamos la lista después de borrar
    } catch (error) {
      alert("Hubo un error al eliminar el repuesto.");
    } finally {
      setEstaEliminando(false);
      setProductoSeleccionado(null);
    }
  };

  return (
    <>
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
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{producto.nombre}</Card.Title>
                  <Card.Text className="text-secondary flex-grow-1">
                    {producto.descripcion}
                  </Card.Text>
                  
                  <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                    <h5 className="mb-0 text-success fw-bold">${producto.precio}</h5>
                    <Badge bg={producto.stock > 5 ? "primary" : "danger"} pill>
                      Stock: {producto.stock}
                    </Badge>
                  </div>

                  <div className="d-flex gap-2 border-top pt-3 mt-auto">
                    
                    <Button 
                     variant="outline-primary" 
                     size="sm" 
                     className="w-50"
                     onClick={() => handleClickEditar(producto)}
                        >
                       Editar
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      className="w-50"
                      onClick={() => handleClickEliminar(producto)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Insertamos el Modal de confirmación */}
      <ModalConfirmacion
        mostrar={mostrarModal}
        productoAEliminar={productoSeleccionado}
        onCerrar={() => setMostrarModal(false)}
        onConfirmar={confirmarEliminacion}
        estaEliminando={estaEliminando}
      />
      
      {/* Insertamos el Modal de edición */}

      <ModalEditarProducto
        mostrar={mostrarModalEditar}
        productoAEditar={productoAEditar}
        onCerrar={() => setMostrarModalEditar(false)}
        onGuardar={cargarDatos}
      />
    </>
  );
};

export default ListaProductos;