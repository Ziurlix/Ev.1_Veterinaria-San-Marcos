# Informe de pruebas unitarias y cobertura

**Proyecto:** Veterinaria San Marcos — Versión 2  
**Herramientas:** Karma, Jasmine, Chrome Headless y React Testing Library.

## Estado de esta revisión

La suite contiene 18 pruebas unitarias definidas. Los resultados de ejecución de esta revisión están pendientes de verificación.

El informe anterior registraba 17 pruebas exitosas y 0 fallidas, con 100 % de cobertura en los componentes evaluados. Esos resultados corresponden a una ejecución anterior y no se presentan como resultados confirmados de esta versión revisada.

## Componentes cubiertos

- Navbar.js: navegación y acciones del menú.
- ProductList.js: visualización de servicios y selección.
- RegistrationForm.js: validación del registro y confirmación.
- ShoppingCart.js: visualización de citas y solicitud de cancelación.

## Ejecutar las pruebas

Desde la carpeta raíz del proyecto:

    npm install
    npm test

Karma debe generar el reporte HTML en `coverage/html/index.html`.

Después de ejecutar las pruebas, actualiza este informe con los resultados reales.

## Limitaciones

La cobertura se limita a los archivos incluidos en la ejecución. Las cuentas y citas se guardan en el navegador; el prototipo no sustituye un sistema de autenticación seguro ni una base de datos.
