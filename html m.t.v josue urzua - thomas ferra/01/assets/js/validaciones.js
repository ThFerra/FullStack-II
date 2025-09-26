// Validaciones para formularios

// Validación de formulario de registro
function validarRegistro() {
    const form = document.getElementById('form-registro');
    const run = document.getElementById('run');
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const email = document.getElementById('email');
    const fechaNacimiento = document.getElementById('fecha-nacimiento');
    const region = document.getElementById('region');
    const comuna = document.getElementById('comuna');
    const direccion = document.getElementById('direccion');
    
    let esValido = true;
    
    // Validar RUN
    if (!validarRUN(run.value)) {
        mostrarError(run, 'El RUN no es válido. Debe tener entre 7 y 9 caracteres sin puntos ni guión.');
        esValido = false;
    } else {
        ocultarError(run);
    }
    
    // Validar nombre
    if (nombre.value.trim() === '') {
        mostrarError(nombre, 'El nombre es obligatorio.');
        esValido = false;
    } else if (nombre.value.length > 50) {
        mostrarError(nombre, 'El nombre no puede tener más de 50 caracteres.');
        esValido = false;
    } else {
        ocultarError(nombre);
    }
    
    // Validar apellidos
    if (apellidos.value.trim() === '') {
        mostrarError(apellidos, 'Los apellidos son obligatorios.');
        esValido = false;
    } else if (apellidos.value.length > 100) {
        mostrarError(apellidos, 'Los apellidos no pueden tener más de 100 caracteres.');
        esValido = false;
    } else {
        ocultarError(apellidos);
    }
    
    // Validar email
    if (!validarEmail(email.value)) {
        mostrarError(email, 'El correo electrónico no es válido. Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com');
        esValido = false;
    } else {
        ocultarError(email);
    }
    
    // Validar dirección
    if (direccion.value.trim() === '') {
        mostrarError(direccion, 'La dirección es obligatoria.');
        esValido = false;
    } else if (direccion.value.length > 300) {
        mostrarError(direccion, 'La dirección no puede tener más de 300 caracteres.');
        esValido = false;
    } else {
        ocultarError(direccion);
    }
    
    return esValido;
}

// Validación de formulario de login
function validarLogin() {
    const form = document.getElementById('form-login');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    let esValido = true;
    
    // Validar email
    if (!validarEmail(email.value)) {
        mostrarError(email, 'El correo electrónico no es válido. Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com');
        esValido = false;
    } else {
        ocultarError(email);
    }
    
    // Validar contraseña
    if (password.value.trim() === '') {
        mostrarError(password, 'La contraseña es obligatoria.');
        esValido = false;
    } else if (password.value.length < 4 || password.value.length > 10) {
        mostrarError(password, 'La contraseña debe tener entre 4 y 10 caracteres.');
        esValido = false;
    } else {
        ocultarError(password);
    }
    
    return esValido;
}

// Validación de formulario de contacto
function validarContacto() {
    const form = document.getElementById('form-contacto');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const comentario = document.getElementById('comentario');
    
    let esValido = true;
    
    // Validar nombre
    if (nombre.value.trim() === '') {
        mostrarError(nombre, 'El nombre es obligatorio.');
        esValido = false;
    } else if (nombre.value.length > 100) {
        mostrarError(nombre, 'El nombre no puede tener más de 100 caracteres.');
        esValido = false;
    } else {
        ocultarError(nombre);
    }
    
    // Validar email (opcional pero si se ingresa debe ser válido)
    if (email.value.trim() !== '' && !validarEmail(email.value)) {
        mostrarError(email, 'El correo electrónico no es válido. Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com');
        esValido = false;
    } else {
        ocultarError(email);
    }
    
    // Validar comentario
    if (comentario.value.trim() === '') {
        mostrarError(comentario, 'El comentario es obligatorio.');
        esValido = false;
    } else if (comentario.value.length > 500) {
        mostrarError(comentario, 'El comentario no puede tener más de 500 caracteres.');
        esValido = false;
    } else {
        ocultarError(comentario);
    }
    
    return esValido;
}

// Función para validar RUN chileno
function validarRUN(run) {
    // Eliminar puntos y guión
    run = run.replace(/[.-]/g, '');
    
    // Verificar longitud
    if (run.length < 7 || run.length > 9) {
        return false;
    }
    
    // El RUN debe ser numérico excepto el último dígito que puede ser K
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1).toUpperCase();
    
    if (cuerpo.replace(/\D/g, '').length !== cuerpo.length) {
        return false;
    }
    
    // Validar dígito verificador
    return true; // Simplificado para el ejemplo
}

