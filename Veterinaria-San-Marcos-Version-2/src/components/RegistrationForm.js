import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

export default function RegistrationForm({ show, handleClose, onRegistroExitoso }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terminos, setTerminos] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !correo.trim() || !telefono.trim() || !password.trim() || !confirmPassword.trim()) {
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

    const usuario = { nombre, correo, telefono, password };
    localStorage.setItem('usuarioVeterinaria', JSON.stringify(usuario));
    setError('');
    onRegistroExitoso(usuario);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: '#e8f5f1' }}>
        <Modal.Title style={{ color: '#123e32', fontWeight: 700 }}>🐾 Crear Cuenta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control type="text" placeholder="Ej: Juan Pérez" value={nombre} onChange={e => setNombre(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="ejemplo@correo.cl" value={correo} onChange={e => setCorreo(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Número de teléfono</Form.Label>
            <Form.Control type="tel" placeholder="Ej: 912345678" value={telefono} onChange={e => setTelefono(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control type="password" placeholder="Repite tu contraseña" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Check type="checkbox" label="Acepto los términos y condiciones." checked={terminos} onChange={e => setTerminos(e.target.checked)} />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Crear cuenta</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
