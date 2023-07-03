// controller/registro.js

const Registro = require("../models/registro");

const registrarUsuario = async (req, res) => {
  const { nombre, email, contraseña, id } = req.body;

  try {
    // Crear el registro utilizando el modelo
    await Registro.crearRegistro(nombre, email, contraseña, id);

    res.status(201).json({ message: "Registro exitoso" });
  } catch (error) {
    console.error("Error al crear el registro:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  registrarUsuario,
};
