const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const bd = require('./bd_mock');   //empleamos un archivo de js temporalmente como si fuera la base de datos
const functions = require('./functions')

const registerScout = async (req, res) => {
    //recoger los datos de registro
    const { name, surname, email, gender, province, birthDate, actualClub, categories, positions, skills, password, confirmPassword } = req.body;

    //comprobar que son validos los datos que dan en el registro
    if ( !name || !surname || !email || !gender || !province || !birthDate || !actualClub || !categories || !positions || !skills || !password || !confirmPassword) {
        res.status(400).send();
        return;
    }
    //calculamos la edad del ojeador
    let age = functions.ageDiff(new Date(birthDate), new Date());
    console.log(age)
    //si el ojeador es menor de edad, mete un email no válido, las contraseñas no coinciden o la contraseña no es válida, error
    if (isNaN(age) || age < 18 || !validator.isEmail(email) || password != confirmPassword || functions.checkPassword(password) == false) {
        res.status(400).send();
        return;
    }
    //si ya existe otro usuario registrado con ese email, error
    if (bd.getUser(email)) {
        res.status(409).send();
        return;
    }
    //encriptar la password(para no almacenarla en texto claro)
    const passwordBcrypt = await bcrypt.hash(password, 10);
    //almacenar datos (email, passwordBcrypt y rol)
    bd.saveUser(email, passwordBcrypt, 'scout', functions.normalizeName(name), functions.normalizeName(surname), gender, province, birthDate, actualClub, functions.parseBodyToArray(categories), functions.parseBodyToArray(positions), functions.parseBodyToArray(skills));

    res.send()
}
const listUsers = (req, res) => {
    res.json(bd.getListOfUsers());
}

// const registerFamily = (req, res) => {

// }





module.exports = {
    registerScout,
    listUsers
}
// module.exports = {
//     login,
//     registerFamily,
//     registerScout
// }
