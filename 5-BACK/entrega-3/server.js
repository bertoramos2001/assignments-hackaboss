/**
 * Una tienda quiere ofrecer sus servicios online. 
 * Para ello se dispone a digitalizar su catálogo y mostrarlo 
 * en una web. Nos piden realizar la parte de backend, que debe
 * permitir añadir y modificar productos, para lo cual será 
 * necesario que el usuario esté autenticado; y permitirá también 
 * listar los productos existentes, que se podrá acceder 
 * libremente.
 * 
 * Notas:
 *   - no se pueden dar de alta usuarios. Deberá existir uno por
 * defecto para las tareas de administración.
 *   - la lista de productos puede llegar a ser muy grande, así 
 * que el usuario deberá poder filtrarla mediante parámetros
 * enviados en la `querystring`
 *   - la estructura de un producto es la siguiente:
 *       {
 *           name: '',
 *           stock: <número de productos disponibles de este modelo>
 *           precio: 100
 *       }
 * 
 * 
 * 
 */



require('dotenv').config();

const bodyParser = require('body-parser');
const express = require ('express');
const morgan = require('morgan');

const { login } = require('./controllers/users');
const { list, add, modify } = require('./controllers/products');
const { isAuthenticated } = require('./middlewares/auth')

const port = process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//login usuario por defecto
app.post('/user', login);

//obtener lista de productos (no es necesario autenticarse)
app.get('/product', list);

//modificar un producto (es necesario autenticarse)
app.put('/product/:id', isAuthenticated, modify)

//publicar producto (es necesario autenticarse) 
app.post('/product', isAuthenticated, add);

app.use((error, req, res, next) => {  //middleware generico para la gestion de errores (si algun middleware da error, se ejecuta este)
    res
        .status(error.status || 500)
        .send({status: 'error', message: error.message}) //una vez ponemos el .send no ponemos el next, porque ya envia el resultado(es como un return)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
