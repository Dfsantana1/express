const connection = require("../../config/database");

class Registro {
  static crearRegistro(Name ,Lastname ,Email, Password,cellphone) {
    return new Promise((resolve, reject) => {
      const createUserQuery = "INSERT INTO Usuarios (Nombre,Apellido,Email,Contraseña ,Telefono,ID_ROL) VALUES (?, ?, ?,?,?,2)";
      connection.query(createUserQuery, [Name,Lastname,Email,Password,cellphone], (err) => {
        if (err) {
          console.error("Error al crear el registro:", err);
          return reject(err);
        }

        resolve();
      });
    });
  }

  static obtenerRegistroPorEmail(Email) {
    return new Promise((resolve, reject) => {
      const getUserByEmailQuery = "SELECT * FROM Usuarios WHERE Email = ?";
      connection.query(getUserByEmailQuery, [Email], (err, results) => {
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

  static obtenerRegistroPorPassword(Contraseña) {
    return new Promise((resolve, reject) => {
      const getUserByPasswordQuery = "SELECT * FROM Usuarios WHERE Contraseña = ?";
      connection.query(getUserByPasswordQuery, [Contraseña], (err, results) => {
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
