const bd = require("./bd_mock");
const bcrypt = require('bcrypt');
const functions = require('./functions');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const showProfile = (req, res, next) => {
    const email = req.params.email;
    const role = req.params.role;
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

    res.json(user)
}

const modifyProfileFamily = async (req, res, next) => {
    const { name, surname, nameTutor, surnameTutor, emailTutor, gender, province, birthDate, actualClub, category, positions, skills } = req.body;
    const email = req.params.email;
    const user = bd.getUser(email); 

    let avatarPerfil = '';

    if (!req.file) {
        const profileImageError = new Error('Debes añadir una foto de perfil');
        profileImageError.status = 400;
        next(profileImageError);
    } else {
        avatarPerfil = req.file.path;
    }

    if (!user) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    if ( !name || !surname || !nameTutor || !surnameTutor || !emailTutor || !gender || !province || !birthDate || !actualClub || !category || !positions || !skills) {
        const missingParamsError = new Error('No se han introducido todos los parámetros obligatorios');
        missingParamsError.status = 400;
        next(missingParamsError);
        return;
    }

    if (user.role === 'ojeador') {
        const accountTypeError = new Error('No existe ninguna cuenta registrada como ojeador con este email');
        accountTypeError.status = 404;
        next(accountTypeError);
        return;
    }

    let age = functions.ageDiff(new Date(birthDate), new Date());

    if (age > 18 || isNaN(age)) {
        const invalidParamsError = new Error('el jugador debe ser menor de edad');
        invalidParamsError.status = 400;
        next(invalidParamsError);
        return;
    }

    if (emailTutor !== email) {
        // try {
        //     await sgMail.send(functions.sendEmailChangeFamily(emailTutor, functions.normalizeName(surname)));
        //     console.log('Message sent');
        // } catch(e) {
        //     const emailError = new Error('error al enviar el email');
        //     emailError.status = 400;
        //     next(emailError);
        // }
        console.log('email enviado')
    }

    bd.updateProfileFamily(user, functions.normalizeName(name), functions.normalizeName(surname), functions.normalizeName(nameTutor), functions.normalizeName(surnameTutor), emailTutor, gender, province, birthDate, actualClub, category, functions.parseBodyToArray(positions), functions.parseBodyToArray(skills), avatarPerfil);

    res.send();
}

const modifyProfileScout = async (req, res, next) => {
    const { name, surname, email, gender, province, birthDate, actualClub, category, positions, skills } = req.body;
    const emailParams = req.params.email;
    const user = bd.getUser(emailParams);

    let avatarPerfil = '';

    if (!req.file) {
        const profileImageError = new Error('Debes añadir una foto de perfil');
        profileImageError.status = 400;
        next(profileImageError);
    } else {
        avatarPerfil = req.file.path;
    }

    if (!user) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    if ( !name || !surname || !email || !gender || !province || !birthDate || !actualClub || !category || !positions || !skills) {
        const missingParamsError = new Error('No se han introducido todos los parámetros obligatorios');
        missingParamsError.status = 400;
        next(missingParamsError);
        return;
    }

    if (user.role === 'familia') {
        const accountTypeError = new Error('No existe ninguna cuenta registrada como familia con este email');
        accountTypeError.status = 404;
        next(accountTypeError);
        return;
    }

    let age = functions.ageDiff(new Date(birthDate), new Date());

    if (age < 18 || isNaN(age)) {
        const invalidParamsError = new Error('el ojeador debe ser mayor de edad');
        invalidParamsError.status = 400;
        next(invalidParamsError);
        return;
    }

    if (email !== emailParams) {
        // try {
        //     await sgMail.send(functions.sendEmailChangeScout(email, functions.normalizeName(name)));
        //     console.log('Message sent');
        // } catch(e) {
        //     const emailError = new Error('error al enviar el email');
        //     emailError.status = 400;
        //     next(emailError);
        // }
        console.log('email enviado')
    }

    bd.updateProfileScout(user, functions.normalizeName(name), functions.normalizeName(surname), email, gender, province, birthDate, actualClub, functions.parseBodyToArray(category), functions.parseBodyToArray(positions), functions.parseBodyToArray(skills), avatarPerfil);

    res.send()
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

const addExperience = (req, res, next) => {
    const { email } = req.params;
    const { nombreEquipo, anoInicio, anoFin, resumen } = req.body;
    const user = bd.getUser(email);

    if (!user) {
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
    const id = user.id;

    bd.saveExperience(id, nombreEquipo, anoInicio, anoFin, resumen);

    res.send();

}

const showExperience = (req, res, next) => {
    const { email, role } = req.params;
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

    res.json(bd.getListOfExperiences(user.id));
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