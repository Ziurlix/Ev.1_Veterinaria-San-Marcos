// =========================================
// VETERINARIA SAN MARCOS
// JAVASCRIPT PRINCIPAL
// =========================================


// =========================================
// ESTADO DE SESIÓN
// =========================================

let usuarioLogueado =
    sessionStorage.getItem("usuarioLogueado") === "true";

let servicioPendiente = null;


// =========================================
// ELEMENTOS DEL LOGIN
// =========================================

const btnLogin =
    document.getElementById("btnLogin");

const formLogin =
    document.getElementById("formLogin");

const correoLogin =
    document.getElementById("correoLogin");

const passwordLogin =
    document.getElementById("passwordLogin");


// =========================================
// ELEMENTOS DE CITA
// =========================================

const formCita =
    document.getElementById("formCita");

const nombreMascota =
    document.getElementById("nombreMascota");

const tipoMascota =
    document.getElementById("tipoMascota");

const servicioCita =
    document.getElementById("servicioCita");

const fechaCita =
    document.getElementById("fechaCita");

const horaCita =
    document.getElementById("horaCita");

const motivoCita =
    document.getElementById("motivoCita");


// =========================================
// ELEMENTOS MI CUENTA
// =========================================

const btnCerrarSesion =
    document.getElementById("btnCerrarSesion");

const btnMisCitas =
    document.getElementById("btnMisCitas");

const modalCuenta =
    document.getElementById("modalCuenta");

const modalMisCitas =
    document.getElementById("modalMisCitas");

const listaCitas =
    document.getElementById("listaCitas");


// =========================================
// ACTUALIZAR ESTADO DEL BOTÓN
// =========================================

function actualizarEstadoSesion() {

    if (!btnLogin) {
        return;
    }

    if (usuarioLogueado) {

        btnLogin.textContent =
            "👤 Mi cuenta";

        btnLogin.classList.remove(
            "btn-light"
        );

        btnLogin.classList.add(
            "btn-warning"
        );

    } else {

        btnLogin.textContent =
            "Iniciar sesión";

        btnLogin.classList.remove(
            "btn-warning"
        );

        btnLogin.classList.add(
            "btn-light"
        );

    }
}

actualizarEstadoSesion();


// =========================================
// OBTENER USUARIO
// =========================================

function obtenerUsuario() {

    return JSON.parse(
        localStorage.getItem(
            "usuarioVeterinaria"
        )
    );

}


// =========================================
// OBTENER CITAS
// =========================================

function obtenerCitas() {

    return JSON.parse(
        localStorage.getItem(
            "citasVeterinaria"
        )
    ) || [];

}


// =========================================
// GUARDAR CITAS
// =========================================

function guardarCitas(citas) {

    localStorage.setItem(
        "citasVeterinaria",
        JSON.stringify(citas)
    );

}


// =========================================
// ABRIR LOGIN
// =========================================

function abrirLogin() {

    const modalElemento =
        document.getElementById("modalLogin");

    if (!modalElemento) {
        return;
    }

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElemento
        );

    modal.show();
}


// =========================================
// ABRIR FORMULARIO DE CITA
// =========================================

function abrirFormularioCita(
    servicio = ""
) {

    const modalElemento =
        document.getElementById("modalCita");

    if (!modalElemento) {
        return;
    }

    if (
        servicioCita &&
        servicio !== ""
    ) {

        servicioCita.value =
            servicio;

    }

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElemento
        );

    modal.show();
}


// =========================================
// BOTÓN LOGIN / MI CUENTA
// =========================================

if (btnLogin) {

    btnLogin.addEventListener(
        "click",
        function () {

            // Si está logueado
            if (usuarioLogueado) {

                const usuario =
                    obtenerUsuario();

                if (usuario) {

                    document.getElementById(
                        "cuentaNombre"
                    ).textContent =
                        usuario.nombre;

                    document.getElementById(
                        "cuentaCorreo"
                    ).textContent =
                        usuario.correo;

                    document.getElementById(
                        "cuentaTelefono"
                    ).textContent =
                        usuario.telefono;

                }


                const modal =
                    bootstrap.Modal.getOrCreateInstance(
                        modalCuenta
                    );

                modal.show();

                return;
            }


            // Si no está logueado
            abrirLogin();

        }
    );

}


// =========================================
// CERRAR SESIÓN
// =========================================

