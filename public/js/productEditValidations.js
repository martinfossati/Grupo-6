window.addEventListener('load', () => {
    var formEditProduct = document.getElementById('formEditProduct');
    var nombreError = document.getElementById('nombreError');
    var precioError = document.getElementById('precioError');
    var descripError = document.getElementById('descripError');
    var usoError = document.getElementById('usoError');
    var imagenError = document.getElementById('imagenError');

    formEditProduct.addEventListener('submit', (event) => {
        event.preventDefault();
        let errores = {};

        let nombreProducto = document.getElementById('nombreProducto');
        if(nombreProducto.value.length < 3){
            errores.nombreProducto = "Este campo no puede quedar incompleto"
        }

        let precioProducto = document.getElementById('precio');
        if(precioProducto.value.length < 3){
            errores.precio = "Este campo no puede quedar incompleto"
        }

        let descripProducto = document.getElementById('descripcion');
        if(descripProducto.value.length < 3){
            errores.descripcion = "Este campo no puede quedar incompleto"
        }

        let usoProducto = document.getElementById('modoDeUso');
        if(usoProducto.value.length < 3){
            errores.modoDeUso = "Este campo no puede quedar incompleto"
        }

        let imagenProducto = document.getElementById('imagen');
        if(imagenProducto.value.length < 3){
            errores.imagen = "Este campo no puede quedar incompleto"
        }
        if(Object.keys(errores).length > 0){
            nombreError.innerText = (errores.nombreProducto) ? errores.nombreProducto : "";
            precioError.innerText = (errores.precio) ? errores.precio : "";
            descripError.innerText = (errores.descripcion) ? errores.descripcion : "";
            usoError.innerText = (errores.modoDeUso) ? errores.modoDeUso : "";
            imagenError.innerText = (errores.imagen) ? errores.imagen : "";
        } else {
            formEditProduct.submit();
        }
})})



