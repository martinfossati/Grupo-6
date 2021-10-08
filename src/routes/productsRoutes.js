/***** REQUIRES *****/
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

/***** CONTROLLER REQUIRE *****/
const productsControllers = require('./../controllers/productsControllers');

/****** MIDDLEWARES ******/
const uploadFile = require('../middlewares/multerProductMiddleware');

/****** VALIDACIONES ******/
const validations = [
    body('nombreProducto').notEmpty().withMessage('Este campo no puede quedar vacio'),
    body('precio').notEmpty().withMessage('Este campo no puede quedar vacio'),
    body('descripcion').notEmpty().withMessage('Este campo no puede quedar vacio'),
    body('modoDeUso').notEmpty().withMessage('Este campo no puede quedar vacio')
];

/***** DETALLE PRODUCTO *****/
router.get('/detalle/:id', productsControllers.detalleProducto);

/***** CREACION PRODUCTO *****/
router.get('/creacion', productsControllers.creacionProducto);
router.post('/creacion', uploadFile.single('imagen'), validations, productsControllers.almacenamientoProducto);

/***** EDICION PRODUCTO *****/
router.get('/edicion/:id', productsControllers.edicionProducto);
router.put('/edicion/:id', validations, productsControllers.productoModificado);

/***** ELIMINACION *****/
router.delete('/:id', productsControllers.eliminacionProducto);

/***** TODOS LOS PRODUCTOS *****/
router.get('/listado', productsControllers.listadoProductos);


module.exports = router;
