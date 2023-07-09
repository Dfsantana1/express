const db = require('../../config/database');

class Carrito {
  static async agregarProducto(clienteId, productoId, cantidad) {
    try {
      const query = 'INSERT INTO carrito (clienteId, productoId, cantidad) VALUES (?, ?, ?)';
      await db.query(query, [clienteId, productoId, cantidad]);
    } catch (error) {
      throw error;
    }
  }

  static async obtenerProductosPorCliente(clienteId) {
    try {
      const query = 'SELECT * FROM carrito WHERE clienteId = ?';
      const [rows] = await db.query(query, [clienteId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async finalizarCompra(clienteId, productoId) {
    try {
      const query = 'DELETE FROM carrito WHERE clienteId = ? AND productoId = ?';
      await db.query(query, [clienteId, productoId]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Carrito;
