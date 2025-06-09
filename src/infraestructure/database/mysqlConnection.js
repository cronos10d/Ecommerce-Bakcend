const mysql = require('mysql2/promise');
 
const pool = mysql.createPool({
  host: 'localhost',
  user: 'tu_usuario_mysql',
  password: 'tu_contraseña_mysql',
  database: 'nombre_de_tu_base_de_datos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
 
module.exports = pool;