window.addEventListener('load', () => {
    /**** ELEMENTOS ****/
    let formularioRegister = document.getElementById('formRegister');
    var nombreError = document.getElementById('nombreError')
    var apellidoError = document.getElementById('apellidoError')
    var emailError = document.getElementById('emailError')
    var passwordError = document.getElementById('passwordError')
    var fechaError = document.getElementById('fechaError')
    
    formularioRegister.addEventListener('submit', (event) => {
        event.preventDefault(event);
        let texto = document.querySelector('.text-error')
        let errores = {};

        let nombreRegister = document.getElementById('nombre');
        if(nombreRegister.value.length < 3){
            errores.nombre = "Este campo no puede quedar incompleto"
        }
        let apellidoRegister = document.getElementById('apellido');
        if(apellidoRegister.value.length < 3){
            errores.apellido = "Este campo no puede quedar incompleto"
        }
        let emailRegister = document.getElementById('email');
        if(emailRegister.value.length < 3){
            errores.email = "Este campo no puede quedar incompleto"
        }
        let passwordRegister = document.getElementById('password');
        if(passwordRegister.value.length < 8){
            errores.password = "La contraseña debe tener como minimo 8 caracteres"
        }
        let fechaRegister = document.getElementById('fechaNacimiento');
        if(fechaRegister.value.length < 10){
            errores.fecha = "Este campo no puede quedar incompleto"
        }

        if(Object.keys(errores).length > 0){
            nombreError.innerText = (errores.nombre) ? errores.nombre : "";
            apellidoError.innerText = (errores.apellido) ? errores.apellido : "";
            emailError.innerText = (errores.email) ? errores.email : "";
            passwordError.innerText = (errores.password) ? errores.password : "";
            fechaError.innerText = (errores.fecha) ? errores.fecha : "";
        } else {
            formularioRegister.submit();
        }

    })
})