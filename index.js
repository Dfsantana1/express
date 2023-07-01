const express = require('express');
const connection = require('./config/db');
const app = express();

const port = 3001;

const userRouter = require('./app/routes/user');
const itemRouter = require('./app/routes/items');

app.use(userRouter);
app.use(itemRouter);

app.listen(port, () => {
  console.log('La aplicación está en línea');
});


