const express = require('express');
const carritoController = require('../controllers/carrito');

const router = express.Router();

router.post('/cart/add', carritoController.agregarProductoAlCarrito);
router.get('/carrito/subtotal/:clienteId', carritoController.obtenerSubtotalCarrito);
router.post('/carrito/finalizar/:clienteId', carritoController.finalizarCompra);
router.get('/carrito/:clienteId', carritoController.obtenerCarritoPorCliente);
router.delete('/carrito/:clienteId/:productoId', carritoController.eliminarProductoDelCarrito);
//vaciar carrito
router.delete('/carrito/vaciar/:clienteId', carritoController.vaciarCarrito);



module.exports = router;
