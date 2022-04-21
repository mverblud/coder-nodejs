const fs = require('fs');

class Contenedor {

    constructor(nombreArchivo) {

        this.fileName = nombreArchivo;
        this.contenido = [];

    //  obtengo el contenido del archivo
        this.leerArchivo()

    }

    async leerArchivo() {

        try {

            if (fs.existsSync(this.fileName)) {
                const data = await fs.promises.readFile(this.fileName, 'utf-8');
                this.contenido = JSON.parse(data);
                console.log(this.contenido);
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

    getAll() {
        return this.contenido;
    }

    getById(id) {

        let producto = {}
        producto = this.contenido.find(element => element.id == id);
        if (!producto) {
            producto = null
        }
        return producto
    }

    async save(producto) {

        //  obtengo ultimo id + 1
        const id = this.contenido.length + 1;
        producto["id"] = id;
        //  actualizo el contenido con el nuevo producto
        this.contenido.push(producto);
        //  Grabo el archivo nuevamente
        await this.escribirArchivo(this.contenido);

        return `El id del objeto añadido es ${id}`
    }

    deleteById(id) {

        const contenidoNuevo = this.contenido.filter(element => element.id !== id)
        this.escribirArchivo(contenidoNuevo);

    }

    async deleteAll() {
        const contentido = [];
        this.contenido = contentido
        this.escribirArchivo(this.contenido);
    }

}

module.exports = Contenedor

const contenedor = new Contenedor('./productosContenedor.json');

const cargoArch = async () => {

    await contenedor.save({
        title: "escuadra",
        price: 80.20,
        thumbnail: "escuadra.jpg"
    });

    await contenedor.save({
        title: "regla",
        price: 141.23,
        thumbnail: "regla.jpg"
    });

    await contenedor.save({
        title: "compas",
        price: 11.23,
        thumbnail: "compas.jpg"
    }); 

/*     conteiner.getAll().then(contenido => console.log('Todos los Productos:', contenido));
    conteiner.getById(2).then(producto => console.log('producto 2 :', producto));
    conteiner.getById(5).then(producto => console.log('no existe 5 :', producto));
    conteiner.deleteById(3).then(console.log('borro producto 3 :')); */
//    conteiner.deleteAll().then('Todos los Productos vacio:');
}

//cargoArch();
console.log(contenedor.getAll());
console.log(contenedor.contenido); 