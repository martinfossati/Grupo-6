window.addEventListener('load', () => {
    /*** ELEMENTOS ***/

    let botonAgregar = document.getElementById('btn-carrito');
    let nombreProducto = document.getElementById('nombre-carrito').innerText;
    let precioProducto = document.getElementById('precio-carrito').innerText;
    let imagenProducto = document.getElementById('img-carrito').src;

    let producto = {
        nombre: nombreProducto,
        precio: precioProducto,
        img: imagenProducto
    }

    botonAgregar.addEventListener('click', agregarItem)

    function agregarItem (e) {
        e.preventDefault();
    
        let itemsCarrito;
    
        if(localStorage.getItem('itemsEnCarrito')) {
            itemsCarrito = JSON.parse(localStorage.getItem('itemsEnCarrito'));
        } else {
            itemsCarrito = [];
        }
    
        itemsCarrito.push(producto);
    
        localStorage.setItem('itemsEnCarrito', JSON.stringify(itemsCarrito));
    
        let contadorCarrito = document.getElementById('contador-carrito');
    
        contadorCarrito.innerText = itemsCarrito.length;
    }
})