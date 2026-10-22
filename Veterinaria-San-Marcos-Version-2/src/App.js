import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap';
import './App.css';
import Navigation from './components/Navbar';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import RegistrationForm from './components/RegistrationForm';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showCitasModal, setShowCitasModal] = useState(false);
  const [showFormCita, setShowFormCita] = useState(false);

  // Formulario Login
  const [loginCorreo, setLoginCorreo] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Formulario Cita
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [mascota, setMascota] = useState('');
  const [tipoMascota, setTipoMascota] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const sesion = localStorage.getItem('usuarioVeterinaria');
    if (sesion) {
      setUsuario(JSON.parse(sesion));
    }
    const guardadas = localStorage.getItem('citasVeterinaria');
    if (guardadas) {
      setCitas(JSON.parse(guardadas));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const guardado = JSON.parse(localStorage.getItem('usuarioVeterinaria'));
    if (!guardado || guardado.correo !== loginCorreo || guardado.password !== loginPass) {
      setLoginError('Credenciales incorrectas o usuario no registrado.');
      return;
    }
    setUsuario(guardado);
    setShowLogin(false);
    setLoginError('');
  };

  const handleLogout = () => {
    setUsuario(null);
  };

  const solicitarServicio = (nombreServicio) => {
    if (!usuario) {
      setShowLogin(true);
      return;
    }
    setServicioSeleccionado(nombreServicio || '');
    setShowFormCita(true);
  };

  const handleCrearCita = (e) => {
    e.preventDefault();
    const nueva = {
      id: Date.now(),
      servicio: servicioSeleccionado,
      mascota,
      tipoMascota,
      fecha,
      hora,
      motivo,
      estado: 'Pendiente'
    };
    const lista = [...citas, nueva];
    setCitas(lista);
    localStorage.setItem('citasVeterinaria', JSON.stringify(lista));
    setShowFormCita(false);
    setMascota('');
    setMotivo('');
    setTipoMascota('');
    setFecha('');
    setHora('');
    alert('Solicitud de cita enviada correctamente.');
  };

  const handleCancelarCita = (id) => {
    const filtradas = citas.filter(c => c.id !== id);
    setCitas(filtradas);
    localStorage.setItem('citasVeterinaria', JSON.stringify(filtradas));
  };

  return (
    <div className="App">
      <Navigation 
        usuarioLogueado={!!usuario}
        onLoginClick={() => setShowLogin(true)}
        onCerrarSesion={handleLogout}
        onVerCitas={() => setShowCitasModal(true)}
        onAbrirRegistro={() => setShowRegistro(true)}
      />

      {/* INICIO */}
      <section id="inicio">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-text">
              <h1>Cuidamos a quienes más quieres 🐾</h1>
              <p className="lead">Atención veterinaria profesional para el cuidado y bienestar de tus mascotas.</p>
              <p>Consulta nuestros servicios y solicita atención de manera rápida y sencilla.</p>
              <Button 
                variant="primary" 
                size="lg" 
                id="btnSolicitarCita"
                onClick={() => solicitarServicio('')}
              >
                Solicitar una cita
              </Button>
            </Col>
            <Col lg={6} className="hero-video-col mt-4 mt-lg-0">
              <video className="hero-video" autoPlay muted loop playsInline>
                <source src="/video-portada.mp4" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </Col>
          </Row>
        </Container>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros">
        <Container>
          <div className="section-title">
            <h2>¿Quiénes somos?</h2>
            <p>Conoce más sobre Veterinaria San Marcos</p>
          </div>
          <div className="about-content">
            <p>Veterinaria San Marcos es una clínica ubicada en Rancagua, dedicada al cuidado y bienestar de las mascotas.</p>
            <p>La clínica atiende principalmente perros y gatos, además de conejos y aves.</p>
            <p>Nuestro objetivo es entregar una atención profesional y cercana para cada mascota.</p>
          </div>
        </Container>
      </section>

      {/* SERVICIOS */}
      <ProductList onSolicitarServicio={solicitarServicio} />

      {/* UBICACIÓN */}
      <section id="ubicacion">
        <Container>
          <div className="section-title">
            <h2>📍 Nuestra ubicación</h2>
            <p>Visítanos en Veterinaria San Marcos</p>
          </div>
          <Row className="align-items-center g-4">
            <Col lg={5}>
              <div className="contact-card">
                <h3>Veterinaria San Marcos</h3>
                <p>📍 Rancagua, Región del Libertador Bernardo O'Higgins</p>
                <p>📞 +56 9 1234 5678</p>
                <p>🕒 Lunes a Sábado: 09:00 a 19:00 hrs</p>
              </div>
            </Col>
            <Col lg={7}>
              <div className="mapa-container">
                <iframe 
                  title="mapa"
                  src="https://www.google.com/maps?q=Rancagua,%20Chile&output=embed" 
                  loading="lazy"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CONTACTO */}
      <section id="contacto">
        <Container>
          <div className="section-title">
            <h2>Contacto</h2>
            <p>Estamos para ayudarte</p>
          </div>
          <div className="contact-card">
            <p>📍 <strong>Ubicación:</strong> Rancagua, Región de O'Higgins</p>
            <p>📞 <strong>Teléfono:</strong> +56 9 1234 5678</p>
            <p>📧 <strong>Correo:</strong> contacto@veterinariasanmarcos.cl</p>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer>
        <Container className="text-center">
          <p className="mb-1">🐾 Veterinaria San Marcos</p>
          <p className="mb-0">© 2026 Veterinaria San Marcos. Todos los derechos reservados.</p>
        </Container>
      </footer>

      {/* MODAL LOGIN */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#e8f5f1' }}>
          <Modal.Title style={{ color: '#123e32', fontWeight: 700 }}>🐾 Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loginError && <Alert variant="danger">{loginError}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="ejemplo@correo.cl" required value={loginCorreo} onChange={e => setLoginCorreo(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingresa tu contraseña" required value={loginPass} onChange={e => setLoginPass(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Iniciar sesión</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* MODAL CITA */}
      <Modal show={showFormCita} onHide={() => setShowFormCita(false)} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#e8f5f1' }}>
          <Modal.Title style={{ color: '#123e32', fontWeight: 700 }}>📅 Solicitar una cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCrearCita}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Nombre de la mascota</Form.Label>
                <Form.Control required type="text" placeholder="Ej: Luna" value={mascota} onChange={e => setMascota(e.target.value)} />
              </Col>
              <Col md={6}>
                <Form.Label>Tipo de mascota</Form.Label>
                <Form.Select required value={tipoMascota} onChange={e => setTipoMascota(e.target.value)}>
                  <option value="">Selecciona una opción</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Conejo">Conejo</option>
                  <option value="Ave">Ave</option>
                </Form.Select>
              </Col>
              <Col md={12}>
                <Form.Label>Servicio</Form.Label>
                <Form.Select required value={servicioSeleccionado} onChange={e => setServicioSeleccionado(e.target.value)}>
                  <option value="">Selecciona un servicio</option>
                  <optgroup label="Vacunación">
                    <option value="Vacuna antirrábica ($12.000)">Vacuna antirrábica - $12.000</option>
                    <option value="Vacuna séxtuple canina ($18.000)">Vacuna séxtuple canina - $18.000</option>
                    <option value="Vacuna bivalente felina ($15.000)">Vacuna bivalente felina - $15.000</option>
                    <option value="Vacuna triple felina ($17.000)">Vacuna triple felina - $17.000</option>
                    <option value="Vacuna Bordetella ($14.000)">Vacuna Bordetella - $14.000</option>
                  </optgroup>
                  <optgroup label="Cirugías">
                    <option value="Esterilización canina ($60.000 - $80.000)">Esterilización canina - Desde $60.000</option>
                    <option value="Esterilización felina ($50.000 - $65.000)">Esterilización felina - Desde $50.000</option>
                    <option value="Extirpación tumor cutáneo ($120.000)">Extirpación tumor - $120.000</option>
                    <option value="Cesárea de urgencia ($180.000)">Cesárea de urgencia - $180.000</option>
                  </optgroup>
                  <optgroup label="Desparasitación">
                    <option value="Desparasitación interna ($8.000 - $11.000)">Desparasitación interna - Desde $8.000</option>
                    <option value="Antiparasitario externo pipeta ($7.500)">Antiparasitario externo (pipeta) - $7.500</option>
                  </optgroup>
                  <optgroup label="Exámenes">
                    <option value="Hemograma completo ($22.000)">Hemograma completo - $22.000</option>
                    <option value="Perfil bioquímico ($35.000)">Perfil bioquímico - $35.000</option>
                    <option value="Radiografía ($28.000)">Radiografía - $28.000</option>
                    <option value="Ecografía abdominal ($45.000)">Ecografía abdominal - $45.000</option>
                    <option value="Test de leishmaniasis ($18.000)">Test de leishmaniasis - $18.000</option>
                  </optgroup>
                  <optgroup label="Otros">
                    <option value="Corte de uñas ($5.000)">Corte de uñas - $5.000</option>
                    <option value="Limpieza dental ($55.000)">Limpieza dental - $55.000</option>
                    <option value="Microchip de identificación ($15.000)">Microchip de identificación - $15.000</option>
                    <option value="Hospitalización por día ($30.000)">Hospitalización (día) - $30.000</option>
                  </optgroup>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Fecha</Form.Label>
                <Form.Control required type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
              </Col>
              <Col md={6}>
                <Form.Label>Horario</Form.Label>
                <Form.Control required type="time" value={hora} onChange={e => setHora(e.target.value)} />
              </Col>
              <Col md={12}>
                <Form.Label>Motivo de la consulta</Form.Label>
                <Form.Control required as="textarea" rows={3} placeholder="Describe brevemente el motivo" value={motivo} onChange={e => setMotivo(e.target.value)} />
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-4 gap-2">
              <Button variant="secondary" onClick={() => setShowFormCita(false)}>Cancelar</Button>
              <Button variant="primary" type="submit">Solicitar cita</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* MODAL CITAS Y REGISTRO */}
      <ShoppingCart show={showCitasModal} handleClose={() => setShowCitasModal(false)} citas={citas} onCancelarCita={handleCancelarCita} />
      <RegistrationForm show={showRegistro} handleClose={() => setShowRegistro(false)} onRegistroExitoso={(u) => setUsuario(u)} />
    </div>
  );
}

export default App;
