import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const serviciosData = [
  {
    id: 1,
    icono: '💉',
    titulo: 'Vacunación',
    desc: 'Antirrábica, séxtuple, triple felina y refuerzos anuales.',
    tiempo: '~10 Minutos',
    precio: 'Desde $12.000 CLP'
  },
  {
    id: 2,
    icono: '⚕️',
    titulo: 'Cirugía',
    desc: 'Esterilizaciones, cesáreas y cirugías menores con anestesia.',
    tiempo: '~45 - 90 Minutos',
    precio: 'Desde $50.000 CLP'
  },
  {
    id: 3,
    icono: '🪱',
    titulo: 'Desparasitación',
    desc: 'Tratamientos internos según peso y antiparasitario externo.',
    tiempo: '~5 Minutos',
    precio: 'Desde $7.500 CLP'
  },
  {
    id: 4,
    icono: '🔬',
    titulo: 'Exámenes clínicos',
    desc: 'Hemogramas, perfil bioquímico, radiografías y ecografías.',
    tiempo: '20 - 30 Minutos',
    precio: 'Desde $18.000 CLP'
  },
  {
    id: 5,
    icono: '✂️',
    titulo: 'Procedimientos y Cuidados',
    desc: 'Corte de uñas, microchip con registro y limpieza dental.',
    tiempo: 'Variable',
    precio: 'Desde $5.000 CLP'
  }
];

export default function ProductList({ onSolicitarServicio }) {
  return (
    <section id="servicios">
      <Container>
        <div className="section-title">
          <h2>Nuestros servicios</h2>
          <p>Servicios profesionales para el bienestar de tu mascota</p>
        </div>
        <Row className="g-4">
          {serviciosData.map((item) => (
            <Col md={6} lg={4} key={item.id}>
              <Card className="service-card h-100">
                <Card.Body>
                  <div className="service-icon">{item.icono}</div>
                  <h3>{item.titulo}</h3>
                  <Card.Text>{item.desc}</Card.Text>
                  <div className="d-flex justify-content-between text-muted small my-2 px-1">
                    <span>{item.tiempo}</span>
                    <strong className="text-success">{item.precio}</strong>
                  </div>
                  <Button 
                    variant="primary" 
                    className="w-100 mt-2" 
                    onClick={() => onSolicitarServicio(item.titulo)}
                  >
                    Solicitar cita
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
