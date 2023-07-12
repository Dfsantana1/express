const Carrito = require('../models/carrito');
const Product = require('../models/productos');

async function agregarProductoAlCarrito(req, res) {
  // Obtener los datos del cliente y producto desde el body de la solicitud
  const { clienteId, productoId, cantidad } = req.body;

  try {
    // Verificar la disponibilidad del producto (stock)
    const producto = await Product.obtenerProductoPorId(productoId);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (producto.stock < cantidad) {
      return res.status(400).json({ error: 'Cantidad supera el stock disponible' });
    }
 
    // Agregar el producto al carrito del cliente
    await Carrito.agregarProducto(clienteId, productoId, cantidad);

    res.json({ message: 'Producto agregado al carrito exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

async function obtenerSubtotalCarrito(req, res) {
  // Obtener el ID del cliente desde los parámetros de la solicitud
  const { clienteId } = req.params;

  try {
    // Obtener los productos en el carrito del cliente
    const productosCarrito = await Carrito.obtenerProductosPorCliente(clienteId);

    // Calcular el subtotal sumando los precios de los productos seleccionados
    let subtotal = 0;
    for (const producto of productosCarrito) {
      const productoDetalle = await Product.obtenerProductoPorId(producto.productoId);
      subtotal += productoDetalle.precio * producto.cantidad;
    }

    res.json({ subtotal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

async function finalizarCompra(req, res) {
  // Obtener el ID del cliente desde los parámetros de la solicitud
  const { clienteId } = req.params;

  try {
    // Obtener los productos en el carrito del cliente
    const productosCarrito = await Carrito.obtenerProductosPorCliente(clienteId);

    // Realizar la compra y actualizar el stock
    for (const producto of productosCarrito) {
      // Verificar nuevamente la disponibilidad del producto (por si ha cambiado mientras el cliente lo tenía en el carrito)
      const productoActualizado = await Product.obtenerProductoPorId(producto.productoId);
      if (productoActualizado.stock >= producto.cantidad) {
        // Actualizar el stock y realizar la compra
        await Product.actualizarStock(producto.productoId, producto.cantidad);
        await Carrito.finalizarCompra(clienteId, producto.productoId);
      } else {
        // Liberar los productos reservados y aumentar el stock
        await Carrito.eliminarProducto(clienteId, producto.productoId);
        await Product.aumentarStock(producto.productoId, producto.cantidad);
      }
    }

    res.json({ message: 'Compra finalizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

module.exports = { agregarProductoAlCarrito, obtenerSubtotalCarrito, finalizarCompra };
