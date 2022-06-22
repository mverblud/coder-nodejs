import mongoose from 'mongoose';
import config from '../config.js';

mongoose.connect(config.mongoDB.URL, config.mongoDB.options);

class MongoClass {

    constructor(collectionName, docSchema) {
        this.collection = mongoose.model(collectionName, docSchema);
    }

    async getAll() {
        try {

            const allProductos = await this.collection.find({});
            return allProductos;

        } catch (error) {
            throw new Error('error', error)
        }
    }

    async create(obj) {
        try {
            const newProducto = await this.collection.create(obj);
            return newProducto;

        } catch (error) {
            throw new Error('error', error)
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