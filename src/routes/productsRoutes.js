/***** REQUIRES *****/
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

/***** CONTROLLER REQUIRE *****/
const productsControllers = require('./../controllers/productsControllers');

/******** Multer ********/
const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {      
     cb(null, path.join(__dirname,'../../public/images/products'));   
    },
    filename: function(req, file, cb) {         
     let imageName = 'imgProduct' + Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });

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
