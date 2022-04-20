const fs = require('fs');

class Contenedor {

    constructor(nombreArchivo) {

        this.fileName = nombreArchivo;
        this.contenido = [];

        //  obtengo el contenido del archivo
        //    this.leerArchivo();

    }

    async leerArchivo() {

        try {

            const data = await fs.promises.readFile(this.fileName);
            const dataJson = JSON.parse(data);
            this.contenido.push(dataJson);

        } catch (error) {
            console.log('Error al leer el archivo', error);
        }
    }

    async escribirArchivo() {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.contenido))
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

    save(producto) {

        //  obtengo ultimo id + 1
        const id = this.contenido.length + 1;
        producto["id"] = id;
        //  actualizo el contenido con el nuevo producto
        this.contenido.push(producto);
        //  Grabo el archivo nuevamente
        this.escribirArchivo();

        return `El id del objeto añadido es ${id}`
    }

    deleteById(id) {

        let contenidoNuevo = this.contenido.filter(element => element.id !== id)
        this.contenido = contenidoNuevo;
        this.escribirArchivo();
    }

    async deleteAll() {
        this.contentido = this.contenido.splice(0, this.contenido.length)
        this.escribirArchivo();
    }

}

module.exports = Contenedor