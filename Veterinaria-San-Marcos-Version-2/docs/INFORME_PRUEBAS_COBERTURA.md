# Informe de pruebas unitarias y cobertura

**Proyecto:** Veterinaria San Marcos — Versión 2  
**Fecha de ejecución:** 22 de octubre de 2026

## 1. Herramientas utilizadas

- Karma: ejecución de las pruebas.
- Jasmine: definición de pruebas unitarias.
- Chrome Headless: ejecución automatizada del navegador.
- React Testing Library: interacción y comprobación de componentes.
- GitHub Actions: ejecución automática de pruebas y compilación.

## 2. Resultado de la ejecución

- Pruebas ejecutadas: 18.
- Pruebas exitosas: 18.
- Pruebas fallidas: 0.
- Resultado: exitoso.

La ejecución automatizada finalizó correctamente.
La compilación de React también terminó sin errores.

## 3. Cobertura de código

Resultados obtenidos en la ejecución:

- Sentencias: 90,90 % (60/66).
- Ramas: 80,64 % (25/31).
- Funciones: 88,88 % (16/18).
- Líneas: 90,90 % (60/66).

Estos porcentajes corresponden únicamente al código
instrumentado por la configuración de cobertura.
No representan el 100 % de toda la aplicación.

## 4. Componentes evaluados

- Navbar.js: navegación y acciones del menú.
- ProductList.js: visualización y selección de servicios.
- RegistrationForm.js: validación del formulario de registro.
- ShoppingCart.js: visualización de citas y solicitud de cancelación.

## 5. Automatización

El flujo de GitHub Actions realiza los siguientes pasos:

1. Descarga el repositorio.
2. Configura Node.js.
3. Instala las dependencias.
4. Ejecuta las pruebas unitarias con Karma y Jasmine.
5. Comprueba la compilación de React.

## 6. Limitaciones del prototipo

Las cuentas y las citas se almacenan en el navegador.
La aplicación no utiliza actualmente un servidor de autenticación
ni una base de datos para persistir estos datos.

Este proyecto corresponde a un prototipo frontend académico
y no a un sistema listo para producción.

## 7. Reporte HTML

El reporte HTML de cobertura se genera en:

coverage/html/index.html
