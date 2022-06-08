const socket = io();

// Chat
const nombre = document.querySelector('#nombre');
const texto = document.querySelector('#texto');
const button = document.querySelector('#button');
const parrafo = document.querySelector('#parrafo');

// Productos
const nombreProducto = document.querySelector('#nombreProducto');
const precio = document.querySelector('#precio');
const imagen = document.querySelector('#imagen');
const buttonProducto = document.querySelector('#agregarProducto');
const pProductos = document.querySelector('#pProductos');

// Envio Mensaje al servidor
button.addEventListener('click', () => {

    if (nombre.value.trim().length >= 1 && texto.value.trim().length >= 1) {
        const message = {
            author: nombre.value,
            text: texto.value
        };

        socket.emit('mensajeCliente', message)
    }
});

// Envio Producto al servidor
buttonProducto.addEventListener('click', () => {

    if (nombreProducto.value.trim().length >= 1 && precio.value.trim().length >= 1) {

        const producto = {
            nombre: nombreProducto.value,
            precio: precio.value,
            imagen: imagen.value
        };
        socket.emit('productosCliente', producto)
    }


});

// Recibo mensajes del servidor
socket.on('messages', (messages) => {

    parrafo.innerHTML = messages.map(mensaje => `Autor : ${mensaje.author} Mensaje : ${mensaje.text}`).join('<br>');

});

// Recibo mensajes del productos
socket.on('productos', (productos) => {

    pProductos.innerHTML = productos.map(p => `nombre : ${p.nombre} precio : ${p.precio} imagen : ${p.imagen}`).join('<br>');

});