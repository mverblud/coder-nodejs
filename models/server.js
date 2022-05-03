const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');

class Server {

    constructor() {
        this.app = express();
        this.port = 8080;
        this.path = {
            productos: '/api/productos',
        }
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Morgan
        this.app.use(morgan('dev'));
        // Lectura y Parseo
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.path.productos, require('../routes/productos'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        })
    }
}

module.exports = Server;