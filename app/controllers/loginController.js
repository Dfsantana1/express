const Login = require('../models/login');
const jwt = require('jsonwebtoken');
const blacklist = require('./moduls/BlackList');

 
async function login(req, res) {
  const { Email, Password } = req.body;

  try {
    const registro = await Login.autenticarUsuario(Email, Password);
//
  
    const accessToken = jwt.sign({ userId: registro.id }, 'secretKey', { expiresIn: '1h' });

    // Enviar el token de acceso junto con la respuesta
    res.json({ message: 'Inicio de sesión exitoso', accessToken, usuario: registro });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
}

function logout(req, res) {
  // Lógica para cerrar sesión

  const token = req.headers.authorization; // Obtén el token de acceso del encabezado de la solicitud

  // Agrega el token de acceso a la lista negra
  blacklist.push(token);

  // Envía una respuesta al cliente indicando que la sesión se ha cerrado exitosamente
  res.json({ message: 'Cierre de sesión exitoso' });
}


module.exports = { login, logout };