const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { Server: ioServer } = require('socket.io');
const http = require('http');
const { options } = require('./database/config');
const {normalize, schema } = require('normalizr');

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
app.use(express.static(__dirname + '/public'));

// Array de mensajes
const messages = [];
const productos = [];

const ContenedorDB = require('./models/contenedorBD');
const { generarProducto } = require('./utils/mocksProductos');
const productosDB = new ContenedorDB('productos', options.mysql);
const messagesDB = new ContenedorDB('messages', options.sqlite);

productosDB.deleteAll()
    .then(data => console.log(`se limpio BD : ${data}`))
    .catch((err) => { console.log(err); throw err })

productosDB.findAll()
    .then(rows => {

        for (const row of rows) {
            const { nombre, precio, imagen } = row;
            productos.push({
                nombre,
                precio,
                imagen
            })
        }

    })
    .catch((err) => { console.log(err); throw err })

/* messagesDB.deleteAll()
    .then(data => console.log(`se limpio BD : ${data}`))
    .catch((err) => { console.log(err); throw err }) */

messagesDB.findAll()
    .then(rows => {

        for (const row of rows) {
            const { author, text } = row;
            messages.push({
                author,
                text
            })
        }

        console.log('donde?',messages);

    })
    .catch((err) => { console.log(err); throw err })

// Nuevo servidor
io.on('connection', (socket) => {

    console.log('Cliente Conectado', socket.id);

    socket.emit('messages', messages);
    socket.emit('productos', productos);

    // Recibo mensaje del cliente
    socket.on('mensajeCliente', (message) => {

        //  Guardo en el array     
        messages.push(message);

        // Inserto messages en BD
        messagesDB.create(message)
            .then(() => console.log("date Inserted"))
            .catch((err) => { console.log(err); throw err })

        //  Lo envio nuevamente al cliente
        io.sockets.emit('messages', messages)
    })

    // Recibo Producto del cliente
    socket.on('productosCliente', (producto) => {

        //  Guardo en el array     
        productos.push(producto);

        // Inserto productos en BD
        productosDB.create(producto)
            .then(() => console.log("date Inserted"))
            .catch((err) => { console.log(err); throw err })


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

// Utilizacion de faker para mock de 5 productos
app.get('/productotest', (req, res) => {

    let productos = [];
    for (let i = 0; i < 5; i++) {
        const producto = generarProducto();
        productos.push(producto);
    }

    res.json(productos);
});