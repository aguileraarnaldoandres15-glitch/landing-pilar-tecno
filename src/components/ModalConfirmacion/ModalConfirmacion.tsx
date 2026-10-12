// Realizamos las importaciones necesarias para el modal de confirmación de eliminación de productos

import { Modal, Button } from "react-bootstrap";
import type { Producto } from "../../types/Producto";

// Definimos las propiedades que recibirá el componente ModalConfirmacion

type Props = {
  mostrar: boolean;
  productoAEliminar: Producto | null;
  onCerrar: () => void;
  onConfirmar: () => void;
  estaEliminando: boolean;
};

// Creamos el componente ModalConfirmacion que recibe las propiedades definidas anteriormente

const ModalConfirmacion = ({
  mostrar,
  productoAEliminar,
  onCerrar,
  onConfirmar,
  estaEliminando,
}: Props) => {
  return (
    <Modal show={mostrar} onHide={onCerrar} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro que querés eliminar el repuesto{" "}
        <strong>{productoAEliminar?.nombre}</strong>?
        <br />
        <span className="text-danger small">Esta acción no se puede deshacer.</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCerrar} disabled={estaEliminando}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirmar} disabled={estaEliminando}>
          {estaEliminando ? "Eliminando..." : "Sí, eliminar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmacion;