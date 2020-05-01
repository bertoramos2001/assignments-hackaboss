
function getMensajesPorUsuario(arrayDatosExpandidos) {
  let contadorEntradasPorUsuario = {};

  for (let i = 0; i < arrayDatosExpandidos.length; i++) {
    let tituloContador = (`usuario ${arrayDatosExpandidos[i].userId}`);
    if (contadorEntradasPorUsuario[tituloContador] == undefined) {
      contadorEntradasPorUsuario[tituloContador] = 1;
    } else {
      contadorEntradasPorUsuario[tituloContador] += 1;
    }
  }
  return JSON.stringify(contadorEntradasPorUsuario, null, 4) //para poder pintar el objeto sin el error [object, object]
}

function getListaPostsUsuarios(arrayDatosExpandidos) {
  let lista = [];
  let arrayUsuarios = [];
  for (let usuario of arrayDatosExpandidos) {      //para poder pintar el objeto en pantalla sin que ponga [object, object] en la consola
    if (arrayUsuarios.indexOf(usuario.userId) == -1) {
      arrayUsuarios.push(usuario.userId);
    }
  }
  for (let j = 0; j < arrayUsuarios.length; j++) { //crear un array llamado lista, que contiene objetos con los id de cada usuario y un campo posts por ahora vacio
    let obj = {};
    obj['userId'] = arrayUsuarios[j];
    obj['posts'] = [];
    lista.push(obj);
  }
  for (let usuario of arrayDatosExpandidos) { //llenar los arrays posts con los datos indicados
    for (let k = 0; k < lista.length; k++) {
      if(usuario.userId == lista[k].userId) {
        let obj = {};
        obj['title'] = usuario.title;
        obj['body'] = usuario.body;
        lista[k].posts.push(obj);
      }
    }
  }
  return JSON.stringify(lista, null, 4)  //para poder pintar el objeto en pantalla sin que ponga [object, object] en la consola
}

module.exports = {
  getMensajesPorUsuario,
  getListaPostsUsuarios
}