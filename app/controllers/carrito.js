const Carrito = require('../models/carrito');
const Product = require('../models/productos');

async function agregarProductoAlCarrito(req, res) {
  // Obtener los datos del cliente y producto desde el body de la solicitud
  const { clienteId, productoId, cantidad } = req.body;

  try {
    // Verificar la disponibilidad del producto (stock)
    const producto = await Product.obtenerProductoPorId(productoId);
    if (!producto) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (producto.stock < cantidad) {
      return res.status(400).json({ error: 'Out of stock' });
    }
 
    // Agregar el producto al carrito del cliente
    await Carrito.agregarProducto(clienteId, productoId, cantidad);

    res.json({ message: ' Product added successfully ' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

async function obtenerSubtotalCarrito(req, res) {
  try {
    // Obtener el ID del cliente desde los parámetros de la solicitud
    const { clienteId } = req.params;

    // Obtener los productos en el carrito del cliente
    const productosCarrito = await Carrito.obtenerProductosPorCliente(clienteId);

    console.log(productosCarrito);

    // Validar si el carrito está vacío
    if (productosCarrito.length === 0) {
      return res.status(400).json({ error: 'Shopping cart is empty' });
    }

    // Calcular el subtotal sumando los subtotales de los productos
    let subtotal = 0;
    for (const producto of productosCarrito) {
      subtotal += parseFloat(producto.Subtotal);
    }

    console.log(subtotal);
    res.json({ subtotal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}



async function obtenerCarritoPorCliente(req, res) {
  try {
    // Obtener el ID del cliente desde los parámetros de la solicitud
    const { clienteId } = req.params;

    // Obtener los productos en el carrito del cliente
    const productosCarrito = await Carrito.obtenerProductosPorCliente(clienteId);

    // Verificar si el carrito está vacío
    if (productosCarrito.length === 0) {
      return res.status(404).json({ error: 'Shopping cart is empty' });
    }

    let subtotal = 0;
    const productosConTotal = [];

    // Calcular el subtotal sumando los precios de los productos seleccionados
    for (const producto of productosCarrito) {
      // Obtener el detalle del producto
      const productoDetalle = await Product.obtenerProductoPorId(producto.ID_Producto);

      // Verificar si se pudo obtener el detalle del producto
      if (!productoDetalle || !productoDetalle.Precio) {
        return res.status(500).json({ error: 'Cannot find product info' });
      }

      const subtotalProducto = productoDetalle.Precio * producto.Cantidad;
      subtotal += subtotalProducto;

      // Agregar el producto al arreglo de productos con el subtotal
      productosConTotal.push({
        producto,
        subtotal: subtotalProducto,
      });
    }

    console.log(productosConTotal);
    res.json({ productos: productosConTotal, total: subtotal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}



async function eliminarProductoDelCarrito(req, res) {
  // Obtener el ID del cliente desde los parámetros de la solicitu
  const { clienteId, productoId } = req.params;

  try {
    // Eliminar el producto del carrito del cliente
   // await Carrito.eliminarProductoCarrito(clienteId, productoId);

    res.json({ message: 'The product was removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}



//vaciar carrito
async function vaciarCarrito(req, res) {
  // Obtener el ID del cliente desde los parámetros de la solicitu
  const { clienteId } = req.params;

  try {
    // Eliminar el producto del carrito del cliente
    await Carrito.vaciarCarrito(clienteId);

    res.json({ message: 'Shopping cart was emptied' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
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
        await Carrito.eliminarProductoDelCarrito(clienteId, producto.productoId);
        await Product.aumentarStock(producto.productoId, producto.cantidad);
      }
    }

    res.json({ message: 'The Purchase was successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}



module.exports = { agregarProductoAlCarrito, obtenerSubtotalCarrito, finalizarCompra, obtenerCarritoPorCliente, eliminarProductoDelCarrito,vaciarCarrito };
