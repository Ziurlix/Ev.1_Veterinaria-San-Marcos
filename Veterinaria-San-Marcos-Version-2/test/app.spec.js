import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react';

import ProductList from '../src/components/ProductList';
import ShoppingCart from '../src/components/ShoppingCart';
import RegistrationForm from '../src/components/RegistrationForm';

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('Pruebas unitarias - Veterinaria San Marcos', () => {

  // PRUEBAS 1 A 3: SERVICIOS

  it('1. Muestra el título de servicios', () => {
    render(
      <ProductList onSolicitarServicio={() => {}} />
    );

    expect(
      screen.getByRole('heading', {
        name: 'Nuestros servicios'
      })
    ).toBeTruthy();
  });

  it('2. Muestra los cinco servicios veterinarios', () => {
    render(
      <ProductList onSolicitarServicio={() => {}} />
    );

    const servicios = [
      'Vacunación',
      'Cirugía',
      'Desparasitación',
      'Exámenes clínicos',
      'Procedimientos y Cuidados'
    ];

    servicios.forEach((servicio) => {
      expect(
        screen.getByRole('heading', {
          name: servicio
        })
      ).toBeTruthy();
    });
  });

  it('3. Envía el servicio seleccionado a la función correspondiente', () => {
    const solicitarServicio = jasmine.createSpy(
      'solicitarServicio'
    );

    render(
      <ProductList
        onSolicitarServicio={solicitarServicio}
      />
    );

    const botones = screen.getAllByRole('button', {
      name: 'Solicitar cita'
    });

    fireEvent.click(botones[3]);

    expect(
      solicitarServicio
    ).toHaveBeenCalledWith('Exámenes clínicos');
  });


  // PRUEBAS 4 Y 5: CITAS

  const citaEjemplo = {
    id: 101,
    servicio: 'Vacunación',
    mascota: 'Luna',
    tipoMascota: 'Perro',
    fecha: '2026-10-25',
    hora: '10:30',
    motivo: 'Control anual',
    estado: 'Pendiente'
  };

  it('4. Muestra un mensaje cuando no existen citas', async () => {
    render(
      <ShoppingCart
        show={true}
        handleClose={() => {}}
        citas={[]}
        onCancelarCita={() => {}}
      />
    );

    expect(
      await screen.findByText(
        'No tienes citas registradas actualmente.'
      )
    ).toBeTruthy();
  });

  it('5. Muestra los datos de la cita y permite solicitar su cancelación', async () => {
    const cancelarCita = jasmine.createSpy(
      'cancelarCita'
    );

    render(
      <ShoppingCart
        show={true}
        handleClose={() => {}}
        citas={[citaEjemplo]}
        onCancelarCita={cancelarCita}
      />
    );

    expect(
      await screen.findByText(/Vacunación/)
    ).toBeTruthy();

    expect(
      screen.getByText(/Luna \(Perro\)/)
    ).toBeTruthy();

    expect(
      screen.getByText(/Control anual/)
    ).toBeTruthy();

    const botonCancelar = await screen.findByRole(
      'button',
      { name: /Cancelar cita/ }
    );

    fireEvent.click(botonCancelar);

    expect(
      cancelarCita
    ).toHaveBeenCalledWith(101);
  });


  // FUNCION AUXILIAR PARA PROBAR EL REGISTRO

  async function completarRegistro({
    nombre = 'Cristian Rain',
    correo = 'cristian@example.com',
    telefono = '912345678',
    password = 'secreto123',
    confirmPassword = password,
    aceptarTerminos = true
  } = {}) {
    fireEvent.change(
      await screen.findByPlaceholderText('Ej.: Juan Pérez'),
      { target: { value: nombre } }
    );

    fireEvent.change(
      screen.getByPlaceholderText('ejemplo@correo.cl'),
      { target: { value: correo } }
    );

    fireEvent.change(
      screen.getByPlaceholderText('Ej.: 912345678'),
      { target: { value: telefono } }
    );

    fireEvent.change(
      screen.getByPlaceholderText('Mínimo 6 caracteres'),
      { target: { value: password } }
    );

    fireEvent.change(
      screen.getByPlaceholderText('Repite tu contraseña'),
      { target: { value: confirmPassword } }
    );

    if (aceptarTerminos) {
      fireEvent.click(screen.getByRole('checkbox'));
    }
  }


  // PRUEBAS 6 A 10: REGISTRO

  it('6. Rechaza el registro si los campos están vacíos', async () => {
    render(
      <RegistrationForm
        show={true}
        handleClose={() => {}}
        onRegistroExitoso={() => {}}
      />
    );

    fireEvent.click(
      await screen.findByRole('button', {
        name: 'Crear cuenta'
      })
    );

    expect(
      await screen.findByText(
        'Todos los campos son obligatorios.'
      )
    ).toBeTruthy();
  });

  it('7. Rechaza contraseñas de menos de seis caracteres', async () => {
    render(
      <RegistrationForm
        show={true}
        handleClose={() => {}}
        onRegistroExitoso={() => {}}
      />
    );

    await completarRegistro({
      password: '12345',
      confirmPassword: '12345'
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Crear cuenta'
      })
    );

    expect(
      await screen.findByText(
        'La contraseña debe tener al menos 6 caracteres.'
      )
    ).toBeTruthy();
  });

  it('8. Rechaza contraseñas que no coinciden', async () => {
    render(
      <RegistrationForm
        show={true}
        handleClose={() => {}}
        onRegistroExitoso={() => {}}
      />
    );

    await completarRegistro({
      password: 'secreto123',
      confirmPassword: 'secreto456'
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Crear cuenta'
      })
    );

    expect(
      await screen.findByText(
        'Las contraseñas no coinciden.'
      )
    ).toBeTruthy();
  });

  it('9. Exige aceptar los términos y condiciones', async () => {
    render(
      <RegistrationForm
        show={true}
        handleClose={() => {}}
        onRegistroExitoso={() => {}}
      />
    );

    await completarRegistro({
      aceptarTerminos: false
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Crear cuenta'
      })
    );

    expect(
      await screen.findByText(
        'Debes aceptar los términos y condiciones.'
      )
    ).toBeTruthy();
  });

  it('10. Notifica a App.js el nuevo usuario y cierra el formulario si confirma éxito', async () => {
    const cerrarModal = jasmine.createSpy('cerrarModal');
    const registroExitoso = jasmine.createSpy('registroExitoso').and.returnValue(true);

    render(
      <RegistrationForm
        show={true}
        handleClose={cerrarModal}
        onRegistroExitoso={registroExitoso}
      />
    );

    await completarRegistro();
    fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }));

    expect(registroExitoso).toHaveBeenCalledWith({
      nombre: 'Cristian Rain',
      correo: 'cristian@example.com',
      telefono: '912345678',
      password: 'secreto123'
    });
    expect(cerrarModal).toHaveBeenCalled();
    // El componente de formulario delega el almacenamiento a App.js.
    expect(localStorage.getItem('usuarioVeterinaria')).toBeNull();
  });

  it('11. Mantiene el formulario abierto si App.js no confirma el registro', async () => {
    const cerrarModal = jasmine.createSpy('cerrarModal');
    const registroExitoso = jasmine.createSpy('registroExitoso').and.returnValue(false);

    render(
      <RegistrationForm
        show={true}
        handleClose={cerrarModal}
        onRegistroExitoso={registroExitoso}
      />
    );

    await completarRegistro();
    fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }));

    expect(await screen.findByText(
      'No se pudo guardar la cuenta. Inténtalo nuevamente.'
    )).toBeTruthy();
    expect(cerrarModal).not.toHaveBeenCalled();
  });

});
