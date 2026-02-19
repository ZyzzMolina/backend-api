const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
});

pool.on('connect', () => console.log('Conexion exitosa'));

pool.on('error', (err) => console.error('Error en la conexión:', err));

module.exports = pool;