/* const Server = require('./models/server');
const server = new Server();
server.listen(); */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

/* middlewares */
// CORS
app.use(cors());
// Morgan
app.use(morgan('dev'));
// Lectura y Parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Directorio publico
app.use(express.static('public'));

// EJS Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', './views');

const productos = [];

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/productos', (req, res) => {
    res.render('./partials/mostrarProductos', { productos });
});

app.post('/productos', (req, res) => {
    const producto = req.body;
    if (producto = undefined) {
        productos.push(producto);
        res.redirect('/productos'); 
    }
})

app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto ', 8080);
});

//hbs
//const { engine } = require('express-handlebars');
/* app.set('views', './views');
app.set('view engine', 'hbs');
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutDir: __dirname + '/views/layouts',
        partialDir: __dirname + '/views/partials'
    })
);

fakeApi = () => [
    {name: 'KATARINA', lane: 'midlaner'},
    {name: 'Jayce', lane: 'toplaner'},
    {name: 'Azir', lane: 'midlaner'},
    {name: 'Jayce', lane: 'midlaner'}
]

app.get('/',(req,res) => {
    res.render('main',{
        suggestedChamps:fakeApi(),listExists:true
    })
}) */

//pug
/* app.set('view engine', 'pug');
app.set('views', './views');

app.get('/datos', (req, res) => {

    const { min, nivel, max, titulo } = req.query;
    res.render('index.pug', { min, nivel, max, titulo })

}) */