const bd = require("./bd_mock");
const functions = require('./functions');

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

const modifyProfileFamily = (req, res, next) => {
    const { namePlayer, surnamePlayer, nameTutor, surnameTutor, emailTutor, gender, province, birthDate, actualClub, category, positions, skills } = req.body;
    const email = req.params.email;
    const user = bd.getUser(email); 

    if (!user) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    if ( !namePlayer || !surnamePlayer || !nameTutor || !surnameTutor || !emailTutor || !gender || !province || !birthDate || !actualClub || !category || !positions || !skills) {
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

    bd.updateProfileFamily(user, functions.normalizeName(namePlayer), functions.normalizeName(surnamePlayer), functions.normalizeName(nameTutor), functions.normalizeName(surnameTutor), emailTutor, gender, province, birthDate, actualClub, category, functions.parseBodyToArray(positions), functions.parseBodyToArray(skills));

    res.json(user);
}

const modifyProfileScout = (req, res, next) => {
    const { name, surname, email, gender, province, birthDate, actualClub, categories, positions, skills } = req.body;
    const emailParams = req.params.email;
    const user = bd.getUser(emailParams);

    if (!user) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    if ( !name || !surname || !email || !gender || !province || !birthDate || !actualClub || !categories || !positions || !skills) {
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

    bd.updateProfileScout(user, functions.normalizeName(name), functions.normalizeName(surname), email, gender, province, birthDate, actualClub, functions.parseBodyToArray(categories), functions.parseBodyToArray(positions), functions.parseBodyToArray(skills));

    res.json(user)
}

module.exports = {
    modifyProfileFamily,
    modifyProfileScout,
    showProfile
}