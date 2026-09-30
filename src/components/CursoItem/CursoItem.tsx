import { Card } from "react-bootstrap";

// Props tipadas con TypeScript 
type CursoItemProps = {
  id: number;
  nombre: string;
};

const CursoItem = ({ id, nombre }: CursoItemProps) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>Curso #{id} - Pilar Tecno</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CursoItem;