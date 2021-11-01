window.addEventListener('load', () => {
    var formularioLogin = document.getElementById('formLogin');
    var emailErrorLogin = document.getElementById('emailErrorLogin');

    let error = ` <i class="fas fa-exclamation-circle" style ="color: yellow"></i> `

    formularioLogin.addEventListener('submit', (event => {
        event.preventDefault();

        let errores = {};

        let emailLogin = document.getElementById('emailLogin');
        if(emailLogin.value.length < 1){
            errores.email = "Revisa que la información sea correcta"
        }
        if(Object.keys(errores).length > 0){
            emailErrorLogin.innerHTML = (errores.email) ? error + errores.email + error : "";
        } else {
            formularioLogin.submit();
        }

    }))

})