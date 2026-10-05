import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { crearProducto } from "../../services/productoService";
import type { ProductoFormulario } from "../../types/Producto";
import { useState } from "react";

type Props = {
  alCrear: () => void; // Función que le va a avisar a la lista que recargue los datos
};

const FormularioProducto = ({ alCrear }: Props) => {
  const [mensaje, setMensaje] = useState<string | null>(null);

  const formik = useFormik<ProductoFormulario>({
    initialValues: {
      nombre: "",
      descripcion: "",
      precio: 0,
      stock: 0,
    },
    // Yup se encarga de las validaciones obligatorias
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      descripcion: Yup.string().required("La descripción es obligatoria"),
      precio: Yup.number().min(1, "El precio debe ser mayor a 0").required("Requerido"),
      stock: Yup.number().min(0, "El stock no puede ser negativo").required("Requerido"),
    }),
    onSubmit: async (valores, { resetForm }) => {
      try {
        await crearProducto(valores);
        resetForm(); // Limpiamos los campos
        setMensaje("¡Repuesto agregado con éxito!");
        alCrear(); // Le avisamos a la tabla que se actualice
        setTimeout(() => setMensaje(null), 3000); // Borramos el mensaje a los 3 seg
      } catch (error) {
        setMensaje("Hubo un error al guardar el repuesto.");
      }
    },
  });

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-5 border">
      <h4 className="mb-4">Agregar Nuevo Repuesto</h4>
      
      {mensaje && <Alert variant={mensaje.includes("éxito") ? "success" : "danger"}>{mensaje}</Alert>}

      <Form onSubmit={formik.handleSubmit}>
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

        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Guardando..." : "Guardar Repuesto"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormularioProducto;