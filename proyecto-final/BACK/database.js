const mysql = require('mysql2/promise');

async function connection() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'proyectoHAB',
        password: process.env.PASSWORD_DATABASE,
        database: 'proyectoHAB'
    });
}

module.exports = {
    connection
};