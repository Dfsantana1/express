const db = require('../../config/database').promise() ;
const nodemailer = require('nodemailer');

// Configurar el transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'd.santana@utp.edu.co',
    pass: 'password'
  }
});

class Product {
  static async crearProducto(name, description, price, image1, image2, image3, max, min, stock) {
    try {
      const query = 'INSERT INTO Productos (Nombre_Producto, Descripci0n, Precio, `Imagen_1`, `Imagen_2`, `Imagen_3`, Max, Min, Stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const [result] = await db.query(query, [name, description, price, image1, image2, image3, max, min, stock]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async editarProducto(productoId, name, description, price, image1, image2, image3, stock, max, min) {
    try {
      const query = 'UPDATE Productos SET Nombre_Producto = ?, Descripcion = ?, Precio = ?, Imagen_1 = ?, Imagen_2 = ?, Imagen_3 = ?, Stock = ?, Max = ?, Min = ? WHERE ID_Producto = ?';
      await db.query(query, [name, description, price, image1, image2, image3, stock, max, min, productoId]);
    } catch (error) {
      throw error;
    }
  }
  
 

  static async eliminarProducto(productoId) {
    try {
      const query = 'DELETE FROM Productos WHERE ID_Producto = ?';
      await db.query(query, [productoId]);
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
  //function getproductbyid
  static async obtenerProductoPorId(productoId) {
    try {
      const query = 'SELECT * FROM Productos WHERE ID_Producto = ?';
      const [rows] = await db.query(query, [productoId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  

  static async verificarStock(productoId) {
    try {
      const query = 'SELECT Stock ,Min FROM Productos WHERE ID_Producto = ?';
      const [result] = await db.query(query, [productoId]);
      const stock = result[0].Stock;
      const Min = result[0].Min;

      if (stock < Min) {
        console.log(`¡Stock alert! Product's ID ${productoId} out of stock.`);

        // Configurar el contenido del correo
        const mailOptions = {
          from: 'dsantanafernandez@gmail.com',
          to: 'd.santana@utp.edu.co',
          subject: 'Stock alert',
          text: `¡Stock alert! Product's ID ${productoId} out of stock.`
        };

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Can\'t send email. Error:', error);
          } else {
            console.log('Invalid email:', info.response);
          }
        });
      }
    } catch (error) {
      throw error;
    }
  }

}

module.exports = Product;
