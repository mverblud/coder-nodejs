const { faker } = require('@faker-js/faker/locale/es');

const generarProducto = () => {
    const producto = {
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        precio: faker.commerce.price(),
        imagen: faker.image.imageUrl(),
    }
    return producto
}

module.exports = {
    generarProducto
}