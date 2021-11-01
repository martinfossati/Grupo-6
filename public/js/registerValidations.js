window.addEventListener('load', () => {
    /**** ELEMENTOS ****/
    var formularioRegister = document.getElementById('formRegister');
    var nombreError = document.getElementById('nombreError');
    var apellidoError = document.getElementById('apellidoError');
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');
    var fechaError = document.getElementById('fechaError');

    let error = ` <i class="fas fa-exclamation-circle" style ="color: yellow"></i> `
    
    formularioRegister.addEventListener('submit', (event) => {
        event.preventDefault();
        let errores = {};

        let nombreRegister = document.getElementById('nombre');
        if(nombreRegister.value.length < 3){
            errores.nombre = " Este campo no puede quedar incompleto "
        }
        let apellidoRegister = document.getElementById('apellido');
        if(apellidoRegister.value.length < 3){
            errores.apellido = " Este campo no puede quedar incompleto "
        }
        let emailRegister = document.getElementById('email');
        if(emailRegister.value.length < 3){
            errores.email = " Este campo no puede quedar incompleto "
        }
        let passwordRegister = document.getElementById('password');
        if(passwordRegister.value.length < 8){
            errores.password = " La contraseña debe tener como minimo 8 caracteres "
        }
        let fechaRegister = document.getElementById('fechaNacimiento');
        if(fechaRegister.value.length < 10){
            errores.fecha = " Este campo no puede quedar incompleto "
        }

        if(Object.keys(errores).length > 0){
            nombreError.innerHTML = (errores.nombre) ? error + errores.nombre + error : "";
            apellidoError.innerHTML = (errores.apellido) ? error + errores.apellido + error : "";
            emailError.innerHTML = (errores.email) ? error + errores.email + error : "";
            passwordError.innerHTML = (errores.password) ? error + errores.password + error : "";
            fechaError.innerHTML = (errores.fecha) ? error + errores.fecha + error : "";
        } else {
            formularioRegister.submit();
        }
        
    })
})