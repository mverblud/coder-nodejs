const express = require('express');
const Contenedor = require('../clase4/contenedor')

const contenedor = new Contenedor('./productos.json');
const app = express();
const PORT = 8080;

const productoRandom = () => {

    const productos = contenedor.getAll();
    const idRandom = Math.floor(Math.random() * (productos.length - 1)) + 1;
    return contenedor.getById(idRandom);
}

app.listen(PORT);
console.log(`Servidor Http escuchando en el puerto ${PORT}`);

app.get('/', (req, res) => {
    res.send('<h1 style="color:blue">Bienvenido al servidor express </h1>')
});

// Desafio Clase 6
app.get('/productos', (req, res) => {
    res.send(contenedor.getAll())
});

app.get('/productoRandom', (req, res) => {
    res.send(productoRandom())
});

/* const http = require('http');
const app = http.createServer((req, res) => {
    res.end(mensaje());
});

const PORT = 8080;
app.listen(8080);

console.log(`servidor Http escucnado en el puerto ${PORT}`)
const mensaje = () => {
    const hora = new Date().getHours();

    if (hora >= 6 && hora <= 19) {
        return `Buenos dias !! hora : ${hora} hs`
    } else if (hora >= 13 && hora <= 19) {
        return `Buenas Tardes! hora : ${hora} hs`
    } else {
        return `Buenas noches! hora : ${hora} hs`
    }
} 

let visitas = 0;
app.get('/visitas', (req, res) => {
    res.send(`La cantidad de visitas es ${++visitas}`)
});

app.get('/fyh', (req, res) => {
    res.send({ fyh: new Date().toLocaleDateString() })
});


*/