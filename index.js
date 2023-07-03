const express = require('express');
const cors = require('cors');
const connection = require('./config/database');
const app = express();

const port = 5000;

const userRouter = require('./app/routes/user');
const itemRouter = require('./app/routes/items');
const registroRouter = require('./app/routes/registro');

app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Parsear el cuerpo de las solicitudes como JSON

app.use(userRouter);
app.use(itemRouter);
app.use(registroRouter);

app.listen(port, () => {
  console.log('La aplicación está en línea');
});
