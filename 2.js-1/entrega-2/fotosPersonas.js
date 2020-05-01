/**
 * Entregable semana 2
 * 
 * Escribe el código necesario para decidir en qué
 * fotografías sale Pablo. Como resultado se debe
 * obtener un array de strings con los nombres de las
 * fotografías.
 *  
 */

const photos = [
    {
      name: 'Cumpleaños de 13',
      people: ['Maria', 'Pablo']
    },
    {
      name: 'Fiesta en la playa',
      people: ['Pablo', 'Marcos']
    },
    {
      name: 'Graduación',
      people: ['Maria', 'Lorenzo']
    },
  ]
  
  const nombrePersona = 'Pablo';  //almacenar el nombre de la persona que buscamos en las fotos en una variable
  
  function aparecePersona(fotos) {
    for (let i = 0; i < fotos.people.length; i++) {
      if (fotos.people[i].toLowerCase() == nombrePersona.toLowerCase()) { //comprobar que esa persona existe en el apartado people del array (ignorando mayúsculas y minúsculas)
        return true;
      }
    }
  }
  
  const nombreFotosValidas = photos  //aplicar filter (para encontrar los objetos de fotos en las que aparece Pablo) y map (para devolver solo el nombre de la foto)
    .filter(aparecePersona)
    .map(nombre => nombre.name);
  
  
  console.log(nombreFotosValidas);