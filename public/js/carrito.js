window.addEventListener('load', () => {
    
    let seccionItems = document.querySelector('.seccion-items');

    let productosEnCarrito = localStorage.getItem('itemsEnCarrito');
    let itemsArray = productosEnCarrito ? JSON.parse(productosEnCarrito) : [];

    if (itemsArray.length >= 1){

        for(let item of itemsArray){
            seccionItems.innerHTML +=
            `<div class="items-carrito">
                <img src="${item.img}" alt="" class="imagen-carrito">
                <h5 class="precio-carrito articulo">$${item.precio}</h5>
                <h5 class="total-carrito articulo">$${item.precio}</h5>
                <h5 class="nombre-carrito articulo">${item.nombre}</h5>
                <i class="fas fa-trash borrar-item"></i>
            </div>`
        }
    }

    let botonEliminar = document.getElementsByClassName('borrar-item');
    
    for (let i = 0; i < botonEliminar.length; i++){

        botonEliminar[i].addEventListener('click', eliminarItem);
        
        let nombreArticulo = botonEliminar[i].previousSibling.previousSibling.innerText

        function eliminarItem(){
            let carrito = itemsArray.filter(item => item.nombre != nombreArticulo);
    
            localStorage.setItem('itemsEnCarrito', JSON.stringify(carrito));

            window.location.reload();
        }
    }

    function resumenTotal() {

        let total = document.getElementById('total-items');
        let envio = document.getElementById('envio-items');
        let precioTotal = document.getElementById('total-con-envio');

        let sumatoria = 0;

        for (let i = 0; i < itemsArray.length; i++) {
            let precios = itemsArray[i].precio;
            sumatoria += parseInt(precios);
        }
        total.innerText = ('$' + sumatoria);
        
        let precioEnvio;
        if(itemsArray.length < 1){
            precioEnvio = 0;
        } else if (sumatoria <= 7500 && itemsArray.length >= 1) {
            precioEnvio = 1000;
        } else {
            precioEnvio = 0;
        }
        envio.innerText = ('$' + precioEnvio)
        
        let sumaTotal = sumatoria + precioEnvio;
        precioTotal.innerText = ('$' + sumaTotal);
    }

    resumenTotal();
    
})