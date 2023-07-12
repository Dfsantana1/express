const db = require('../../config/database').promise() ;
const nodemailer = require('nodemailer');

// Configurar el transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dsantanafernandez@gmail.com',
    pass: '*********'
  }
});

class Product {
  static async crearProducto(nombre, descripcion, precio, imagen1, imagen2, imagen3, max, min, stock) {
    try {
      const query = 'INSERT INTO Productos (Nombre_Producto, Descripción, Precio, `Imagen 1`, `Imagen 2`, `Imagen 3`, Max, Min, Stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const [result] = await db.query(query, [nombre, descripcion, precio, imagen1, imagen2, imagen3, max, min, stock]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerProductos(categoriaId) {
    try {
      let query = 'SELECT * FROM Productos';

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

  static async verificarStock(productoId) {
    try {
      const query = 'SELECT Stock FROM Productos WHERE ID_Producto = ?';
      const [result] = await db.query(query, [productoId]);
      const stock = result[0].Stock;
      
      if (stock <= 0) {
        console.log(`¡Alerta de stock! Producto con ID ${productoId} sin stock.`);

        // Configurar el contenido del correo
        const mailOptions = {
          from: 'dsantanafernandez@gmail.com',
          to: 'd.santana@utp.edu.co',
          subject: 'Alerta de stock',
          text: `¡Alerta de stock! El producto con ID ${productoId} está sin stock.`
        };

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error al enviar el correo:', error);
          } else {
            console.log('Correo enviado:', info.response);
          }
        });
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
