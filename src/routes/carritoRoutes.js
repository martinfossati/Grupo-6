const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const carritoControllers = require('./../controllers/carritoControllers');

router.get('/', authMiddleware, carritoControllers.carrito);

module.exports = router;