import { Router } from "express";
import passport from 'passport';
import { productosDao as api } from '../daos/index.js';
import logger from "../logger.js";
const router = Router();

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render('login');
    }
}

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/errorRegister',
    successRedirect: '/datos'
}));

router.get('/errorRegister', (req, res) => {
    res.render('errorRegister');
})

router.post('/login', passport.authenticate('login', {
    failureRedirect: '/errorLogin',
    successRedirect: '/datos'
}));

router.get('/errorLogin', (req, res) => {
    res.render('errorLogin')
})

router.get('/datos', isAuth, async (req, res) => {

    // Como obtengo los productos??????? deberia invocar la API?
    const { objects: productos } = await api.getAll(0, 0);

    res.render('info', { nombre: req.user.nombre, productos })
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/');
    })
});

router.get('/', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

export default router;
