import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap';
import './App.css';
import Navigation from './components/Navbar';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import RegistrationForm from './components/RegistrationForm';

const CLAVE_USUARIO = 'usuarioVeterinaria';
const CLAVE_SESION = 'sesionVeterinaria';
const CLAVE_CITAS = 'citasVeterinaria';

// Lee datos del almacenamiento sin dejar que un JSON dañado rompa la aplicación.
function leerJSON(almacenamiento, clave, valorPorDefecto) {
  try {
    const contenido = almacenamiento.getItem(clave);
    return contenido ? JSON.parse(contenido) : valorPorDefecto;
  } catch (error) {
    console.error(`No se pudieron leer los datos "${clave}".`, error);
    return valorPorDefecto;
  }
}

function guardarJSON(almacenamiento, clave, valor) {
  try {
    almacenamiento.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.error(`No se pudieron guardar los datos "${clave}".`, error);
    return false;
  }
}

// El estado de sesión no necesita conservar la contraseña.
function datosDeSesion(cuenta) {
  if (!cuenta || typeof cuenta !== 'object') return null;
  const datosPublicos = { ...cuenta };
  delete datosPublicos.password;
  delete datosPublicos.contrasena;
  delete datosPublicos['contraseña'];
  return datosPublicos;
}

function fechaLocalActual() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

