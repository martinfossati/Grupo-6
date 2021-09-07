/***** REQUIRES *****/
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

/***** CONTROLLER REQUIRE *****/
const productsControllers = require('./../controllers/productsControllers');

/******** Multer ********/
const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {      
     cb(null, path.join(__dirname,'../../public/images'));   
    },
    filename: function(req, file, cb) {         
     let imageName = 'imgProduct' + Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });


/***** DETALLE PRODUCTO *****/
router.get('/detalle/:id', productsControllers.detalleProducto);

/***** CREACION PRODUCTO *****/
router.get('/creacion', productsControllers.creacionProducto);
router.post('/creacion', uploadFile.single('imagen'), productsControllers.almacenamientoProducto);

/***** EDICION PRODUCTO *****/
router.get('/edicion/:id', productsControllers.edicionProducto);
router.put('/edicion/:id', productsControllers.productoModificado);

/***** ELIMINACION *****/
router.delete('/:id', productsControllers.eliminacionProducto);

/***** TODOS LOS PRODUCTOS *****/
router.get('/listado', productsControllers.listadoProductos);




module.exports = router;
