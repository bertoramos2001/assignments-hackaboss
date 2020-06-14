//USER FUNCTIONS

//comprobar que la contraseña debe ser mayor de 8 caracteres, debe tener una letra mayuscula y un numero
const checkPassword = (password) => {
    return(password.length >= 8 && password.toLowerCase() !== password && /\d/.test(password))
}

//en el caso de los campos que pueden tener varios valores separados pr comas, meter cada valor en un elemento de un array
const parseBodyToArray = (value) => {
    let result = value.split(',').map(item => item.trim()).filter(item => item.length > 0)

    if (result.length === 1) {
        return result[0];
    } else {
        return result;
    }
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

module.exports = {
    checkPassword,
    parseBodyToArray,
    normalizeName,
    ageDiff
}