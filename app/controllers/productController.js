const Product = require('../models/productos');

async function obtenerProductos(req, res) {
  const { categoriaId } = req.query; // Obtener el parámetro de consulta categoriaId

  try {
    const productos = await Product.obtenerProductos(categoriaId); // Pasar el categoriaId al método obtenerProductos
    res.json({ productos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

module.exports = { obtenerProductos };
