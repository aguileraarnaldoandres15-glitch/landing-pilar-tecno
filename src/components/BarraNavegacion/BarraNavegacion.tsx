// Importamos las librerías necesarias para la barra de navegación

import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// Creamos el componente BarraNavegacion que se encargará de mostrar la barra de navegación con los enlaces a las diferentes secciones de la aplicación

const BarraNavegacion = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">AndyRepuesto</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/inventario">Inventario</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraNavegacion;