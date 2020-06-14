//USER FUNCTIONS

//comprobar que la contraseña debe ser mayor de 8 caracteres, debe tener una letra mayuscula y un numero
const checkPassword = (password) => {
    return(password.length >= 8 && password.toLowerCase() !== password && /\d/.test(password))
}

//en el caso de los campos que pueden tener varios valores separados pr comas, meter cada valor en un elemento de un array
const parseBodyToArray = (value) => {
    let result = value.split(',').map(item => item.trim()).filter(item => item.length > 0)
    return result;
}

const normalizeName = (name) => {
    return name
        .trim()
        .split(' ')
        .filter(item => item.length > 0)
        .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join(' ');
}

const ageDiff = (birthDate, actualDate) => {
    var actualYear = actualDate.getFullYear();
    var actualMonth = actualDate.getMonth();
    var actualDay = actualDate.getDate();
    var oldYear = birthDate.getFullYear();
    var oldMonth = birthDate.getMonth();
    var oldDay = birthDate.getDate();
    var diff = actualYear - oldYear;
    if(oldMonth > actualMonth) diff--;
    else
    {
      if(oldMonth == actualMonth)
      {
        if(oldDay > actualDay) diff--;
      }
    }
    return diff;
}

const sendConfirmationEmailFamily = (emailDestino, apellidoFamilia) => {
    const msg = {
        to: emailDestino,
        from: 'futurasestrellasfutbol@gmail.com',
        subject: '¡Bienvenidos a Futuras Estrellas, familia!',
        text: `¡Bienvenidos familia ${apellidoFamilia}!Agradecemos mucho que hayáis decidido uniros a FuturasEstrellas.com para encontrar potenciales ojeadores interesados y progresar en la vida futbolística mientras disfrutáis de este gran deporte. ¡Ahora toca ponerse manos a la obra! Subid vídeos para que los ojeadores os puedan encontrar y contactad con ellos. ¡Mucha suerte en este emocionante camino! Desde el equipo de FuturasEstrellas.com estaremos a vuestra disposición para lo que necesitéis.`,
        html: `<h1 style="text-align:center">¡Bienvenidos familia ${apellidoFamilia}!</h1><p style="text-align:center">Agradecemos mucho que hayáis decidido uniros a FuturasEstrellas.com para encontrar potenciales ojeadores interesados y progresar en la vida futbolística mientras disfrutáis de este gran deporte. <br><br> ¡Ahora toca ponerse manos a la obra! Subid vídeos para que los ojeadores os puedan encontrar y contactad con ellos. ¡Mucha suerte en este emocionante camino! Desde el equipo de FuturasEstrellas.com estaremos a vuestra disposición para lo que necesitéis.</p>`
      };
      return msg;
}

const sendConfirmationEmailScout = (emailDestino, nombreOjeador) => {
    const msg = {
        to: emailDestino,
        from: 'futurasestrellasfutbol@gmail.com',
        subject: '¡Bienvenido a Futuras Estrellas',
        text: `¡Bienvenido ${nombreOjeador}!Agradecemos mucho que hayas decidido unirte a FuturasEstrellas.com para encontrar potenciales jugadores interesados en progresar su carrera futbolística y disfrutar de este gran deporte. ¡Ahora toca ponerse manos a la obra! Utiliza nuestro buscador para encontrar potenciales fichajes para tu equipo, allí podrás filtrar por edad, categoría, aptitudes, etc.¡Mucha suerte en este emocionante camino! Desde el equipo de FuturasEstrellas.com estaremos a vuestra disposición para lo que necesitéis.`,
        html: `<h1 style="text-align:center">¡Bienvenido ${nombreOjeador}!</h1><p style="text-align:center">Agradecemos mucho que hayas decidido unirte a FuturasEstrellas.com para encontrar potenciales jugadores interesados en progresar su carrera futbolística y disfrutar de este gran deporte. <br><br> ¡Ahora toca ponerse manos a la obra! Utiliza nuestro buscador para encontrar potenciales fichajes para tu equipo, allí podrás filtrar por edad, categoría, aptitudes, etc.¡Mucha suerte en este emocionante camino! Desde el equipo de FuturasEstrellas.com estaremos a vuestra disposición para lo que necesitéis.</p>`
      };
      return msg;
}

module.exports = {
    checkPassword,
    parseBodyToArray,
    normalizeName,
    ageDiff,
    sendConfirmationEmailFamily,
    sendConfirmationEmailScout
}