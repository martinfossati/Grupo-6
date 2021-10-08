window.addEventListener('load', () => {
    var formularioLogin = document.getElementById('formLogin');
    var emailErrorLogin = document.getElementById('emailErrorLogin');

    formularioLogin.addEventListener('submit', (event => {
        event.preventDefault();

        let errores = {};

        let emailLogin = document.getElementById('emailLogin');
        if(emailLogin.value.length < 1){
            errores.email = "Revisa que la información sea correcta"
        }
        if(Object.keys(errores).length > 0){
            emailErrorLogin.innerText = (errores.email) ? errores.email : "";
        } else {
            formularioLogin.submit();
        }

    }))

})