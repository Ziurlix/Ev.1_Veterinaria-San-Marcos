# Veterinaria San Marcos — Versión 2

## Descripción
Prototipo frontend de Veterinaria San Marcos, desarrollado con React y Bootstrap. Permite navegar por los servicios, registrar una cuenta de demostración, iniciar y cerrar sesión, y crear, consultar y cancelar solicitudes de citas.

## Tecnologías
- React y JavaScript.
- React Bootstrap y Bootstrap 5 para componentes y diseño adaptable.
- Jasmine y Karma para pruebas unitarias.
- React Testing Library para consultar e interactuar con los componentes durante las pruebas.

## Requisitos
- Node.js y npm instalados.
- Google Chrome o Chromium disponible para ejecutar las pruebas con Karma.

## Instalación
Desde la carpeta raíz del proyecto:

```bash
npm install
```

## Ejecutar la aplicación

```bash
npm start
```

La aplicación estará disponible de forma predeterminada en `http://localhost:3000`.

## Ejecutar las pruebas unitarias

```bash
npm test
```

Esto ejecuta Karma con Jasmine en Chrome Headless y genera el reporte de cobertura en `coverage/html/index.html`.

## Límites del prototipo
Las cuentas y las citas se almacenan en el navegador mediante `localStorage` y `sessionStorage`. Las contraseñas del prototipo se guardan en texto legible en `localStorage`, por lo que no debe usarse con datos reales ni desplegarse como sistema de producción sin un backend, autenticación segura y almacenamiento apropiado.

## Documentación de pruebas
Consulta `docs/INFORME_PRUEBAS_COBERTURA.md`. Los resultados deben actualizarse con una ejecución del código de esta revisión antes de entregar el informe como resultado definitivo.
