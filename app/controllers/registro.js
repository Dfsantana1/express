const Registro = require("../models/registro");

const registrarUsuario = async (req, res) => {
  const { nombre, email, contraseña} = req.body;

  try {
    // Verificar si el email ya está registrado
    const emailExistente = await Registro.obtenerRegistroPorEmail(email);
    if (emailExistente) {
      return res.status(400).json({ error: "Email ya registrado" });
    }

    // Verificar si el password ya está registrado
    const passwordExistente = await Registro.obtenerRegistroPorPassword(contraseña);
    if (passwordExistente) {
      return res.status(400).json({ error: "Password ya registrado" });
    }

    // Crear el registro utilizando el modelo
    await Registro.crearRegistro(nombre, email, contraseña);

    res.status(201).json({ message: "Registro exitoso" });
  } catch (error) {
    console.error("Error al crear el registro:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  registrarUsuario,
};
