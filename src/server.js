import express from 'express';
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from 'cors';
import passport from 'passport';
import cluster from "cluster";
import os from "os";

import apiRoutes from "./routes/apiRoutes.js";
import carritoRoutes from './routes/carritoRoutes.js';
import loginRoutes from "./routes/loginRoutes.js"
import logoutRoutes from "./routes/logoutRoutes.js"
import productosRoutes from './routes/productosRoutes.js';
import registroRoutes from './routes/registroRoutes.js';
import logger from "./logger.js";
import './passport/local.js'

const nroCPUs = os.cpus().length;

if (cluster.isPrimary && process.env.MODO === 'cluster') {
    for (let i = 0; i < nroCPUs; i++) {
        cluster.fork();
    }
} else {

    const app = express();

    app.use(cors());
    // Lectura y Parseo
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Motor de plantilla : EJS
    app.set('views', './src/views');
    app.set('view engine', 'ejs');

    // Session
    app.use(session({
        saveUninitialized: false,
        resave: false,
        secret: 'secretKey',
        cookie: { maxAge: 600000 }, // 10 minutos = 600000 milisegundos
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL_SESSION })
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    /* Routes */
    //    app.use('/', apiRoutes);
    app.use('/carritos', carritoRoutes);
    app.use('/login', loginRoutes);
    app.use('/logout', logoutRoutes);
    app.use('/productos', productosRoutes);
    app.use('/registro', registroRoutes);

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
        logger.info(`Esuchando el puerto: ${PORT} PID: ${process.pid}`);
        console.log(`Esuchando el puerto: ${PORT} PID: ${process.pid}`);
    });

}

