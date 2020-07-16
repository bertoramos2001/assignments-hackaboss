const bd = require("./bd_mock");
const bcrypt = require('bcrypt');
const functions = require('./functions');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');

const databaseFunctions = require('./databaseFunctions');
const database = require("../database");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const showProfile = async (req, res, next) => {
    const email = req.params.email;
    const role = req.params.role;
    let id;

    if (await databaseFunctions.checkUserExists(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    if (role !== 'familia' && role !== 'ojeador') {
        const differentAccountError = new Error(`No existe el tipo de cuenta ${role}`);
        differentAccountError.status = 400;
        next(differentAccountError);
        return;
    }
    if (role === 'ojeador') {
        id = await databaseFunctions.getScoutId(email);
        if (await databaseFunctions.checkScoutCount(email) === 0) {
            const accountTypeError = new Error(`No existe ninguna cuenta registrada como ojeador con este email`);
            accountTypeError.status = 404;
            next(accountTypeError);
            return;
        }
    }
    if (role === 'familia') {
        id = await databaseFunctions.getPlayerId(email);
        if (await databaseFunctions.checkPlayerCount(email) === 0) {
            const accountTypeError = new Error(`No existe ninguna cuenta registrada como familia con este email`);
            accountTypeError.status = 404;
            next(accountTypeError);
            return;
        }
    }

    let responseDTO;
    if (role === 'ojeador') {
        responseDTO = await databaseFunctions.getScout(id);
        
    } else if (role === 'familia') {
        responseDTO = await databaseFunctions.getPlayer(id);
    }

    res.json(responseDTO)
}

const modifyProfileFamily = async (req, res, next) => {
    const { name, surname, nameTutor, surnameTutor, emailTutor, gender, province, birthDate, actualClub, category, position, strongLeg } = req.body;
    const email = req.params.email;
    let id;

    try {
        id = await databaseFunctions.getPlayerId(email);
        if (id === undefined) {
            const accountError = new Error('error al encontrar la cuenta correspondiente al email introducido');
            accountError.status = 400;
            next(accountError);
        }
    } catch(e) {
        const accountError = new Error('ha ocurrido algún error encontrando la cuenta');
        accountError.status = 400;
        console.log(e)
        next(accountError);
    }

    let avatarPerfil = '';

    if (req.file) {
        avatarPerfil = req.file.path;
    }
    if (await databaseFunctions.checkUserExists(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    if (await databaseFunctions.checkPlayerCount(emailTutor) > 0) {
        const duplicateEmailError = new Error('ya existe otra familia registrada con el mismo email');
        duplicateEmailError.status = 400;
        next(duplicateEmailError)
        return;
    }

    if ( !name || !surname || !nameTutor || !surnameTutor || !emailTutor || !gender || !province || !birthDate || !actualClub || !category || !position || !strongLeg) {
        const missingParamsError = new Error('No se han introducido todos los parámetros obligatorios');
        missingParamsError.status = 400;
        next(missingParamsError);
        return;
    }

    if (await databaseFunctions.checkPlayerCount(email) < 1) {
        const accountTypeError = new Error('No existe ninguna cuenta registrada como familia con este email');
        accountTypeError.status = 404;
        next(accountTypeError);
        return;
    }

    let age = functions.ageDiff(birthDate);

    if (age > 18 || isNaN(age)) {
        const invalidParamsError = new Error('el jugador debe ser menor de edad');
        invalidParamsError.status = 400;
        next(invalidParamsError);
        return;
    }

    if (emailTutor !== email) { //esto del envio de email esta comentado porque la version gratuita permite un maximo de 100 emails diarios y haciendo las pruebas superaba estos limites
        // try {
        //     await sgMail.send(functions.createEmailChangeFamily(emailTutor, functions.normalizeName(surname)));
        //     console.log('Message sent');
        // } catch(e) {
        //     const emailError = new Error('error al enviar el email');
        //     emailError.status = 400;
        //     next(emailError);
        // }
        console.log('email enviado')
    }

    const family = {
        'nombreJugador': functions.normalizeName(name),
        'apellidosJugador': functions.normalizeName(surname),
        'nombreTutor': functions.normalizeName(nameTutor),
        'apellidosTutor': functions.normalizeName(surnameTutor),
        'emailTutor': emailTutor,
        'sexo': gender,
        'provincia': province,
        'fechaNacimiento': birthDate,
        'clubActual': actualClub,
        'categoria': category,
        'posicion': position,
        'piernaBuena': strongLeg,
        'avatar': avatarPerfil
    }
    let responseDTO;
    if ( await databaseFunctions.updateProfileFamily(family, id)) {
        responseDTO = {
            'code': 200,
            'description': 'Cuenta de familia actualizada correctamente',
            'rol': 'familia',
            'nombreJugador': functions.normalizeName(name),
            'apellidosJugador': functions.normalizeName(surname),
            'nombreTutor': functions.normalizeName(nameTutor),
            'apellidosTutor': functions.normalizeName(surnameTutor),
            'emailTutor': emailTutor,
            'sexo': gender,
            'provincia': province,
            'fechaNacimiento': birthDate,
            'clubActual': actualClub,
            'categoria': category,
            'posicion': position,
            'piernaBuena': strongLeg,
            'avatar': avatarPerfil
        };
    } else {
        responseDTO = {
            'code': 200,
            'description': 'No se ha podido actualizar la cuenta de familia'
        };
    }

    return res.status(responseDTO.code).json(responseDTO);
}

const modifyProfileScout = async (req, res, next) => {
    const { name, surname, email, gender, province, birthDate, actualClub, category, position, strongLeg } = req.body;
    const emailParams = req.params.email;
    let id;

    try {
        id = await databaseFunctions.getScoutId(emailParams);
        if (id === undefined) {
            const accountError = new Error('error al encontrar la cuenta correspondiente al email introducido');
            accountError.status = 400;
            next(accountError);
        }
    } catch(e) {
        const accountError = new Error('error al encontrar la cuenta correspondiente al email introducido');
        accountError.status = 400;
        next(accountError);
    }

    let avatarPerfil = '';

    if (req.file) {
        avatarPerfil = req.file.path;
    }

    if (await databaseFunctions.checkUserExists(emailParams) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    if (await databaseFunctions.checkScoutCount(email) > 0) {
        const duplicateEmailError = new Error('ya existe otra familia registrada con el mismo email');
        duplicateEmailError.status = 400;
        next(duplicateEmailError)
        return;
    }

    if ( !name || !surname || !email || !gender || !province || !birthDate || !actualClub || !category || !position || !strongLeg) {
        const missingParamsError = new Error('No se han introducido todos los parámetros obligatorios');
        missingParamsError.status = 400;
        next(missingParamsError);
        return;
    }

    if (await databaseFunctions.checkScoutCount(emailParams) < 1) {
        const accountTypeError = new Error('No existe ninguna cuenta registrada como ojeador con este email');
        accountTypeError.status = 404;
        next(accountTypeError);
        return;
    }

    let age = functions.ageDiff(birthDate);

    if (age < 18 || isNaN(age)) {
        const invalidParamsError = new Error('el ojeador debe ser mayor de edad');
        invalidParamsError.status = 400;
        next(invalidParamsError);
        return;
    }

    if (email !== emailParams) { //esto del envio de email esta comentado porque la version gratuita permite un maximo de 100 emails diarios y haciendo las pruebas superaba estos limites
        // try {
        //     await sgMail.send(functions.createEmailChangeScout(email, functions.normalizeName(name)));
        //     console.log('Message sent');
        // } catch(e) {
        //     const emailError = new Error('error al enviar el email');
        //     emailError.status = 400;
        //     next(emailError);
        // }
        console.log('email enviado')
    }

    const scout = {
        'nombre': functions.normalizeName(name),
        'apellidos': functions.normalizeName(surname),
        'email': email,
        'sexo': gender,
        'provincia': province,
        'fechaNacimiento': birthDate,
        'clubActual': actualClub,
        'categoriaBusca': category,
        'posicionBusca': position,
        'piernaBuenaBusca': strongLeg,
        'avatar': avatarPerfil
    }
    let responseDTO;
    if ( await databaseFunctions.updateProfileScout(scout, id)) {
        responseDTO = {
            'code': 200,
            'description': 'Cuenta de familia actualizada correctamente',
            'rol': 'ojeador',
            'nombre': functions.normalizeName(name),
            'apellidos': functions.normalizeName(surname),
            'emailTutor': email,
            'sexo': gender,
            'provincia': province,
            'fechaNacimiento': birthDate,
            'clubActual': actualClub,
            'categoria': category,
            'posicion': position,
            'piernaBuena': strongLeg,
            'avatar': avatarPerfil
        };
    } else {
        responseDTO = {
            'code': 200,
            'description': 'No se ha podido actualizar la cuenta de ojeador'
        };
    }
    return res.status(responseDTO.code).json(responseDTO);
}

const changePassword = async (req, res, next) => {
    const email = req.params.email;
    const role = req.params.role;
    const user = bd.getUser(email);
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!user) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    if (role !== 'familia' && role !== 'ojeador') {
        const differentAccountError = new Error(`No existe el tipo de cuenta ${role}`);
        differentAccountError.status = 400;
        next(differentAccountError);
        return;
    }

    else if (role !== user.role) {
        const accountTypeError = new Error(`No existe ninguna cuenta registrada como ${role} con este email`);
        accountTypeError.status = 404;
        next(accountTypeError);
        return;
    }
    const passwordIsValid = await bcrypt.compare(oldPassword, user.password);  
    if(!passwordIsValid) {
        const passwordInvalidError = new Error('la contraseña no coincide con la exisente en esta cuenta')
        passwordInvalidError.status = 401;
        next(passwordInvalidError)
        return;
    }
    if (functions.checkPassword(newPassword) == false) {
        const invalidPasswordError = new Error('la contraseña debe contener un minimo de 8 caracteres, una mayuscula y un numero');
        invalidPasswordError.status = 400;
        next(invalidPasswordError);
        return;
    }
    if (newPassword != confirmNewPassword) {
        const invalidPasswordError = new Error('las contraseñas no coinciden');
        invalidPasswordError.status = 400;
        next(invalidPasswordError);
        return;
    }
    const passwordBcrypt = await bcrypt.hash(newPassword, 10);

    bd.updatePassword(user, passwordBcrypt);

    console.log(passwordBcrypt)
    console.log(oldPassword)
    res.send();
}

const addExperience = async (req, res, next) => {
    const { email, role } = req.params;
    const { nombreEquipo, anoInicio, anoFin, resumen } = req.body;

    const { authorization } = req.headers;
    const decodedToken = jwt.verify(authorization, process.env.SECRET);
    req.auth = decodedToken;

    if (await databaseFunctions.checkUserExists(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    if (!nombreEquipo || !anoInicio || !anoFin || !resumen ) {
        const invalidParamsError = new Error('Debes rellenar todos los campos para añadir una experiencia');
        invalidParamsError.status = 400;
        next(invalidParamsError);
        return;
    }

    let responseDTO;
    try {
        if (role === 'ojeador') {
            if (await databaseFunctions.saveExperienceScout(nombreEquipo, anoInicio, anoFin, resumen, decodedToken.id)) {
                responseDTO = {
                    'code': 200,
                    'description': 'Experiencia añadida correctamente',
                    'nombreEquipo': nombreEquipo,
                    'anoInicio': anoInicio,
                    'anoFin': anoFin,
                    'resumen': resumen,
                };
            } else {
                responseDTO = {
                    'code': 200,
                    'description': 'No se ha podido añadir la experiencia'
                };
            }
        }
        else if (role === 'familia') {
            if (await databaseFunctions.saveExperiencePlayer(nombreEquipo, anoInicio, anoFin, resumen, decodedToken.id)) {
                responseDTO = {
                    'code': 200,
                    'description': 'Experiencia añadida correctamente',
                    'nombreEquipo': nombreEquipo,
                    'anoInicio': anoInicio,
                    'anoFin': anoFin,
                    'resumen': resumen,
                };
            } else {
                responseDTO = {
                    'code': 200,
                    'description': 'No se ha podido añadir la experiencia'
                };
            }
        }
    } catch(e) {
        const experienceError = new Error('Ha habido algún error añadiendo la experiencia');
        experienceError.status = 400;
        next(experienceError);
        return
    }


    return res.status(responseDTO.code).json(responseDTO);
}

const showExperience = async (req, res, next) => {
    const { email, role } = req.params;
    const user = bd.getUser(email);
    let userId;
    //funcion que comb¡prueba si el usuario existe en la base de datos
    if (await databaseFunctions.checkUserExists(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    //funcion que comprueba que el rol del usuario es familia u ojeador
    if (role !== 'familia' && role !== 'ojeador') {
        const differentAccountError = new Error(`No existe el tipo de cuenta ${role}`);
        differentAccountError.status = 400;
        next(differentAccountError);
        return;
    }
    //dependiendo del tipo de cuenta del usuario, acudimos a una funcion u otra para conseguir su id
    if (role === 'ojeador') {
        userId = await databaseFunctions.getScoutId(email);
    } else if (role === 'familia') {
        userId = await databaseFunctions.getPlayerId(email);
    }

    let responseDTO;
    //dependiendo del tipo de cuenta del usuario, acudimos a una funcion u otra para mostrar las experiencias (ya que no sabemos si el id es de ojeador o de familia a no ser que lo comprobemos)
    try {

        if (role === 'ojeador') {
            responseDTO = await databaseFunctions.showScoutExperiences(userId);
            responseDTO['code'] = 200;
        } else if (role === 'familia') {
            responseDTO = await databaseFunctions.showPlayerExperiences(userId);
            responseDTO['code'] = 200;
        }

    } catch(e) {
        console.log(e)
        const experienceError = new Error('Ha habido algún error mostrando las experiencias');
        experienceError.status = 400;
        next(experienceError);
        return
    }

    return res.status(responseDTO.code).json(responseDTO);
}

const deleteExperience = (req, res, next) => {
    const { idExperiencia, email, role } = req.params;
    const user = bd.getUser(email);

    if (!user) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    if (role !== 'familia' && role !== 'ojeador') {
        const differentAccountError = new Error(`No existe el tipo de cuenta ${role}`);
        differentAccountError.status = 400;
        next(differentAccountError);
        return;
    }

    else if (role !== user.role) {
        const accountTypeError = new Error(`No existe ninguna cuenta registrada como ${role} con este email`);
        accountTypeError.status = 404;
        next(accountTypeError);
        return;
    }

    const experienceToDelete = bd.getExperience(idExperiencia);

    if (!experienceToDelete) {
        const experienceError = new Error(`No existe la experiencia que estas buscando`);
        experienceError.status = 404;
        next(experienceError);
        return;
    }

    if (parseInt(experienceToDelete.id) !== parseInt(user.id)) {
        const experienceError = new Error(`No tienes permiso para borrar una experiencia que no es tuya`);
        experienceError.status = 403;
        next(experienceError);
        return;
    }

    bd.deleteExperience(idExperiencia);
    res.send();
}

module.exports = {
    changePassword,
    modifyProfileFamily,
    modifyProfileScout,
    showProfile,
    showExperience,
    addExperience,
    deleteExperience
}