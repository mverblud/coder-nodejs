const fs = require('fs');

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

}

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
}

cargoArch().then(() => {
    conteiner.getAll().then(contenido => console.log(contenido))
} );

