const db = require('../../config/database').promise() ;

class Pedido {

  static async agregarProducto(clienteId, productoId, cantidad) {
    try {
      const pedidoQuery = 'SELECT ID_Pedido FROM Pedidos WHERE ID_Usuario = ?';
      const [pedidoResult] = await db.query(pedidoQuery, [clienteId]);
  
      let pedidoId;
  
      if (pedidoResult.length === 0) {
        // No hay pedido existente para el cliente, crear un nuevo pedido
        pedidoId = await Pedido.asignarPedido(clienteId);
      } else {
        pedidoId = pedidoResult[0].ID_Pedido;
      }
  
      const detalleQuery = 'SELECT Cantidad, Subtotal FROM Detalle_Pedidos WHERE ID_Pedido = ? AND ID_Producto = ?';
      const [detalleResult] = await db.query(detalleQuery, [pedidoId, productoId]);
  
      if (detalleResult.length > 0) {
        // Producto existente en el carrito del cliente
        const detalle = detalleResult[0];
        const cantidadExistente = detalle.Cantidad;
        const subtotalExistente = detalle.Subtotal;
  
        const precioQuery = 'SELECT Precio FROM Productos WHERE ID_Producto = ?';
        const [precioResult] = await db.query(precioQuery, [productoId]);
  
        if (precioResult.length > 0) {
          const precio = precioResult[0].Precio;
          const nuevaCantidad = cantidadExistente + cantidad;
          const nuevoSubtotal = nuevaCantidad * precio;
  
          const updateQuery = 'UPDATE Detalle_Pedidos SET Cantidad = ?, Subtotal = ? WHERE ID_Pedido = ? AND ID_Producto = ?';
          await db.query(updateQuery, [nuevaCantidad, nuevoSubtotal, pedidoId, productoId]);
        }
      } else {
        // Nuevo producto en el carrito del cliente
        const precioQuery = 'SELECT Precio FROM Productos WHERE ID_Producto = ?';
        const [precioResult] = await db.query(precioQuery, [productoId]);
  
        if (precioResult.length > 0) {
          const precio = precioResult[0].Precio;
          const subtotal = cantidad * precio;
  
          const insertQuery = 'INSERT INTO Detalle_Pedidos (ID_Pedido, ID_Producto, Cantidad, Subtotal) VALUES (?, ?, ?, ?)';
          await db.query(insertQuery, [pedidoId, productoId, cantidad, subtotal]);
        }
      }
    } catch (error) {
      throw error;
    }
  }
  
  
  static async asignarPedido(clienteId) {
    try {
      console.log('Asignando pedido');
      const fechaPedido = new Date().toISOString().slice(0, 10); // Obtiene la fecha actual en formato YYYY-MM-DD
      const insertPedidoQuery = 'INSERT INTO Pedidos (ID_Usuario, Fecha_Pedido) VALUES (?, ?)';
      await db.query(insertPedidoQuery, [clienteId, fechaPedido]);
    } catch (error) {
      throw error;
    }
  }
  
  
  static   async   elimnarProductoCarrito(clienteId, productoId) {
    try {
      const query = 'DELETE FROM Detalle_Pedidos WHERE ID_Pedido = ? AND ID_Producto = ?';
      await db.query(query, [clienteId, productoId]);
    } catch (error) {
      throw error;
    }
  }
  
  
  //obtener productos por cliente
  static async obtenerProductosPorCliente(clienteId) {
    try {
      const query = 'SELECT Detalle_Pedidos.*, Productos.Precio FROM Detalle_Pedidos INNER JOIN Productos ON Detalle_Pedidos.ID_Producto = Productos.ID_Producto WHERE Detalle_Pedidos.ID_Pedido = ?';
      const [rows] = await db.query(query, [clienteId]);
  
      // Aquí se realiza el cálculo del subtotal para cada detalle de pedido
      const detallesPedidosConSubtotal = rows.map(detallePedido => {
        const subtotal = detallePedido.Cantidad * detallePedido.Precio;
        return {
          ...detallePedido,
          Subtotal: subtotal
        };
      });
  
      return detallesPedidosConSubtotal;
    } catch (error) {
      throw error;
    }
  }
  
  

  
//eliminar producto de carrito por id de producto 
  //elimnar producto del carrito eliminarProducto(clienteId, productoId);

  //finalizar compra

  static async finalizarCompra(clienteId, productoId) {
    try {
      const query = 'DELETE FROM Detalle_Pedidos WHERE ID_Pedido = ? AND ID_Producto = ?';
      await db.query(query, [clienteId, productoId]);
    } catch (error) {
      throw error;
    }
  }
  //vaciar carrito
  static async vaciarCarrito(clienteId) {
    try {
      const query = 'DELETE FROM Detalle_Pedidos WHERE ID_Pedido = ?';
      await db.query(query, [clienteId]);
    } catch (error) {
      throw error;
    }
  }
}


module.exports = Pedido;
