/* const Server = require('./models/server');
const server = new Server();
server.listen(); */

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { Server: ioServer } = require('socket.io');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);
const io = new ioServer(httpServer);

/* middlewares */
// CORS
app.use(cors());
// Morgan
app.use(morgan('dev'));
// Lectura y Parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Directorio publico
app.use(express.static(__dirname+'/public'));

// Array de mensajes
const messages  = [];
const productos = [];

// Nuevo servidor
io.on('connection', (socket) => {
    
    console.log('Cliente Conectado', socket.id);

    socket.emit('messages', messages);
    socket.emit('productos', productos);

    // Recibo mensaje del cliente
    socket.on('mensajeCliente', (message) => {
        //  Guardo en el array     
        messages.push(message);
        //  Lo envio nuevamente al cliente
        io.sockets.emit('messages', messages)
    })

    // Recibo Producto del cliente
    socket.on('productosCliente', (producto) => {
        //  Guardo en el array     
        productos.push(producto);
        //  Lo envio nuevamente al cliente
        io.sockets.emit('productos', productos)
    })

});

httpServer.listen(8080, () => console.log('Servidor corriendo en el puerto', 8080));

// EJS Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
});