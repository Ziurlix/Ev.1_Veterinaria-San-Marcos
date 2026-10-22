import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react';

import Navigation from '../src/components/Navbar';

afterEach(() => {
  cleanup();
});

describe('Pruebas unitarias de navegación', () => {

  function crearProps(usuarioLogueado = false) {
    return {
      usuarioLogueado,
      onLoginClick: jasmine.createSpy('onLoginClick'),
      onCerrarSesion: jasmine.createSpy('onCerrarSesion'),
      onVerCitas: jasmine.createSpy('onVerCitas'),
      onAbrirRegistro: jasmine.createSpy('onAbrirRegistro')
    };
  }

  it('1. Muestra los enlaces principales del menú', () => {
    render(<Navigation {...crearProps(false)} />);

    expect(screen.getByRole('link', { name: 'Inicio' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Nosotros' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Servicios' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Ubicación' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Contacto' })).toBeTruthy();
  });

  it('2. Muestra Iniciar sesión cuando no hay usuario conectado', () => {
    render(<Navigation {...crearProps(false)} />);

    expect(
      screen.getByRole('button', { name: 'Iniciar sesión' })
    ).toBeTruthy();

    expect(
      screen.queryByRole('button', { name: 'Salir' })
    ).toBeNull();
  });

  it('3. Ejecuta la función al pulsar Iniciar sesión', () => {
    const props = crearProps(false);
    render(<Navigation {...props} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Iniciar sesión' })
    );

    expect(props.onLoginClick).toHaveBeenCalled();
  });

  it('4. Ejecuta la función al pulsar Registrarse', () => {
    const props = crearProps(false);
    render(<Navigation {...props} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Registrarse' })
    );

    expect(props.onAbrirRegistro).toHaveBeenCalled();
  });

  it('5. Muestra Mis Citas y Salir cuando hay un usuario conectado', () => {
    render(<Navigation {...crearProps(true)} />);

    expect(
      screen.getByRole('button', { name: /Mis Citas/ })
    ).toBeTruthy();

    expect(
      screen.getByRole('button', { name: 'Salir' })
    ).toBeTruthy();

    expect(
      screen.queryByRole('button', { name: 'Iniciar sesión' })
    ).toBeNull();
  });

  it('6. Ejecuta la función al pulsar Mis Citas', () => {
    const props = crearProps(true);
    render(<Navigation {...props} />);

    fireEvent.click(
      screen.getByRole('button', { name: /Mis Citas/ })
    );

    expect(props.onVerCitas).toHaveBeenCalled();
  });

  it('7. Ejecuta la función al pulsar Salir', () => {
    const props = crearProps(true);
    render(<Navigation {...props} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Salir' })
    );

    expect(props.onCerrarSesion).toHaveBeenCalled();
  });

});
