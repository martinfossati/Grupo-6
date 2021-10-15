/***** REQUIRES *****/
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

/***** CONTROLLER REQUIRE *****/
const usersControllers = require('./../controllers/usersControllers');

/***** MIDDLEWARES *****/
const uploadFile = require('../middlewares/multerUserMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/***** VALIDACIONES *****/
const validations = [
    body('nombre').notEmpty().withMessage('Debes escribir tu nombre'),
    body('apellido').notEmpty().withMessage('Debes escribir tu apellido'),
    body('fechaNacimiento').notEmpty().withMessage('Debes poner tu fecha de nacimiento'),
    body('email').isEmail().withMessage('Debes poner un email valido'),
    body('password').isLength({min: 3}).withMessage('Tu contraseña debe tener como minimo 8 caracteres')
];

/***** REGISTRACION USUARIO *****/
router.get('/register', guestMiddleware, usersControllers.register);
router.post('/register', uploadFile.single('avatar'), validations, usersControllers.processRegister);

/***** PROCESO LOGIN USUARIO *****/
router.get('/login', guestMiddleware, usersControllers.login);
router.post('/login', usersControllers.processLogin);

/***** PERFIL USUARIO *****/
router.get('/infoUser', authMiddleware, usersControllers.infoUser);

/***** CERRAR SESION *****/
router.get('/logout', usersControllers.logout);

module.exports = router;