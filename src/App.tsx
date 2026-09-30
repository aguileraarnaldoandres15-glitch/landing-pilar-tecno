import { Container, Row, Col } from "react-bootstrap";
import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import BotonColor from "./components/BotonColor/BotonColor";
import CursoItem from "./components/CursoItem/CursoItem";

// Los Array 
const cursos = [
  { id: 1, nombre: "React" },
  { id: 2, nombre: "Node.js" },
  { id: 3, nombre: "TypeScript" },
];

function App() {
  return (
    <>
      <BarraNavegacion />

      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <h1>Pilar tecno</h1>
            <p>Bienvenido al curso de React</p>
            <BotonColor />
          </Col>
          <Col md={6}>
            <h3>Cursos disponibles</h3>
            {cursos.map((curso) => (
              <CursoItem
                key={curso.id}
                id={curso.id}
                nombre={curso.nombre}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;