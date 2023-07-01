const mongoose = require('mongoose');

const DB_URI = "mongodb+srv://dsantana:CeGyKUJVB8atQ7KP@cluster0.mw1yzty.mongodb.net/mydatabase?retryWrites=true&w=majority";

module.exports = () => {
  const connect = () => {
    mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    })
    .then(() => {
      console.log('Conexión exitosa a la base de datos');
    })
    .catch((err) => {
      console.error('Error al conectar a la base de datos:', err.message);
    });
  };
  connect();
};



