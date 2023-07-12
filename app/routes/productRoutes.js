const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Definir la ruta GET '/products/:productId?' y llamar a productController.obtenerProductos para manejar la solicitud
router.get('/products/:productId?', productController.obtenerProductos);

module.exports = router;
