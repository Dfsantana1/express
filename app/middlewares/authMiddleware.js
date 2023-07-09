function verifyToken(req, res, next) {
    const token = req.headers.authorization; // Obtén el token de acceso del encabezado de la solicitud
  
    // Verificar si el token está en la lista negra
    if (blacklist.includes(token)) {
      return res.status(401).json({ error: 'Token de acceso inválido' });
    }
  
    // Verificar y validar el token de acceso utilizando jwt.verify()
    try {
      const decoded = jwt.verify(token, 'secretKey'); // Verifica y decodifica el token utilizando la clave secreta
      req.userId = decoded.userId; // Almacena el ID de usuario en la solicitud para su uso posterior
      next(); // Pasa al siguiente middleware o controlador
    } catch (error) {
      return res.status(401).json({ error: 'Token de acceso inválido' });
    }
  }
  
  module.exports = verifyToken;
  