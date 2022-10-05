import mongoose  from 'mongoose';

const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es obligatorio']
    },
    descripcion: { type: String },
    codigo:{ type: String },
    img: {
        type: String,
        default: ''
    },
    precio: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
});

const productoModel = mongoose.model('Producto', ProductoSchema)

export default productoModel