const Product = require('../models/productos');

async function obtenerProductos(req, res) {
  const categoriaId = req.query.categoriaId; // Obtener el parámetro de consulta categoriaId
  const productId = req.params.productId; // Obtener el parámetro de ruta productId

  try {
    // Utilizar categoryId, productId y cualquier otro parámetro según sea necesario
    let productos = await Product.obtenerProductos(categoriaId || null, productId);

    // Verificar el stock de cada producto
    productos = await Promise.all(productos.map(async (producto) => {
      const stock = await Product.verificarStock(producto.ID_Producto);
      return { ...producto, stock };
    }));

    res.json({ productos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }

}

module.exports = { obtenerProductos };
