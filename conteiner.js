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