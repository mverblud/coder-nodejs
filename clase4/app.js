const Contenedor = require('./contenedor')

// Con clase contendor donde se realiza una sola lectura en el contructor de la clase
const contenedor = new Contenedor('./productos.json');

const cargoArchContenedor = () => {

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
        price: 11.23,
        thumbnail: "compas.jpg"
    });

}

cargoArchContenedor();
console.log('Todos los productos',contenedor.getAll());
console.log('Producto 1',contenedor.getById(1));
console.log('Producto 2',contenedor.getById(2));
console.log('Producto 3',contenedor.getById(3));
contenedor.deleteById(2);
//contenedor.deleteAll();