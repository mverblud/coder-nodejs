import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es obligatorio']
    },
    contraseña: {
        type: String,
        required: [true, 'La Contraseña es obligatorio'],
    },
    email: {
        type: String,
        unique: true
    },
    direccion: { type: String },
    edad: { type: Number },
    telefono: { type: String },
});

export default mongoose.model('usuarios', usuarioSchema);