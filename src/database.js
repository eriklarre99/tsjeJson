const mysql = require('mysql');
const { promisify }= require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Se cerró la conexión a la base de datos.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('La base de datos tiene muchas conexiones');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Se rechazó la conexión a la base de datos');
    }
  }

  if (connection) {
    connection.release()
    console.log('     ---> DB is Connected');
  };

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;