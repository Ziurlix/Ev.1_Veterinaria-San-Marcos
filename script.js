// Validacion formulario REGISTRO

// Capturamos form de registro por su ID
const formRegistro = document.getElementById('loginForm');

// Verificamos si form existe en la pagina actual antes de ejecutar logica
// (para evitar errores en la consola en caso de que estemos en index u otra pagina)
if (formRegistro) {
    formRegistro.addEventListener('submit', function (event) {

        // Evitamos que pagina recargue automaticamente al apretar el boton
        event.preventDefault();

        // 1. Limpiamos mensajes de error previo (en caso que el usuario se haya equivocado mas de una vez)
        const camposError = ['error-user', 'error-email','error-phone','error-psw','error-confirm'];
        camposError.forEach(id => {
            const spanError = document.getElementById(id);
            if (spanError) {
                spanError.textContent = '';
            }
        });
        
        // 2. Capturamos valores que usuario escribio, eliminando espacios en blanco mas de una vez
        const nombre = document.getElementById('user').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-psw').value;
        const maxDigitsPhone = 10;

        // Variable de control, por si aparece algun error
        let hayErrores = false;

        // 3. Validacion de Nombre
        if (nombre === '') {
            document.getElementById('error-user').textContent = 'El nombre es obligatorio.';
            hayErrores = true;
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
            document.getElementById('error-user').textContent = 'El nombre solo debe contener letras.'
            hayErrores = true;
        }

        // 4. Validacion de Correo Electronico
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('error-email'). textContent = 'Ingresa un correo valido (ej: usuario@gmail.com).';
            hayErrores = true;
        }

        // 5. Validacion de Telfono
        if (telefono === '') {
            document.getElementById('error-phone').textContent = 'El telefono es obligatorio.';
            hayErrores = true;
        } else if (!/^\d+$/.test(telefono)) {
            document.getElementById('error-phone').textContent = 'El telefono debe contener solo numeros.';
            hayErrores = true;
        } else if (telefono.length > maxDigitsPhone) {
            document.getElementById('error-phone').textContent = `Maximo ${maxDigitsPhone} digitos.`
            hayErrores = true;
        }

        // 6. Validacion Contraseña
        if (password.length < 6) {
            document.getElementById('error-psw').textContent = 'La contraseña debe contener al menos 6 caracteres.';
            hayErrores = true;
        }

        // 7. Validacion Confirmar Contraseña
        if (password !== confirmPassword) {
            document.getElementById('error-confirm').textContent = 'Las contraseña no coinciden'
            hayErrores = true;
        }
        
        // 8 Si variable hayErrores sigue dando false, significa que paso las pruebas
        if (!hayErrores) {
            alert('¡Registro exitoso! Bienvenido a Veterinaria San Marcos.');
            // Redirigimos al usuario a la vista de inicio de sesión
            window.location.href = 'login.html';
        }
    });
}
// Validacion Form Inicio Sesion
// Captura form de login por su id
const formLogin = document.getElementById('ingresoForm');

if (formLogin) {
    formLogin.addEventListener('submit', function (event) {

        // Evita que Form se envie vacio
        event.preventDefault();

        // Se capturan los datos
        const spanErrorEmail = document.getElementById('error-login-email');
        const spanErrorPsw = document.getElementById('error-login-psw');
        if (spanErrorEmail) spanErrorEmail.textContent = '';
        if (spanErrorPsw) spanErrorPsw.textContent = '';

        // 2. Capturar valores
        const emailLogin = document.getElementById('login-email').value.trim();
        const pswLogin = document.getElementById('login-psw').value.trim();
        let hayErrores = false;

        // 3. Validar Correo (vacío y formato con Regex)
        if (emailLogin === '') {
            if (spanErrorEmail) spanErrorEmail.textContent = 'El correo es obligatorio.';
            hayErrores = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLogin)) {
            if (spanErrorEmail) spanErrorEmail.textContent = 'Ingresa un correo válido (ej: usuario@gmail.com).';
            hayErrores = true;
        }

        // 4. Validar Contraseña (vacía y mínimo de caracteres)
        if (pswLogin === '') {
            if (spanErrorPsw) spanErrorPsw.textContent = 'La contraseña es obligatoria.';
            hayErrores = true;
        } else if (pswLogin.length < 6) {
            if (spanErrorPsw) spanErrorPsw.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            hayErrores = true;
        }

        // 5. Redireccionar solo si no hay ningún error
        if (!hayErrores) {
            window.location.href = 'portal.html';
        }
    });
}