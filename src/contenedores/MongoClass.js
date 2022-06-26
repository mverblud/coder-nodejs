import mongoose from 'mongoose';
import config from '../config.js';

mongoose.connect(config.mongoDB.URL, config.mongoDB.options);

class MongoClass {

    constructor(modelSchema) {
        this.collection = modelSchema;
    }

    async getAll(limite = 5, desde = 0) {
        try {

        //  Devuelve Cantidad , Incluye paginado
            const [total, objects] = await Promise.all([
                this.collection.countDocuments({}),
                this.collection.find({})
                    .skip(Number(desde))
                    .limit(Number(limite))
            // Falta logar dinamimos entre los populate
                //  Populate solo en carrito?        
                //    .populate('productos', 'nombre')
            ])

            return {
                total,
                objects
            };

        } catch (error) {
            throw new Error('error', error)
        }
    }

    async create(obj) {

        try {
            const newProducto = await this.collection.create(obj);
            return newProducto;

        } catch (error) {
            throw new Error('Error Create', error)
        }
    }

    async deleteById(id) {
        try {

            const deleteProducto = await this.collection.deleteOne({ _id: id });
            return deleteProducto;

        } catch (error) {
            throw new Error('error', error)
        }
    }

    async updateById(id, data) {
        try {

            const updateProducto = await this.collection.findByIdAndUpdate(id, data, { new: true });
            return updateProducto;

        } catch (error) {
            throw new Error('error', error)
        }
    }
}

export default MongoClass;