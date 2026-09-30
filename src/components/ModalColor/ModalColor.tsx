import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

// los Props tipadas del Modal (patrón show / onHide para controlar la visibilidad del modal)
type ModalColorProps = {
  show: boolean;
  onHide: () => void;
};

const ModalColor = ({ show, onHide }: ModalColorProps) => {
  const [colorTitulo, setColorTitulo] = useState("#1B2A4A");

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Elegí un color</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="color"
          value={colorTitulo}
          onChange={(e) => setColorTitulo(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onHide}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalColor;