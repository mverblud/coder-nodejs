const fs = require('fs');

// Clase donde se realiza lectura/escritura por cada metodo.

class Conteiner {

    constructor(nombreArchivo) {

        this.fileName = nombreArchivo;
    }

    async leerArchivo() {
        try {
            if (fs.existsSync(this.fileName)) {
                const data = await fs.promises.readFile(this.fileName);
                return JSON.parse(data);
            } else {
                return []
            }
        } catch (error) {
            console.log('Error al leer el archivo', error);
        }
    }

    async escribirArchivo(contenido) {

        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(contenido))
        } catch (error) {
            console.log('Error al escribir el archivo', error);
        }
    }

    async save(producto) {

        const contenido = await this.leerArchivo();
        //  obtengo ultimo id + 1
        let id = contenido.length + 1;
        producto["id"] = id;
        //  actualizo el contenido con el nuevo producto
        contenido.push(producto);
        //  Grabo el archivo nuevamente
        await this.escribirArchivo(contenido);

        return `El id del objeto añadido es ${id}`
    }

    async getAll() {
        return await this.leerArchivo();
    }

    async getById(id) {

        const contenido = await this.leerArchivo();

        let producto = {}
        producto = contenido.find(element => element.id == id);
        if (!producto) {
            producto = null
        }
        return producto
    }

    async deleteById(id) {

        const contenido = await this.leerArchivo();
        const contenidoNuevo = contenido.filter(element => element.id !== id)
        await this.escribirArchivo(contenidoNuevo);

    }

    async deleteAll() {
        const contenido = [];
        await this.escribirArchivo(contenido);
    }

}

module.exports = Conteiner

// Con clase conteiner donde se realiza lectura en cada metodo.
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