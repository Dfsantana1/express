const Product = require('../models/productos');

async function obtenerProductos(req, res) {
  const categoriaId = req.query.categoriaId; // Obtener el parámetro de consulta categoriaId
  const productId = req.params.productId; // Obtener el parámetro de ruta productId
console.log(req.query.productId);
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
    res.status(500).json({ error: 'Server Error' });
  }

}

async function editarProducto(req, res) {
  const productId = req.body.ID_Producto; // Obtener el ID del producto desde el cuerpo de la solicitud

  const { Nombre_Producto, Descripcion, Precio, Stock, Imagen_1, Imagen_2, Imagen_3, Max, Min } = req.body; // Obtener los datos del producto desde el cuerpo de la solicitud
console.log(req.body);
  try {
    // Verificar que el producto exista
    const producto = await Product.obtenerProductoPorId(productId);
    if (!producto) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Actualizar el producto
    await Product.editarProducto(productId, Nombre_Producto, Descripcion, Precio, Imagen_1, Imagen_2, Imagen_3, Stock, Max, Min);

    res.json({ message: 'Product updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}



async function eliminarProducto(req, res) {
  const productId = req.params.productId; // Obtener el parámetro de ruta productId
   try {
    // Verificar que el producto exista
    const producto = await Product.obtenerProductoPorId(productId);
    if (!producto) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Eliminar el producto
    await Product.eliminarProducto(productId);

    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}



module.exports = { obtenerProductos , editarProducto, eliminarProducto };
