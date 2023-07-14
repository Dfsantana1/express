const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Definir la ruta GET '/products/:productId?' y llamar a productController.obtenerProductos para manejar la solicitud
router.get('/products/:productId?', productController.obtenerProductos);

// Definir la rtuta POST '/products' y llamar a productController.agregarProducto para manejar la solicitud
router.put('/products', productController.editarProducto);

//enviar correos de compra

module.exports = router;
