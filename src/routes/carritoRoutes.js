const express = require('express');
const router = express.Router();

const carritoControllers = require('./../controllers/carritoControllers');

router.get('/', carritoControllers.carrito);

module.exports = router;