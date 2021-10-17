window.addEventListener('load', () => {
    /*** ELEMENTOS ***/
    let seccionItems = document.querySelector('.seccion-items');

    let productosEnCarrito = localStorage.getItem('itemsEnCarrito');
    let itemsArray = productosEnCarrito ? JSON.parse(productosEnCarrito) : [];

    if (itemsArray.length >= 1){

        for(let item of itemsArray){
            seccionItems.innerHTML +=
            `<div class="items-carrito">
                <img src="${item.img}" alt="" class="imagen-carrito">
                <h5 class="nombre-carrito articulo">${item.nombre}</h5>
                <h5 class="precio-carrito articulo">$${item.precio}</h5>
                <h5 class="total-carrito articulo">$${item.precio}</h5>
                <i class="fas fa-trash borrar-item"></i>
            </div>`
        }
    }

    let botonEliminar = document.getElementsByClassName('borrar-item');
    
    for (let i = 0; i < botonEliminar.length; i++){
        botonEliminar[i].addEventListener('click', eliminarItem);

        function eliminarItem(){

            let carritoActualizado = itemsArray.filter(item => item != itemsArray[i]);
    
            localStorage.setItem('productosCarrito', JSON.stringify(carritoActualizado));

            window.location.reload()
        }
    }


    function resumenTotal() {

        let sumatoria = 0;

        for (let i = 0; i < itemsArray.length; i++) {
            let precios = itemsArray[i].precio;
            sumatoria += parseInt(precios);
        }
        let envioFijo = 1000;

        let total = document.getElementById('total-items');
        total.innerText = ('$' + sumatoria);

        let sumaTotal = sumatoria + envioFijo;
        let precioTotal = document.getElementById('total-con-envio');
        precioTotal.innerText = ('$' + sumaTotal);
    }

    resumenTotal();
    
})
