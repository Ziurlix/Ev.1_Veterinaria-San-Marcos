# Veterinaria San Marcos — Versión 2

## Descripción
Versión mejorada del frontend de Veterinaria San Marcos, desarrollado
con React y Bootstrap. Incluye servicios veterinarios, registro de
usuarios, inicio de sesión y solicitud de citas.

## Tecnologías
- React y JavaScript.
- React Bootstrap y Bootstrap 5.
- Jasmine y Karma para pruebas unitarias.
- React Testing Library.
- Chrome Headless para la ejecución automatizada.
- GitHub Actions para verificar las pruebas y la compilación.

## Funcionalidades
- Navegación adaptable a distintos tamaños de pantalla.
- Catálogo de servicios veterinarios.
- Registro e inicio y cierre de sesión.
- Solicitud y cancelación de citas.
- Validación de formularios.
- Información de ubicación y contacto.

## Instalación y ejecución

Instalar las dependencias:

    npm ci

Iniciar la aplicación:

    npm start

Ejecutar las pruebas con Karma y Jasmine:

    npm run test:karma

Compilar la aplicación:

    npm run build

## Resultados de pruebas
Última ejecución verificada: 22 de octubre de 2026.

- Pruebas ejecutadas: 18.
- Pruebas exitosas: 18.
- Pruebas fallidas: 0.
- Pruebas y compilación en GitHub Actions: exitosas.

### Cobertura obtenida
- Sentencias: 90,90 % (60/66).
- Ramas: 80,64 % (25/31).
- Funciones: 88,88 % (16/18).
- Líneas: 90,90 % (60/66).

La cobertura corresponde al código instrumentado por la configuración
de pruebas, no al 100 % de toda la aplicación.

## Documentación
El informe detallado está disponible en:

    docs/INFORME_PRUEBAS_COBERTURA.md

El reporte HTML de cobertura se genera en:

    coverage/html/index.html

## Limitaciones
Este proyecto es un prototipo frontend académico. Los usuarios y
las citas se guardan en el navegador; todavía no existe una base
de datos ni un sistema de autenticación seguro para producción.
