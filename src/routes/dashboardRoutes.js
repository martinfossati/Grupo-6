const express = require('express');
const router = express.Router();

const dashboardControllers = require('./../controllers/dashboardControllers');

/*** TODOS LOS USUARIOS ***/
router.get('/countUsers', dashboardControllers.countUsers);

/*** USUARIO UNICO ***/
router.get('/countUsers/:id', dashboardControllers.findUser);

/*** TODOS LOS PRODUCTOS ***/
router.get('/countProducts', dashboardControllers.countProducts);

/*** PRODUCTO UNICO ***/
router.get('/countProducts/:id', dashboardControllers.findProduct);

/*** TODOS LAS CATEGORIAS ***/
router.get('/countCategories', dashboardControllers.countCategories);

module.exports = router;