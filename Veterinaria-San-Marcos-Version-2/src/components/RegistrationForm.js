import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

export default function RegistrationForm({
  show,
  handleClose,
  onRegistroExitoso
}) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terminos, setTerminos] = useState(false);
  const [error, setError] = useState('');

  const limpiarFormulario = () => {
    setNombre('');
    setCorreo('');
    setTelefono('');
    setPassword('');
    setConfirmPassword('');
    setTerminos(false);
    setError('');
  };

  const cerrarFormulario = () => {
    limpiarFormulario();
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim().toLowerCase();
    const telefonoLimpio = telefono.trim();

    if (
      !nombreLimpio ||
      !correoLimpio ||
      !telefonoLimpio ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!terminos) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    const nuevoUsuario = {
      nombre: nombreLimpio,
      correo: correoLimpio,
      telefono: telefonoLimpio,
      password
    };

    try {
      // App.js es responsable de guardar la cuenta y administrar la sesión.
      const registroCorrecto = onRegistroExitoso(nuevoUsuario);

      if (registroCorrecto !== true) {
        setError(
          'No se pudo guardar la cuenta. Inténtalo nuevamente.'
        );
        return;
      }

      limpiarFormulario();
      handleClose();
    } catch (err) {
      console.error('Error al registrar al usuario:', err);
      setError(
        'No se pudo completar el registro. Inténtalo nuevamente.'
      );
    }
  };

  return (
    <Modal
      show={show}
      onHide={cerrarFormulario}
      centered
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: '#e8f5f1' }}
      >
        <Modal.Title
          style={{ color: '#123e32', fontWeight: 700 }}
        >
          🐾 Crear cuenta
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && (
          <Alert variant="danger" role="alert">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="registroNombre">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control
              type="text"
              autoComplete="name"
              placeholder="Ej.: Juan Pérez"
              maxLength={100}
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="registroCorreo">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              autoComplete="email"
              placeholder="ejemplo@correo.cl"
              maxLength={254}
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="registroTelefono">
            <Form.Label>Número de teléfono</Form.Label>
            <Form.Control
              type="tel"
              autoComplete="tel"
              placeholder="Ej.: 912345678"
              maxLength={20}
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="registroPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="registroConfirmarPassword"
          >
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              autoComplete="new-password"
              placeholder="Repite tu contraseña"
              minLength={6}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="registroTerminos">
            <Form.Check
              type="checkbox"
              label="Acepto los términos y condiciones."
              checked={terminos}
              onChange={(e) => setTerminos(e.target.checked)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
          >
            Crear cuenta
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
