// Realizamos las importaciones necesarias para el modal de edición de productos

import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { actualizarProducto } from "../../services/productoService";
import type { Producto, ProductoFormulario } from "../../types/Producto";

// Definimos las propiedades que recibirá el componente ModalEditarProducto

type Props = {
  mostrar: boolean;
  productoAEditar: Producto | null;
  onCerrar: () => void;
  onGuardar: () => void;
};

// Creamos el componente ModalEditarProducto que recibe las propiedades definidas anteriormente

const ModalEditarProducto = ({ mostrar, productoAEditar, onCerrar, onGuardar }: Props) => {
  const formik = useFormik<ProductoFormulario>({

    // Cargamos los valores del producto si existe, sino en blanco
    
    initialValues: {
      nombre: productoAEditar?.nombre || "",
      descripcion: productoAEditar?.descripcion || "",
      precio: productoAEditar?.precio || 0,
      stock: productoAEditar?.stock || 0,
    },
    enableReinitialize: true, // Esto es para que cargue los datos al abrir el modal
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      descripcion: Yup.string().required("La descripción es obligatoria"),
      precio: Yup.number().min(1, "El precio debe ser mayor a 0").required("Requerido"),
      stock: Yup.number().min(0, "El stock no puede ser negativo").required("Requerido"),
    }),
    onSubmit: async (valores) => {
      if (!productoAEditar?._id) return;
      
      try {
        await actualizarProducto(productoAEditar._id, valores);
        onGuardar(); // Le avisamos a la lista que recargue los datos
        onCerrar();  // Cerramos el modal
      } catch (error) {
        alert("Hubo un error al actualizar el repuesto.");
      }
    },
  });

  return (
    <Modal show={mostrar} onHide={onCerrar} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Repuesto</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                  isInvalid={formik.touched.nombre && !!formik.errors.nombre}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.nombre}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  name="descripcion"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.descripcion}
                  isInvalid={formik.touched.descripcion && !!formik.errors.descripcion}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.descripcion}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Precio ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.precio}
                  isInvalid={formik.touched.precio && !!formik.errors.precio}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.precio}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.stock}
                  isInvalid={formik.touched.stock && !!formik.errors.stock}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.stock}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCerrar}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalEditarProducto;