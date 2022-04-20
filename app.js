const Contenedor = require('./contenedor')

const contenedor = new Contenedor('./productos.txt');

contenedor.save({
    title: "escuadra",
    price: 80.20,
    thumbnail: "escuadra.jpg"
});

contenedor.save({
    title: "regla",
    price: 141.23,
    thumbnail: "regla.jpg"
});

contenedor.save({
    title: "compas",
    price: 111.20,
    thumbnail: "regla.jpg"
});

console.log('Todos los Productos:',contenedor.getAll());
console.log('producto ID 1:',contenedor.getById(1));
console.log('producto ID 2:',contenedor.getById(2));
console.log('No existe ID 5:',contenedor.getById(5));
contenedor.deleteById(3);
console.log('No existe ID 3:',contenedor.getById(3));
contenedor.deleteAll();
console.log('Todos los Productos vacio:',contenedor.getAll());
