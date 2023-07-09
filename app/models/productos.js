const db = require('../../config/database');

class Product {
  static async crearProducto(nombre, precio, categoriaId) {
    try {
      const query = 'INSERT INTO productos (nombre, precio, categoria_id) VALUES (?, ?, ?)';
      const [result] = await db.query(query, [nombre, precio, categoriaId]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerProductos(categoriaId) {
    try {
      let query = 'SELECT * FROM productos';

      if (categoriaId) {
        query += ' WHERE categoria_id = ?';
      }

      const params = categoriaId ? [categoriaId] : [];

      const [rows] = await db.query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
