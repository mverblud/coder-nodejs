import mongoose  from 'mongoose';

const CarritoSchema = mongoose.Schema({
    timestamp: {
        type: Date,
        default : Date.now 
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Producto'
    }],
});

const carritoModel = mongoose.model('Carrito', CarritoSchema)

export default carritoModel