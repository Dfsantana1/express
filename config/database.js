const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'bwx6bl80n95s6athhfkf-mysql.services.clever-cloud.com',
  user: 'uucuwkfvxtpdcbrf',
  password: 'ih8P00U1DyijyH7Lcbmk',
  database: 'bwx6bl80n95s6athhfkf',
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;