if (btnCerrarSesion) {

    btnCerrarSesion.addEventListener(
        "click",
        function () {

            usuarioLogueado = false;

            sessionStorage.removeItem(
                "usuarioLogueado"
            );

            servicioPendiente = null;

            actualizarEstadoSesion();


            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    modalCuenta
                );

            modal.hide();

        }
    );

}


// =========================================
// LOGIN
// =========================================

if (formLogin) {

    formLogin.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            correoLogin.classList.remove(
                "is-invalid"
            );

            passwordLogin.classList.remove(
                "is-invalid"
            );


            let hayErrores = false;


            // Validar correo
            if (
                correoLogin.value.trim() === ""
            ) {

                correoLogin.classList.add(
                    "is-invalid"
                );

                document.getElementById(
                    "errorCorreo"
                ).textContent =
                    "Ingresa tu correo electrónico.";

                hayErrores = true;

            } else if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(
                        correoLogin.value.trim()
                    )
            ) {

                correoLogin.classList.add(
                    "is-invalid"
                );

                document.getElementById(
                    "errorCorreo"
                ).textContent =
                    "Ingresa un correo electrónico válido.";

                hayErrores = true;

            }


            // Validar contraseña
            if (
                passwordLogin.value.trim() === ""
            ) {

                passwordLogin.classList.add(
                    "is-invalid"
                );

                document.getElementById(
                    "errorPassword"
                ).textContent =
                    "La contraseña es obligatoria.";

                hayErrores = true;

            }


            // Comprobar usuario
            if (!hayErrores) {

                const usuario =
                    obtenerUsuario();


                if (!usuario) {

                    correoLogin.classList.add(
                        "is-invalid"
                    );

                    document.getElementById(
                        "errorCorreo"
                    ).textContent =
                        "No existe una cuenta registrada.";

                    hayErrores = true;

                } else {

                    // Correo incorrecto
                    if (
                        correoLogin.value
                            .trim()
                            .toLowerCase() !==
                        usuario.correo
                            .toLowerCase()
                    ) {

                        correoLogin.classList.add(
                            "is-invalid"
                        );

                        document.getElementById(
                            "errorCorreo"
                        ).textContent =
                            "El correo no coincide con la cuenta.";

                        hayErrores = true;

                    }


                    // Contraseña incorrecta
                    if (
                        passwordLogin.value !==
                        usuario.password
                    ) {

                        passwordLogin.classList.add(
                            "is-invalid"
                        );

                        document.getElementById(
                            "errorPassword"
                        ).textContent =
                            "La contraseña es incorrecta.";

                        hayErrores = true;

                    }

                }

            }


            // Login correcto
            if (!hayErrores) {

                usuarioLogueado = true;

                sessionStorage.setItem(
                    "usuarioLogueado",
                    "true"
                );

                actualizarEstadoSesion();


                const modalElemento =
                    document.getElementById(
                        "modalLogin"
                    );

                const modal =
                    bootstrap.Modal.getOrCreateInstance(
                        modalElemento
                    );

                modal.hide();


                formLogin.reset();


                // Si venía desde un servicio
                if (servicioPendiente) {

                    const servicio =
                        servicioPendiente;

                    servicioPendiente = null;


                    setTimeout(
                        function () {

                            abrirFormularioCita(
                                servicio
                            );

                        },
                        300
                    );

                }

            }

        }
    );

}


// =========================================
// BOTONES DE SERVICIOS
// =========================================

const botonesServicio =
    document.querySelectorAll(
        ".btnServicio"
    );


botonesServicio.forEach(
    function (boton) {

        boton.addEventListener(
            "click",
            function () {

                const servicioSeleccionado =
                    boton.dataset.servicio;


                if (!usuarioLogueado) {

                    servicioPendiente =
                        servicioSeleccionado;

                    abrirLogin();

                    return;

                }


                abrirFormularioCita(
                    servicioSeleccionado
                );

            }
        );

    }
);


// =========================================
// BOTÓN PRINCIPAL SOLICITAR CITA
// =========================================

const btnSolicitarCita =
    document.getElementById(
        "btnSolicitarCita"
    );


if (btnSolicitarCita) {

    btnSolicitarCita.addEventListener(
        "click",
        function () {

            if (!usuarioLogueado) {

                servicioPendiente = null;

                abrirLogin();

                return;

            }


            if (servicioCita) {

                servicioCita.value = "";

            }

            abrirFormularioCita();

        }
    );

}


