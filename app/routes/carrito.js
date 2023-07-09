const express = require('express');
const carritoController = require('../controllers/carritoController');

const router = express.Router();

router.post('/carrito/agregar', carritoController.agregarProductoAlCarrito);
router.get('/carrito/subtotal/:clienteId', carritoController.obtenerSubtotalCarrito);
router.post('/carrito/finalizar/:clienteId', carritoController.finalizarCompra);

module.exports = router;
