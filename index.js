const express = require('express');
const cors = require('cors');
const connection = require('./config/database');
const app = express();

const port = 5000;

const productos = require('./app/routes/productRoutes');
const registroRouter = require('./app/routes/registro');
const loginRouter = require('./app/routes/login'); // Agregado: Ruta para el login

app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Parsear el cuerpo de las solicitudes como JSON

app.use(registroRouter);
app.use(loginRouter);
app.use(productos);

app.listen(port, () => {
  console.log('La aplicación está en línea');
});
