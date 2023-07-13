const connection = require("../../config/database");

class Registro {
  static crearRegistro(Name ,Lastname ,Email, Password,Telefono,Direccion) {
    return new Promise((resolve, reject) => {
      const createUserQuery = "INSERT INTO Usuarios (Nombre,Apellido,Email,Contraseña ,Telefono,ID_ROL,Direccion) VALUES (?, ?, ?,?,?,2,?)";
      connection.query(createUserQuery, [Name,Lastname,Email,Password,Telefono,Direccion], (err) => {
        if (err) {
          console.error("Error al crear el registro:", err);
          return reject(err);
        }

        resolve();
      });
    });
  }

  static obtenerRegistroPorEmail(Email) {
    console.log(Email);
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


  //obtener usuario por id
  static obtenerRegistroPorIdq(Id) {
    console.log(Id);
    return new Promise((resolve, reject) => {
      const getUserByIdQuery = "SELECT * FROM Usuarios WHERE ID_USUARIO = ?";
      connection.query(getUserByIdQuery, [Id], (err, results) => {
        if (err) {
          console.error("Error al obtener el registro por id:", err);
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
  
    

  static editarRegistro(Name ,Lastname ,Email, Password,Telefono,Direccion) {
    return new Promise((resolve, reject) => {
      const updateUserQuery = "UPDATE Usuarios SET Nombre = ?,Apellido = ?,Contraseña = ?,Telefono = ?,Direccion = ? WHERE Email = ?";
      connection.query(updateUserQuery, [Name,Lastname,Password,Telefono,Direccion,Email], (err) => {
        if (err) {
          console.error("Error al actualizar el registro:", err);
          return reject(err);
        }

        resolve();
      });
    });
  }
  //api de prueba para postman
  static obtenerRegistroPorPassword(Contraseña) {
    console.log(Contraseña);
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
