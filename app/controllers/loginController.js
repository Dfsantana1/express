const Login = require('../models/login');
const jwt = require('jsonwebtoken');
const blacklist = require('./moduls/BlackList');

async function login(req, res) {
  const { Email, Password } = req.body;

  try {
    const registro = await Login.autenticarUsuario(Email, Password);

    const accessToken = jwt.sign({ userId: registro.id }, 'secretKey', { expiresIn: '1h' });

    // Enviar el token de acceso junto con la respuesta
    res.json({ message: 'Inicio de sesión exitoso', accessToken, usuario: registro });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
}

function logout(req, res) {
  const { token } = req.body;

  // Verificar si el token ya está en la lista negra
  if (blacklist.includes(token)) {
    return res.status(400).json({ error: 'El token ya está en la lista negra' });
  }

  // Agregar el token a la lista negra
  blacklist.push(token);

  res.json({ message: 'Token agregado a la lista negra correctamente' });
}

module.exports = { login, logout };
