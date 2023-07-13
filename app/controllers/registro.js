const Registro = require("../models/registro");
const bodyParser = require('body-parser');

const registrarUsuario = async (req, res) => {
  console.log(req.body);
  const {Name,Lastname,Email,Password,Telefono,Direccion} = req.body;

  try {
    // Verificar si el email ya está registrado
    const emailExistente = await Registro.obtenerRegistroPorEmail(Email);
    if (emailExistente) {
      return res.status(400).json({ error: "Email exists" });
    }

    // Verificar si el password ya está registrado
    const passwordExistente = await Registro.obtenerRegistroPorPassword(Password);
    if (passwordExistente) {
      return res.status(400).json({ error: "" });
    }

    // Crear el registro utilizando el modelo
    await Registro.crearRegistro(Name,Lastname,Email,Password,Telefono,Direccion);

    // Responder al cliente con un mensaje de éxito
    res.status(201).json({ message: "Signed up successfully!" });
  } catch (error) {
    console.error("Sign up error:", error);
    res.status(500).json({ error: "Server Error" });
  }
  
  
};

//obtener usuario adminstrador
const obtenerUsuario = async (req, res) => {
  try {

    // Obtener el ID del cliente desde el requiere body
    const { clienteId } = req.body;
  

    console.log(clienteId);
    // Obtener el cliente utilizando el modelo
    const cliente = await Registro.obtenerRegistroPorId(clienteId);

    // Verificar si el cliente existe
    if (!cliente) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Responder al cliente con el cliente obtenido
    res.json(cliente);
  } catch (error) {
    console.error("Client not found:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

const editarUsuario = async (req, res) => {
  // Obtener la información del cliente desde el body de la solicitud
  const { Name,Lastname,Email,Password,Telefono,Direccion } = req.body;

  

  try {
    // Verificar si el cliente existe
    const clienteExistente = await Registro.obtenerRegistroPorEmail(Email);
    if (!clienteExistente) {
      return res.status(404).json({ error: "Client not found" });
    }
      
    // Actualizar el cliente utilizando el modelo
    await Registro.editarRegistro(Name,Lastname,Email,Password,Telefono,Direccion);

    // Responder al cliente con un mensaje de éxito
    res.json({ message: "Client updated" });
  } catch (error) {
    console.error("Client update error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};


module.exports = {
  registrarUsuario,editarUsuario,obtenerUsuario
};
