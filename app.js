const Conteiner = require('./conteiner')

const conteiner = new Conteiner('./productos.json');

const cargoArch = async () => {

    await conteiner.save({
        title: "escuadra",
        price: 80.20,
        thumbnail: "escuadra.jpg"
    });

    await conteiner.save({
        title: "regla",
        price: 141.23,
        thumbnail: "regla.jpg"
    });

    await conteiner.save({
        title: "compas",
        price: 11.23,
        thumbnail: "compas.jpg"
    });

//  otra Forma
//    const contenido = await conteiner.getAll();
//    await conteiner.deleteById(3);
//    console.log('otra forma',contenido );

    conteiner.getAll().then(contenido => console.log('Todos los Productos:', contenido));
    conteiner.getById(2).then(producto => console.log('producto 2 :', producto));
    conteiner.getById(5).then(producto => console.log('no existe 5 :', producto));
    conteiner.deleteById(3).then(console.log('borro producto 3 :'));
//    conteiner.deleteAll().then('Todos los Productos vacio:');
}

cargoArch();