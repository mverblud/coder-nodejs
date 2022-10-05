import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from 'bcryptjs';
//import nodemailer from 'nodemailer';

import Usuarios from '../models/usuarios.js';

/* const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: process.env.PORT_MAIL,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD
    }
}); */

const LocalStrategy = Strategy;

passport.use('register', new LocalStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, nombre, password, done) => {

    const { edad, email, direccion, telefono } = req.body;

    const usuarioBD = await Usuarios.findOne({ nombre });
    if (usuarioBD) {
        return done(null, false);
    }

    // Creo nuevo usuario y encripto password
    const usuarioNuevo = new Usuarios();
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);

    usuarioNuevo.nombre = nombre;
    usuarioNuevo.contraseña = bcrypt.hashSync(password, salt);
    usuarioNuevo.edad = edad;
    usuarioNuevo.email = email;
    usuarioNuevo.direccion = direccion;
    usuarioNuevo.telefono = telefono;

    console.log(usuarioNuevo );

    await usuarioNuevo.save();

/*     //  Enviar correo al Administrador
    const mailAdmin = 'm.verblud@naranjax.com';

    await transporter.sendMail({
        from: 'Admin App<adminapp@gmail.com>',
        to: mailAdmin,
        subject: 'nuevo registro',
        html: `<h1>Nuevo Usuario </h1> 
        <p> Se agrego un nuevo usuario : ${nombre}, edad: ${edad}, email: ${email}, direccion: ${direccion}, telefono: ${telefono}</p>`

    }) */

    done(null, usuarioNuevo);
}
))

passport.use('login', new LocalStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, nombre, password, done) => {

    const usuarioBD = await Usuarios.findOne({ nombre });
    if (!usuarioBD) {
        return done(null, false);
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuarioBD.contraseña)
    if (!validPassword) {
        return done(null, false);
    }

    done(null, usuarioBD);
}
))

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
})

passport.deserializeUser(async (id, done) => {
    const usuario = await Usuarios.findById(id);
    done(null, usuario);
})
