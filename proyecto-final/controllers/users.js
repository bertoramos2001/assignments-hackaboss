const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    //almacenar datos
    bd.saveScout(email, passwordBcrypt, 'scout', functions.normalizeName(name), functions.normalizeName(surname), gender, province, birthDate, actualClub, functions.parseBodyToArray(categories), functions.parseBodyToArray(positions), functions.parseBodyToArray(skills));

    //enviar email confirmación
    try {
        await sgMail.send(functions.sendConfirmationEmailScout(email, functions.normalizeName(name)));
        console.log('Message sent');
    } catch(e) {
        console.log(e.response.body)
    }
    res.send()
}
const listUsers = (req, res) => {
    res.json(bd.getListOfUsers());
}

const registerFamily = async (req, res) => {
    //recoger los datos de registro
    const { namePlayer, surnamePlayer, nameTutor, surnameTutor, emailTutor, gender, province, birthDate, actualClub, category, positions, skills, password, confirmPassword } = req.body;
    
    //comprobar que los datos de registo son válidos
    if ( !namePlayer || !surnamePlayer || !nameTutor || !surnameTutor || !emailTutor || !gender || !province || !birthDate || !actualClub || !category || !positions || !skills || !password || !confirmPassword) {
        res.status(400).send();
        return;
    }

     //calculamos la edad del jugador
    let age = functions.ageDiff(new Date(birthDate), new Date());

    //si el jugador es mayor de edad, mete un email no válido, las contraseñas no coinciden o la contraseña no es válida, error
    if (age > 18 || isNaN(age) || !validator.isEmail(emailTutor) || password != confirmPassword || functions.checkPassword(password) == false) {
        res.status(400).send();
        return;
    }

     //encriptar la password(para no almacenarla en texto claro)
    const passwordBcrypt = await bcrypt.hash(password, 10);
    //almacenar los datos
    bd.saveFamily(emailTutor, passwordBcrypt, 'family', functions.normalizeName(namePlayer), functions.normalizeName(surnamePlayer), functions.normalizeName(nameTutor), functions.normalizeName(surnameTutor), gender, province, birthDate, actualClub, category, functions.parseBodyToArray(positions), functions.parseBodyToArray(skills));

    //enviar email confirmación
    try {
        await sgMail.send(functions.sendConfirmationEmailFamily(emailTutor, functions.normalizeName(surnamePlayer)));
        console.log('Message sent');
    } catch(e) {
        console.log(e.response.body)
    }
    res.send();
}

const login = async (req, res) => {
    const {email, password} = req.body;

    //buscar email en bbdd (si no existe, dar un error)
    const user = bd.getUser(email);

    if (!user) {
        res.status(404).send();
        return;
    }

    //comprobar password(si no coinciden, dar un error)
    const passwordIsValid = await bcrypt.compare(password, user.password);  
    console.log(passwordIsValid)
    if(!passwordIsValid) {
        res.status(401).send();
        return;
    }
    
    const tokenPayload = {
        id: user.email,
        role: user.role
    }
    const token = jwt.sign(tokenPayload, process.env.SECRET, { 
        expiresIn: '1d' //el token caduca en 1 dia
    });

    res.json({
        token
    })

}

module.exports = {
    registerScout,
    listUsers,
    registerFamily,
    login
}
