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
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'usuarios'
    },
    fechaAlta: {
        type: Date,
        default: Date.now    
    },
    estado: {
        type: String,
        default: 'Activo',
    },
});

const carritoModel = mongoose.model('Carrito', CarritoSchema)

export default carritoModel