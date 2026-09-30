import { useState } from "react";
import { Button } from "react-bootstrap";
import ModalColor from "../ModalColor/ModalColor";

const BotonColor = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <>
      <Button onClick={() => setMostrarModal(true)}>Personalizar</Button>

      <ModalColor
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
      />
    </>
  );
};

export default BotonColor;