// =========================================
// FORMULARIO DE CITA
// =========================================

if (formCita) {

    formCita.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // Limpiar errores
            nombreMascota.classList.remove(
                "is-invalid"
            );

            tipoMascota.classList.remove(
                "is-invalid"
            );

            servicioCita.classList.remove(
                "is-invalid"
            );

            fechaCita.classList.remove(
                "is-invalid"
            );

            horaCita.classList.remove(
                "is-invalid"
            );

            motivoCita.classList.remove(
                "is-invalid"
            );


            let hayErrores = false;


            // Nombre mascota
            if (
                nombreMascota.value.trim() === ""
            ) {

                nombreMascota.classList.add(
                    "is-invalid"
                );

                hayErrores = true;

            }


            // Tipo mascota
            if (
                tipoMascota.value === ""
            ) {

                tipoMascota.classList.add(
                    "is-invalid"
                );

                hayErrores = true;

            }


            // Servicio
            if (
                servicioCita.value === ""
            ) {

                servicioCita.classList.add(
                    "is-invalid"
                );

                hayErrores = true;

            }


            // Fecha
            if (
                fechaCita.value === ""
            ) {

                fechaCita.classList.add(
                    "is-invalid"
                );

                hayErrores = true;

            }


            // Hora
            if (
                horaCita.value === ""
            ) {

                horaCita.classList.add(
                    "is-invalid"
                );

                hayErrores = true;

            }


            // Motivo
            if (
                motivoCita.value.trim() === ""
            ) {

                motivoCita.classList.add(
                    "is-invalid"
                );

                hayErrores = true;

            }


            // =====================================
            // GUARDAR CITA
            // =====================================

            if (!hayErrores) {

                const usuario =
                    obtenerUsuario();


                const citas =
                    obtenerCitas();


                const nuevaCita = {

                    id:
                        Date.now(),

                    usuario:
                        usuario.correo,

                    mascota:
                        nombreMascota.value.trim(),

                    tipoMascota:
                        tipoMascota.value,

                    servicio:
                        servicioCita.value,

                    fecha:
                        fechaCita.value,

                    hora:
                        horaCita.value,

                    motivo:
                        motivoCita.value.trim(),

                    estado:
                        "Pendiente"

                };


                citas.push(
                    nuevaCita
                );


                guardarCitas(
                    citas
                );


                alert(
                    "Solicitud de cita enviada correctamente."
                );


                formCita.reset();


                const modalElemento =
                    document.getElementById(
                        "modalCita"
                    );

                const modal =
                    bootstrap.Modal.getOrCreateInstance(
                        modalElemento
                    );

                modal.hide();

            }

        }
    );

}


// =========================================
// MOSTRAR MIS CITAS
// =========================================

function mostrarMisCitas() {

    if (!listaCitas) {
        return;
    }


    const usuario =
        obtenerUsuario();


    const citas =
        obtenerCitas();


    // Filtrar citas del usuario
    const misCitas =
        citas.filter(
            function (cita) {

                return (
                    usuario &&
                    cita.usuario ===
                    usuario.correo
                );

            }
        );


    // Sin citas
    if (misCitas.length === 0) {

        listaCitas.innerHTML = `
            <p class="text-center text-muted">
                No tienes citas registradas.
            </p>
        `;

        return;
    }


    // Mostrar citas
    listaCitas.innerHTML =
        misCitas.map(
            function (cita) {

                return `
                    <div class="cita-card">

                        <h3>
                            📅 ${cita.servicio}
                        </h3>

                        <p>
                            <strong>Mascota:</strong>
                            ${cita.mascota}
                        </p>

                        <p>
                            <strong>Tipo:</strong>
                            ${cita.tipoMascota}
                        </p>

                        <p>
                            <strong>Fecha:</strong>
                            ${cita.fecha}
                        </p>

                        <p>
                            <strong>Hora:</strong>
                            ${cita.hora}
                        </p>

                        <p>
                            <strong>Motivo:</strong>
                            ${cita.motivo}
                        </p>

                        <span class="estado-pendiente">
                            ${cita.estado}
                        </span>

                    </div>
                `;

            }
        ).join("");

}


// =========================================
// BOTÓN MIS CITAS
// =========================================