// Función para validar email
function validarEmail(email) {
    if (email.trim() === '') return false;
    
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    const dominioValido = dominiosPermitidos.some(dominio => email.endsWith(dominio));
    
    if (!dominioValido) return false;
    
    // Expresión regular básica para validar formato de email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) && email.length <= 100;
}

// Función para mostrar error en un campo
function mostrarError(campo, mensaje) {
    const errorElement = campo.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
    }
    
    campo.classList.add('is-invalid');
}

// Función para ocultar error de un campo
function ocultarError(campo) {
    const errorElement = campo.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    campo.classList.remove('is-invalid');
}

// Validación en tiempo real
document.addEventListener('DOMContentLoaded', function() {
    // Validación en tiempo real para formularios
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                // Validar según el tipo de formulario
                if (form.id === 'form-registro') {
                    validarCampoRegistro(this);
                } else if (form.id === 'form-login') {
                    validarCampoLogin(this);
                } else if (form.id === 'form-contacto') {
                    validarCampoContacto(this);
                }
            });
        });
    });
});

// Validaciones específicas por campo para registro
function validarCampoRegistro(campo) {
    switch (campo.id) {
        case 'run':
            if (!validarRUN(campo.value)) {
                mostrarError(campo, 'El RUN no es válido. Debe tener entre 7 y 9 caracteres sin puntos ni guión.');
            } else {
                ocultarError(campo);
            }
            break;
        case 'nombre':
            if (campo.value.trim() === '') {
                mostrarError(campo, 'El nombre es obligatorio.');
            } else if (campo.value.length > 50) {
                mostrarError(campo, 'El nombre no puede tener más de 50 caracteres.');
            } else {
                ocultarError(campo);
            }
            break;
        case 'apellidos':
            if (campo.value.trim() === '') {
                mostrarError(campo, 'Los apellidos son obligatorios.');
            } else if (campo.value.length > 100) {
                mostrarError(campo, 'Los apellidos no pueden tener más de 100 caracteres.');
            } else {
                ocultarError(campo);
            }
            break;
        case 'email':
            if (!validarEmail(campo.value)) {
                mostrarError(campo, 'El correo electrónico no es válido. Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com');
            } else {
                ocultarError(campo);
            }
            break;
        case 'direccion':
            if (campo.value.trim() === '') {
                mostrarError(campo, 'La dirección es obligatoria.');
            } else if (campo.value.length > 300) {
                mostrarError(campo, 'La dirección no puede tener más de 300 caracteres.');
            } else {
                ocultarError(campo);
            }
            break;
    }
}

// Validaciones específicas por campo para login
function validarCampoLogin(campo) {
    switch (campo.id) {
        case 'email':
            if (!validarEmail(campo.value)) {
                mostrarError(campo, 'El correo electrónico no es válido. Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com');
            } else {
                ocultarError(campo);
            }
            break;
        case 'password':
            if (campo.value.trim() === '') {
                mostrarError(campo, 'La contraseña es obligatoria.');
            } else if (campo.value.length < 4 || campo.value.length > 10) {
                mostrarError(campo, 'La contraseña debe tener entre 4 y 10 caracteres.');
            } else {
                ocultarError(campo);
            }
            break;
    }
}

// Validaciones específicas por campo para contacto
function validarCampoContacto(campo) {
    switch (campo.id) {
        case 'nombre':
            if (campo.value.trim() === '') {
                mostrarError(campo, 'El nombre es obligatorio.');
            } else if (campo.value.length > 100) {
                mostrarError(campo, 'El nombre no puede tener más de 100 caracteres.');
            } else {
                ocultarError(campo);
            }
            break;
        case 'email':
            if (campo.value.trim() !== '' && !validarEmail(campo.value)) {
                mostrarError(campo, 'El correo electrónico no es válido. Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com');
            } else {
                ocultarError(campo);
            }
            break;
        case 'comentario':
            if (campo.value.trim() === '') {
                mostrarError(campo, 'El comentario es obligatorio.');
            } else if (campo.value.length > 500) {
                mostrarError(campo, 'El comentario no puede tener más de 500 caracteres.');
            } else {
                ocultarError(campo);
            }
            break;
    }
}