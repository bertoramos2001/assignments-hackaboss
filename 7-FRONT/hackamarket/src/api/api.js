// declarando las librerias instaladas
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

//cosas que usa app
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//datos de conexion a la b
//conexion a la bbdd
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'bdHackamarket',
    password: 'bdHackamarket',
    database:'bdHackamarket',
})

//haciendo la conexion a la bd
connection.connect( error => {
    if(error) throw error
    console.log('Database iniciada :)')
})

//puerto de conexion de servicio
const PORT = 3051

//conexion del servicio
app.listen(PORT, () => console.log('API conectada :)'))

// AÑADIR CLIENTES A LA BD
app.post('/add', (req, res) => {
    //secuencia sql
    const sql = 'INSERT INTO listaclientes SET ?'
    //objeto de datos del nuevo cliente
    const nuevoCliente = {
        nombre: req.body.nombre,
        usuario: req.body. usuario,
        email: req.body.email,
        password: req.body.contrasena,
        foto: req.body.fotografia
    }
    //conexion a la bd
    connection.query(sql, nuevoCliente, error => {
        if(error) throw error
        console.log('Cliente creado con éxito')
    })
})

//RECOGER TODOS LOS CLIENTES DE LA BD
app.get('/clientes', (req, res) => {
    //secuencia sql
    const sql = 'SELECT * FROM listaclientes'
    //conexion a la bd
    connection.query(sql, (error, results) => {
        if(error) throw error
        if(results.length > 0) {
            res.json(results)
        } else {
            console.log('No hay clientes que mostrar')
        }
    })
})

// ACTUALIZAR CLIENTES EN LA BD
app.put('/update/:id', (req, res) => {
    //datos que recibimos
    const id = req.params.id
    const nombre = req.body.nombre
    const usuario = req.body.usuario
    const email = req.body.email
    const contrasena = req.body.password
    const fotografia = req.body.foto
    //secuencia sql
    const sql = `UPDATE listaclientes SET nombre='${nombre}', usuario='${usuario}', email='${email}', password='${contrasena}', foto='${fotografia}' WHERE id=${id}`
    //conexion a la bd
    connection.query(sql, error => {
        if(error) throw error
        console.log('Cliente actualizado con éxito')
    })
})

//BORRAR CLIENTES DE LA BD
app.delete('/delete/:id', (req, res) => {
    //datos que llegan de la vista
    const id = req.params.id
    //secuencia sql
    const sql = `DELETE FROM listaclientes WHERE id=${id}`
    //conexion a la bd
    connection.query(sql, error => {
        if(error) throw error
        console.log('Cliente borrado')
    })
})