if (btnMisCitas) {

    btnMisCitas.addEventListener(
        "click",
        function () {

            mostrarMisCitas();


            // Cerrar Mi cuenta
            const cuenta =
                bootstrap.Modal.getOrCreateInstance(
                    modalCuenta
                );

            cuenta.hide();


            // Abrir Mis citas
            setTimeout(
                function () {

                    const citas =
                        bootstrap.Modal.getOrCreateInstance(
                            modalMisCitas
                        );

                    citas.show();

                },
                300
            );

        }
    );

}


// =========================================
// FECHA MÍNIMA
// =========================================

if (fechaCita) {

    const hoy =
        new Date()
            .toISOString()
            .split("T")[0];

    fechaCita.min = hoy;

}


// =========================================
// REGISTRO
// =========================================

const formRegistro =
    document.getElementById(
        "formRegistro"
    );


if (formRegistro) {

    formRegistro.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nombreRegistro =
                document.getElementById(
                    "nombreRegistro"
                );

            const correoRegistro =
                document.getElementById(
                    "correoRegistro"
                );

            const telefonoRegistro =
                document.getElementById(
                    "telefonoRegistro"
                );

            const passwordRegistro =
                document.getElementById(
                    "passwordRegistro"
                );

            const confirmPasswordRegistro =
                document.getElementById(
                    "confirmPasswordRegistro"
                );

            const terminosRegistro =
                document.getElementById(
                    "terminosRegistro"
                );


            // Limpiar errores
            nombreRegistro.classList.remove(
                "is-invalid"
            );

            correoRegistro.classList.remove(
                "is-invalid"
            );

            telefonoRegistro.classList.remove(
                "is-invalid"
            );

            passwordRegistro.classList.remove(
                "is-invalid"
            );

            confirmPasswordRegistro.classList.remove(
                "is-invalid"
            );

            terminosRegistro.classList.remove(
                "is-invalid"
            );


            let hayErrores = false;


            // Nombre
            if (
                nombreRegistro.value.trim() === ""
            ) {

                nombreRegistro.classList.add(
                    "is-invalid"
                );

                hayErrores = true;

            } else if (
                !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
                    .test(
                        nombreRegistro.value.trim()
                    )
            ) {

                nombreRegistro.classList.add(
                    "is-invalid"
                );

                document.getElementById(
                    "errorNombreRegistro"
                ).textContent =
                    "El nombre solo puede contener letras.";

                hayErrores = true;

            }


            // Correo
            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(
                        correoRegistro.value.trim()
                    )
            ) {

                correoRegistro.classList.add(
                    "is-invalid"
                );

                hayErrores = true;

            }


            // Teléfono
            if (
                !/^\d{9,10}$/.test(
                    telefonoRegistro.value.trim()
                )
            ) {

                telefonoRegistro.classList.add(
                    "is-invalid"
                );

                hayErrores = true;

            }


            // Contraseña
            if (
                passwordRegistro.value.length < 6
            ) {

                passwordRegistro.classList.add(
                    "is-invalid"
                );

                hayErrores = true;

            }


            // Confirmar contraseña
            if (
                confirmPasswordRegistro.value.trim() === ""
            ) {

                confirmPasswordRegistro.classList.add(
                    "is-invalid"
                );

                document.getElementById(
                    "errorConfirmPasswordRegistro"
                ).textContent =
                    "Debes confirmar tu contraseña.";

                hayErrores = true;

            } else if (
                passwordRegistro.value !==
                confirmPasswordRegistro.value
            ) {

                confirmPasswordRegistro.classList.add(
                    "is-invalid"
                );

                document.getElementById(
                    "errorConfirmPasswordRegistro"
                ).textContent =
                    "Las contraseñas no coinciden.";

                hayErrores = true;

            }


            // Términos
            if (
                !terminosRegistro.checked
            ) {

                terminosRegistro.classList.add(
                    "is-invalid"
                );

                hayErrores = true;

            }


            // Guardar usuario
            if (!hayErrores) {

                const nuevoUsuario = {

                    nombre:
                        nombreRegistro.value.trim(),

                    correo:
                        correoRegistro.value.trim(),

                    telefono:
                        telefonoRegistro.value.trim(),

                    password:
                        passwordRegistro.value

                };


                localStorage.setItem(
                    "usuarioVeterinaria",
                    JSON.stringify(
                        nuevoUsuario
                    )
                );


                alert(
                    "Cuenta creada correctamente."
                );


                window.location.href =
                    "index.html";

            }

        }
    );

}