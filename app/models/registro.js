const connection = require("../../config/database");

class Registro {
  static crearRegistro(nombre, email, contraseña) {
    return new Promise((resolve, reject) => {
      const createUserQuery = "INSERT INTO user (Nombre, email, pasword) VALUES (?, ?, ?)";
      connection.query(createUserQuery, [nombre, email, contraseña], (err) => {
        if (err) {
          console.error("Error al crear el registro:", err);
          return reject(err);
        }

        resolve();
      });
    });
  }

  static obtenerRegistroPorEmail(email) {
    return new Promise((resolve, reject) => {
      const getUserByEmailQuery = "SELECT * FROM user WHERE email = ?";
      connection.query(getUserByEmailQuery, [email], (err, results) => {
        if (err) {
          console.error("Error al obtener el registro por email:", err);
          return reject(err);
        }

        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      });
    });
  }

  static obtenerRegistroPorPassword(contraseña) {
    return new Promise((resolve, reject) => {
      const getUserByPasswordQuery = "SELECT * FROM user WHERE pasword = ?";
      connection.query(getUserByPasswordQuery, [contraseña], (err, results) => {
        if (err) {
          console.error("Error al obtener el registro por password:", err);
          return reject(err);
        }

        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      });
    });
  }
}

module.exports = Registro;
