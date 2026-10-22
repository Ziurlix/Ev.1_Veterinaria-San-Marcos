import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function Navigation({ usuarioLogueado, onLoginClick, onCerrarSesion, onVerCitas, onAbrirRegistro }) {
  return (
    <header>
      <Navbar expand="lg" variant="dark" className="navbar-custom">
        <Container>
          <Navbar.Brand href="#inicio" className="fw-bold">
            🐾 Veterinaria San Marcos
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menuPrincipal" />
          <Navbar.Collapse id="menuPrincipal">
            <Nav className="ms-auto align-items-lg-center">
              <Nav.Link href="#inicio">Inicio</Nav.Link>
              <Nav.Link href="#nosotros">Nosotros</Nav.Link>
              <Nav.Link href="#servicios">Servicios</Nav.Link>
              <Nav.Link href="#ubicacion">Ubicación</Nav.Link>
              <Nav.Link href="#contacto">Contacto</Nav.Link>
              {usuarioLogueado ? (
                <>
                  <Button variant="warning" className="ms-lg-3 my-1" onClick={onVerCitas}>
                    📅 Mis Citas
                  </Button>
                  <Button variant="outline-light" className="ms-lg-2 my-1" onClick={onCerrarSesion}>
                    Salir
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="light" className="ms-lg-3 my-1" onClick={onLoginClick}>
                    Iniciar sesión
                  </Button>
                  <Button variant="outline-light" className="ms-lg-2 my-1" onClick={onAbrirRegistro}>
                    Registrarse
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
