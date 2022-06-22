import express from 'express';
import cors from 'cors';
import productosRoutes from './routes/productosRoutes.js';

const app = express();

/* middlewares */
// CORS
app.use(cors());
// Lectura y Parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use('/productos', productosRoutes)

const PORT = 8080;

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ', PORT);
});