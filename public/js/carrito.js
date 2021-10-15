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
                <h5 class="precio-carrito articulo">${item.precio}</h5>
                <h5 class="total-carrito articulo">${item.precio}</h5>
                <i class="fas fa-trash borrar-item"></i>
            </div>`
        }
    }

    // function resumenCarrito () {
    //     let preciosItems = document.getElementsByClassName("precio-carrito");

    //     for (precio of preciosItems) {
    //         let p = precio.innerText.replace('$', '');
    //         totalItems += parseInt(p);
    //         console.log(p);
    //     }

    //     let suma = 0;
        
    //     let totalItems = document.getElementById('total-items');
    //     totalItems.innerText = ("$ " + suma);

    //     let envioItems = document.getElementById('envio-items');

    //     let sumatoria = totalItems + envioItems;

    //     let sumatoriaTotal = document.getElementById('total-con-envio');
    //     sumatoriaTotal.innerText = ("$ " + sumatoria);
    // }

    // resumenCarrito();
    
})
