const db = require('../../config/database').promise() ;

class Pedido {
  static async agregarProducto(clienteId, productoId, cantidad) {
    try {
      const detalleQuery = 'SELECT Cantidad, Subtotal FROM Detalle_Pedidos WHERE ID_Pedido = ? AND ID_Producto = ?';
      const [detalleResult] = await db.query(detalleQuery, [clienteId, productoId]);
      
      if (detalleResult.length > 0) {
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
          await db.query(updateQuery, [nuevaCantidad, nuevoSubtotal, clienteId, productoId]);
        }
      } else {
        const precioQuery = 'SELECT Precio FROM Productos WHERE ID_Producto = ?';
        const [precioResult] = await db.query(precioQuery, [productoId]);
        
        if (precioResult.length > 0) {
          const precio = precioResult[0].Precio;
          const subtotal = cantidad * precio;
  
          const insertQuery = 'INSERT INTO Detalle_Pedidos (ID_Pedido, ID_Producto, Cantidad, Subtotal) VALUES (?, ?, ?, ?)';
          await db.query(insertQuery, [clienteId, productoId, cantidad, subtotal]);
        }
      }
    } catch (error) {
      throw error;
    }
  }
  


  static async obtenerProductosPorCliente(clienteId) {
    try {
      const query = 'SELECT * FROM Detalle_Pedidos WHERE ID_Pedido = ?';
      const [rows] = await db.query(query, [clienteId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async finalizarCompra(clienteId, productoId) {
    try {
      const query = 'DELETE FROM Detalle_Pedidos WHERE ID_Pedido = ? AND ID_Producto = ?';
      await db.query(query, [clienteId, productoId]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Pedido;
