// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/posts/1

// a) Generar contador de mensajes por usario
// b) Generar una lista con la siguiente estructura:
/*[
    1 : {
        userId: <userId>,
        posts: [
            {
                title: <title>
                body: <body>     // hay que obtenerlo de la segunda petición
            },
            {
                title: <title>
                body: <body>
            },
        ]
    }

]
*/
const axios = require('axios');
const utils = require('./utils');

const URL_USUARIO = 'https://jsonplaceholder.typicode.com/posts/';

async function obtenerDatos() {
    const responseUsuarios = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const usuarios = responseUsuarios.data;
    let datosUsuarioExpandidos = [];

    for (let usuario of usuarios) {
        let responseUsuario = await axios.get(`${URL_USUARIO}${usuario.id}`);
        let user = responseUsuario.data;
        datosUsuarioExpandidos.push(user);
    }
    
    return datosUsuarioExpandidos;    //este array contiene toda la información detallada de cada usuario, teniendo un id de articulo en cada posicion
}

obtenerDatos()
    .then(resultados => {
        const mensajesPorUsuario = utils.getMensajesPorUsuario(resultados);//calcula la primera pregunta del ejercicio
        const listaPostsUsuarios = utils.getListaPostsUsuarios(resultados);//calcula la segunda pregunta del ejercicio

        console.log(`Número de artículos escritos por usuario: ${mensajesPorUsuario}`);
        console.log(listaPostsUsuarios)
    })

.catch(error => {
    console.log('Imposible realizar la operación')
})