function App() {
  const [usuario, setUsuario] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showCitasModal, setShowCitasModal] = useState(false);
  const [showFormCita, setShowFormCita] = useState(false);

  const [loginCorreo, setLoginCorreo] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [mascota, setMascota] = useState('');
  const [tipoMascota, setTipoMascota] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [citas, setCitas] = useState([]);
  const [citaError, setCitaError] = useState('');
  const [mensajeCitas, setMensajeCitas] = useState('');
  const [fechaMinima] = useState(fechaLocalActual);

  useEffect(() => {
    // Solo restauramos una sesión activa; una cuenta registrada no inicia sesión sola.
    const sesionGuardada = leerJSON(sessionStorage, CLAVE_SESION, null);
    if (sesionGuardada && typeof sesionGuardada === 'object') {
      setUsuario(sesionGuardada);
    }

    const citasGuardadas = leerJSON(localStorage, CLAVE_CITAS, []);
    setCitas(Array.isArray(citasGuardadas) ? citasGuardadas : []);
  }, []);

  const iniciarSesionCon = (cuenta) => {
    const sesion = datosDeSesion(cuenta);
    if (!sesion || !sesion.correo) return false;

    if (!guardarJSON(sessionStorage, CLAVE_SESION, sesion)) {
      setLoginError('No se pudo guardar la sesión en este navegador. Revisa la configuración de almacenamiento.');
      return false;
    }

    setUsuario(sesion);
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const correoIngresado = loginCorreo.trim().toLowerCase();
    const cuentaGuardada = leerJSON(localStorage, CLAVE_USUARIO, null);
    const correoGuardado = cuentaGuardada?.correo?.trim().toLowerCase();

    if (
      !cuentaGuardada ||
      !correoGuardado ||
      correoGuardado !== correoIngresado ||
      cuentaGuardada.password !== loginPass
    ) {
      setLoginError('Credenciales incorrectas o usuario no registrado.');
      return;
    }

    if (iniciarSesionCon(cuentaGuardada)) {
      setShowLogin(false);
      setLoginCorreo('');
      setLoginPass('');
      setLoginError('');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(CLAVE_SESION);
    } catch (error) {
      console.error('No se pudo cerrar la sesión del navegador.', error);
    }

    // No borramos la cuenta registrada: el usuario podrá volver a iniciar sesión.
    setUsuario(null);
    setShowCitasModal(false);
    setShowFormCita(false);
    setLoginCorreo('');
    setLoginPass('');
    setLoginError('');
  };

  const handleRegistroExitoso = (nuevoUsuario) => {
    if (!nuevoUsuario || !nuevoUsuario.correo) {
      setShowRegistro(false);
      return;
    }

    // Conservamos la cuenta para futuros inicios de sesión y separamos la sesión activa.
    const cuentaGuardada = guardarJSON(localStorage, CLAVE_USUARIO, nuevoUsuario);
    const sesionGuardada = iniciarSesionCon(nuevoUsuario);

    if (!cuentaGuardada) {
      setMensajeCitas('La cuenta se creó en pantalla, pero el navegador no permitió guardar los datos para futuros inicios de sesión.');
    }

    if (sesionGuardada) {
      setShowRegistro(false);
    }
  };

  const solicitarServicio = (nombreServicio) => {
    setLoginError('');
    setCitaError('');
    setMensajeCitas('');

    if (!usuario) {
      setShowLogin(true);
      return;
    }

    setServicioSeleccionado(nombreServicio || '');
    setShowFormCita(true);
  };

  const limpiarFormularioCita = () => {
    setServicioSeleccionado('');
    setMascota('');
    setTipoMascota('');
    setFecha('');
    setHora('');
    setMotivo('');
    setCitaError('');
  };

  const handleCrearCita = (e) => {
    e.preventDefault();
    setCitaError('');
    setMensajeCitas('');

    if (!usuario) {
      setCitaError('Debes iniciar sesión antes de solicitar una cita.');
      return;
    }

    if (!mascota.trim() || !tipoMascota || !servicioSeleccionado || !fecha || !hora || !motivo.trim()) {
      setCitaError('Completa todos los campos antes de enviar la solicitud.');
      return;
    }

    if (fecha < fechaLocalActual()) {
      setCitaError('La fecha de la cita no puede estar en el pasado.');
      return;
    }

    // Según el horario publicado en esta página, la clínica atiende de lunes a sábado.
    const diaSemana = new Date(`${fecha}T12:00:00`).getDay();
    if (diaSemana === 0) {
      setCitaError('La clínica no atiende los domingos. Selecciona otro día.');
      return;
    }

    if (hora < '09:00' || hora > '19:00') {
      setCitaError('El horario de atención es de 09:00 a 19:00. Selecciona una hora dentro de ese rango.');
      return;
    }

    const nuevaCita = {
      id: Date.now(),
      servicio: servicioSeleccionado,
      mascota: mascota.trim(),
      tipoMascota,
      fecha,
      hora,
      motivo: motivo.trim(),
      estado: 'Pendiente',
      usuarioCorreo: usuario.correo || ''
    };

    const listaActualizada = [...citas, nuevaCita];
    if (!guardarJSON(localStorage, CLAVE_CITAS, listaActualizada)) {
      setCitaError('No se pudo guardar la cita en este navegador. Inténtalo nuevamente.');
      return;
    }

    setCitas(listaActualizada);
    setShowFormCita(false);
    limpiarFormularioCita();
    setMensajeCitas('La solicitud de cita se guardó correctamente en este navegador.');
  };

  const handleCancelarCita = (id) => {
    const listaActualizada = citas.filter((cita) => cita.id !== id);

    if (!guardarJSON(localStorage, CLAVE_CITAS, listaActualizada)) {
      setMensajeCitas('No se pudo actualizar la lista de citas. Inténtalo nuevamente.');
      return;
    }

    setCitas(listaActualizada);
    setMensajeCitas('La cita se quitó de la lista guardada en este navegador.');
  };

  return (
    <div className="App">
      <Navigation
        usuarioLogueado={Boolean(usuario)}
        onLoginClick={() => {
          setLoginError('');
          setShowLogin(true);
        }}
        onCerrarSesion={handleLogout}
        onVerCitas={() => setShowCitasModal(true)}
        onAbrirRegistro={() => setShowRegistro(true)}
      />

      {mensajeCitas && (
        <Container className="mt-3">
          <Alert variant="info" dismissible onClose={() => setMensajeCitas('')}>
            {mensajeCitas}
          </Alert>
        </Container>
      )}

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
                <p>🕒 Lunes a sábado: 09:00 a 19:00 hrs</p>
              </div>
            </Col>
            <Col lg={7}>
              <div className="mapa-container">
                <iframe
                  title="Mapa de ubicación de Veterinaria San Marcos en Rancagua"
                  src="https://www.google.com/maps?q=Rancagua%2C%20Chile&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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
          <p className="mb-0">© {new Date().getFullYear()} Veterinaria San Marcos. Todos los derechos reservados.</p>
        </Container>
      </footer>

      {/* MODAL INICIAR SESIÓN */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#e8f5f1' }}>
          <Modal.Title style={{ color: '#123e32', fontWeight: 700 }}>🐾 Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loginError && <Alert variant="danger">{loginError}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="loginCorreo">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                autoComplete="email"
                placeholder="ejemplo@correo.cl"
                required
                value={loginCorreo}
                onChange={(e) => setLoginCorreo(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginPass">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Iniciar sesión
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* MODAL SOLICITAR CITA */}
      <Modal
        show={showFormCita}
        onHide={() => {
          setShowFormCita(false);
          setCitaError('');
        }}
        centered
        size="lg"
      >
        <Modal.Header closeButton style={{ backgroundColor: '#e8f5f1' }}>
          <Modal.Title style={{ color: '#123e32', fontWeight: 700 }}>📅 Solicitar una cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {citaError && <Alert variant="danger">{citaError}</Alert>}
          <Form onSubmit={handleCrearCita}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="nombreMascota">
                  <Form.Label>Nombre de la mascota</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    maxLength={80}
                    placeholder="Ej.: Luna"
                    value={mascota}
                    onChange={(e) => setMascota(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tipoMascota">
                  <Form.Label>Tipo de mascota</Form.Label>
                  <Form.Select required value={tipoMascota} onChange={(e) => setTipoMascota(e.target.value)}>
                    <option value="">Selecciona una opción</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Conejo">Conejo</option>
                    <option value="Ave">Ave</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="servicioSeleccionado">
                  <Form.Label>Servicio</Form.Label>
                  <Form.Select required value={servicioSeleccionado} onChange={(e) => setServicioSeleccionado(e.target.value)}>
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
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="fechaCita">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    min={fechaMinima}
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="horaCita">
                  <Form.Label>Horario (09:00 a 19:00)</Form.Label>
                  <Form.Control
                    required
                    type="time"
                    min="09:00"
                    max="19:00"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="motivoCita">
                  <Form.Label>Motivo de la consulta</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    maxLength={1000}
                    placeholder="Describe brevemente el motivo"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-4 gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowFormCita(false);
                  limpiarFormularioCita();
                }}
              >
                Cancelar
              </Button>
              <Button variant="primary" type="submit">Solicitar cita</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* MODAL DE CITAS Y REGISTRO */}
      <ShoppingCart
        show={showCitasModal}
        handleClose={() => setShowCitasModal(false)}
        citas={citas}
        onCancelarCita={handleCancelarCita}
      />
      <RegistrationForm
        show={showRegistro}
        handleClose={() => setShowRegistro(false)}
        onRegistroExitoso={handleRegistroExitoso}
      />
    </div>
  );
}

export default App;
