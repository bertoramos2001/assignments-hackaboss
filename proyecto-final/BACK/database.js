const mysql = require('mysql2/promise');

async function connection() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'proyectoHAB',
        password: process.env.PASSWORD_DATABASE,
        database: 'proyectoHAB'
    });
}

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'proyectoHAB',
//     password: process.env.PASSWORD_DATABASE,
//     database: 'proyectoHAB'
// })

// connection.connect( error => {
//     if(error) throw error
//     console.log('Database iniciada :)')
// })

module.exports = {
    connection
};