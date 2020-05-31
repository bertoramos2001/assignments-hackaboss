/**
 * Un cliente nos pide realizar un sistema para gestionar eventos culturales.
 * Necesita dar de alta eventos, que pueden ser de tipo 'concierto', 'teatro' o 
 * 'monólogo'. Cada uno se caracteriza por un 'nombre', 'aforo' y 'artista'.
 * Opcionalmente pueden incluir una descripción.
 * 
 * El cliente necesitará una API REST para añadir conciertos y poder obtener
 * una lista de los existentes.
 * 
 * El objetivo del ejercicio es que traduzcas estos requisitos a una descripción
 * técnica, esto es, decidir qué endpoints hacen falta, qué parámetros y cuáles 
 * son los código de error a devolver
 * 
 * Notas:
 *    - el conocimiento necesario para realizarlo es el adquirido hasta la clase del
 *      miércoles
 *    - llega con un endpoint GET y otro POST
 *    - el almacenamiento será en memoria, por tanto cuando se cierre el servidor
 *      se perderán los datos. De momento es aceptable esto.
 * 
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let listaEventos = [];


app.post('/eventos', (req, res) => {
    if (req.body.tipo !== 'concierto' && req.body.tipo !== 'monólogo' && req.body.tipo !== 'teatro') {
        res.status(403).send(); //si el usuario quiere introducir un evento que no está permitido (ya que no es ni tipo concierto, ni tipo monólogo ni tipo teatro), enviamos el código de error 403 (forbidden)
    }
    if (req.body.nombre === '' || req.body.nombre === undefined || req.body.aforo === '' || req.body.aforo === undefined || req.body.artista === '' || req.body.artista === undefined) {  //tanto si el nombre, aforo o artista está vacío o sin definir, damos error
        res.status(400).send();
    }
      //comprobamos si el nuevo elemento ya existía
  const isEqual = (item) => {
    return(item.tipoEvento === req.body.tipo && item.nombre === req.body.nombre && item.aforo === req.body.aforo && item.artista === req.body.artista && item.descripcion === req.body.descripcion);  //si todos los parametros coinciden, significa que estamos metiendo el mismo evento y devolvemos un error 409
  }
  const equalElements = listaEventos.filter(isEqual); //comprobamos con la funcion isEqual si ya existe un elemento igual al que el usuario quiere crear
  if (equalElements.length !== 0) {
    res.status(409).send(); //enviamos error 409 si ya existe otro elemento igual al que queremoso crear
    return;
  }

    let data = {
        tipoEvento: req.body.tipo,
        nombre: req.body.nombre,
        aforo: req.body.aforo,
        artista: req.body.artista,
        descripcion: req.body.descripcion
    }
    listaEventos.push(data);
    res.json();
})

app.get('/eventos', (req, res) => {
    res.json(listaEventos);
})

app.listen(3000);