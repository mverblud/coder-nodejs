import nodemailer from 'nodemailer';
import { carritoDao as api } from '../daos/index.js';
import Usuarios from '../models/usuarios.js';
import twilio from 'twilio';
import logger from "../logger.js";

// SendingBlue
const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: process.env.PORT_MAIL,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD
    }
});

// Twilio
const twilioAccount = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export const obtenerCarritos = async (req, res) => {
    //  Paginado
    const { limite, desde } = req.query;
    try {
        const { total, objects: carritos } = await api.getAll(limite, desde);
        res.json({
            total,
            carritos
        });
    } catch (error) {
        console.log(error);
        logger.warn(error);
    }
};

export const crearCarrito  = async (req, res) => {
    try {
        const { usuario } = req.body;
        const createCarrito = await api.create(req.body);

        //  obtengo usuario
        const usuarioBD = await Usuarios.findById({ _id: usuario });
        if (usuarioBD) {

            // Envio mail SendiBlue con el detalle del pedido
            await transporter.sendMail({
                from: 'Pedido App <pedidoapp@gmail.com>',
                to: usuarioBD.email,
                subject: `Nuevo pedido ${usuarioBD.nombre}, ${usuarioBD.email}`,
                html: `<h1>Nuevo Pedido </h1> 
                    <p>${createCarrito.productos}</p>
                `
            })

            //  Envio mensaje de Twilio con el detalle del pedido
            /*             twilioAccount.messages.create({
                            body: 'Probando twilio',
                            from: '+19809823057',
                            to: '+543515645850'
                        }); */

            //  Twilio - Envio Whatsap con el detalle del pedido
            twilioAccount.messages.create({
                body: `Nuevo pedido :${usuarioBD.nombre}, ${usuarioBD.email}, Productos: ${createCarrito.productos}`,
                from: 'whatsapp:+14155238886',
                to: `whatsapp:${usuarioBD.telefono}` // +5493515645850
            })
                .then(message => console.log(message.sid))
                .done();

        }
        res.json(createCarrito);
    } catch (error) {
        console.log('error route', error);
        logger.warn(error);
    }
};

export const eliminarCarrito =  async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCarrito = await api.deleteById(id);
        res.json(deleteCarrito);
    } catch (error) {
        console.log(error);
    }
};

export const actualizarCarrito = async (req, res) => {
    const { id } = req.params;
    try {
        const updateCarrito = await api.updateById(id, req.body);
        res.json(updateCarrito);
    } catch (error) {
        console.log(error);
        logger.warn(error);
    }
};