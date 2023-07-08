const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'b3yyroywdkhgglhd1hqs-mysql.services.clever-cloud.com',
  user: 'uwsoxaqbgpp9o8mf',
  password: 'tJHPFlyRiqfKxFjHGTNG',
  database: 'b3yyroywdkhgglhd1hqs',
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;



