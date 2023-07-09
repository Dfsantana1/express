const Registro = require('./registro');

class Login {
  static async autenticarUsuario(Email, Password) {
    try {
      const registro = await Registro.obtenerRegistroPorEmail(Email);
      if (!registro) {
        throw new Error('Usuario no encontrado');
      }

      const contraseñaCorrecta = await Registro.obtenerRegistroPorPassword(Password);
      if (!contraseñaCorrecta) {
        throw new Error('Contraseña incorrecta');
      }

      return registro;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Login;
