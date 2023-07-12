const express = require('express');
const carritoController = require('../controllers/carrito');

const router = express.Router();

router.post('/cart/add', carritoController.agregarProductoAlCarrito);
router.get('/carrito/subtotal/:clienteId', carritoController.obtenerSubtotalCarrito);
router.post('/carrito/finalizar/:clienteId', carritoController.finalizarCompra);

module.exports = router;
