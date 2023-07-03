// models/registro.js

const connection = require("../../config/database");

class Registro {
  static crearRegistro(nombre, email, contraseña, id) {
    return new Promise((resolve, reject) => {
      const createUserQuery = "INSERT INTO user (username, email, password, iduser) VALUES (?, ?, ?, ?)";
      connection.query(createUserQuery, [nombre, email, contraseña, id], (err) => {
        if (err) {
          console.error("Error al crear el registro:", err);
          return reject(err);
        }

        resolve();
      });
    });
  }
}

module.exports = Registro;
