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
  const productId = req.body.id; // Obtener el ID del producto desde el cuerpo de la solicitud
  const { nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, max, min } = req.body; // Obtener los datos del producto desde el cuerpo de la solicitud

  try {
    // Verificar que el producto exista
    const producto = await Product.obtenerProductoPorId(productId);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar el producto
    await Product.editarProducto(productId, nombre, descripcion, precio, imagen1, imagen2, imagen3, stock, max, min);

    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
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
