const Server = require('./models/server');
const server = new Server();
server.listen();

/* const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');

const app = express();
// CORS
app.use(cors());
// Morgan
app.use(morgan('dev'));
// Lectura y Parseo
app.use(express.json());
// Directorio publico
app.use(express.static('public'));

app.use('/api/productos', require('./routes/productos'));

app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto ', 8080);
}); */