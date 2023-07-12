const Registro = require("../models/registro");
const bodyParser = require('body-parser');

const registrarUsuario = async (req, res) => {
  console.log(req.body);
  const {Name,Lastname,Email,Password,cellphone,Direccion} = req.body;

  try {
    // Verificar si el email ya está registrado
    const emailExistente = await Registro.obtenerRegistroPorEmail(Email);
    if (emailExistente) {
      return res.status(400).json({ error: "Email ya registrado" });
    }

    // Verificar si el password ya está registrado
    const passwordExistente = await Registro.obtenerRegistroPorPassword(Password);
    if (passwordExistente) {
      return res.status(400).json({ error: "Password ya registrado" });
    }

    // Crear el registro utilizando el modelo
    await Registro.crearRegistro(Name,Lastname,Email,Password,cellphone,Direccion);

    // Responder al cliente con un mensaje de éxito
    res.status(201).json({ message: "Registro exitoso" });
  } catch (error) {
    console.error("Error al crear el registro:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
  
  
};


module.exports = {
  registrarUsuario,
};
