const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const bd = require('./bd_mock');   //empleamos un archivo de js temporalmente como si fuera la base de datos
const functions = require('./functions')

const registerScout = async (req, res, next) => {
    //recoger los datos de registro
    const { name, surname, email, gender, province, birthDate, actualClub, category, positions, skills, password, confirmPassword } = req.body;

    //comprobar que son validos los datos que dan en el registro
    if ( !name || !surname || !email || !gender || !province || !birthDate || !actualClub || !category || !positions || !skills || !password || !confirmPassword) {
        const missingParamsError = new Error('No se han introducido todos los parámetros obligatorios');
        missingParamsError.status = 400;
        next(missingParamsError);
        return;
    }

    let avatarPerfil = '';

    if (!req.file) {
        const profileImageError = new Error('Debes añadir una foto de perfil');
        profileImageError.status = 400;
        next(profileImageError);
    } else {
        avatarPerfil = req.file.path;
    }

    //calculamos la edad del ojeador
    let age = functions.ageDiff(new Date(birthDate), new Date());

    //si el ojeador es menor de edad, mete un email no válido, las contraseñas no coinciden o la contraseña no es válida, error
    if (isNaN(age) || age < 18) {
        const invalidParamsError = new Error('el ojeador debe ser mayor de edad');
        invalidParamsError.status = 400;
        next(invalidParamsError);
        return;
    }
    if (!validator.isEmail(email)) {
        const invalidEmailError = new Error('el email introducido no es valido');
        invalidEmailError.status = 400;
        next(invalidEmailError);
        return;
    }
    if (functions.checkPassword(password) == false) {
        const invalidPasswordError = new Error('la contraseña debe contener un minimo de 8 caracteres, una mayuscula y un numero');
        invalidPasswordError.status = 400;
        next(invalidPasswordError);
        return;
    }
    if (password != confirmPassword) {
        const invalidPasswordError = new Error('las contraseñas no coinciden');
        invalidPasswordError.status = 400;
        next(invalidPasswordError);
        return;
    }

    //si ya existe otro usuario registrado con ese email, error
    if (bd.getUser(email)) {
        const userError = new Error('ya existe otro usuario con el mismo email');
        userError.status = 409;
        next(userError)
        return;
    }

    //encriptar la password(para no almacenarla en texto claro)
    const passwordBcrypt = await bcrypt.hash(password, 10);
    //almacenar datos
    bd.saveScout(email, passwordBcrypt, 'ojeador', functions.normalizeName(name), functions.normalizeName(surname), gender, province, birthDate, actualClub, functions.parseBodyToArray(category), functions.parseBodyToArray(positions), functions.parseBodyToArray(skills), avatarPerfil);

    //enviar email confirmación
    // try {
    //     await sgMail.send(functions.sendConfirmationEmailScout(email, functions.normalizeName(name)));
    //     console.log('Message sent');
    // } catch(e) {
    //     console.log(e.response.body)
    //     const emailError = new Error('error al enviar el email');
    //     emailError.status = 400;
    //     next(emailError);
    // }
    console.log('email enviado')
    //res.send();
    res.json(req.file)
}

const registerFamily = async (req, res, next) => {
    //recoger los datos de registro
    const { name, surname, nameTutor, surnameTutor, emailTutor, gender, province, birthDate, actualClub, category, positions, skills, password, confirmPassword } = req.body;
    
    //comprobar que los datos de registo son válidos
    if ( !name || !surname || !nameTutor || !surnameTutor || !emailTutor || !gender || !province || !birthDate || !actualClub || !category || !positions || !skills || !password || !confirmPassword) {
        const missingParamsError = new Error('No se han introducido todos los parámetros obligatorios');
        missingParamsError.status = 400;
        next(missingParamsError);
        return;
    }

    let avatarPerfil = '';

    if (!req.file) {
        const profileImageError = new Error('Debes añadir una foto de perfil');
        profileImageError.status = 400;
        next(profileImageError);
    } else {
        avatarPerfil = req.file.path;
    }

     //calculamos la edad del jugador
    let age = functions.ageDiff(new Date(birthDate), new Date());

    //si el jugador es mayor de edad, mete un email no válido, las contraseñas no coinciden o la contraseña no es válida, error
    if (age > 18 || isNaN(age)) {
        const invalidParamsError = new Error('el jugador debe ser menor de edad');
        invalidParamsError.status = 400;
        next(invalidParamsError);
        return;
    }

    if (!validator.isEmail(emailTutor)) {
        const invalidEmailError = new Error('el email introducido no es valido');
        invalidEmailError.status = 400;
        next(invalidEmailError);
        return;
    }

    if (functions.checkPassword(password) == false) {
        const invalidPasswordError = new Error('la contraseña debe contener un minimo de 8 caracteres, una mayuscula y un numero');
        invalidPasswordError.status = 400;
        next(invalidPasswordError);
        return;
    }

    if (password != confirmPassword) {
        const invalidPasswordError = new Error('las contraseñas no coinciden');
        invalidPasswordError.status = 400;
        next(invalidPasswordError);
        return;
    }

    //si ya existe otro usuario registrado con ese email, error
    if (bd.getUser(emailTutor)) {
        const userError = new Error('ya existe otro usuario con el mismo email');
        userError.status = 409;
        next(userError)
        return;
    }

     //encriptar la password(para no almacenarla en texto claro)
    const passwordBcrypt = await bcrypt.hash(password, 10);
    //almacenar los datos
    bd.saveFamily(emailTutor, passwordBcrypt, 'familia', functions.normalizeName(name), functions.normalizeName(surname), functions.normalizeName(nameTutor), functions.normalizeName(surnameTutor), gender, province, birthDate, actualClub, functions.parseBodyToArray(category), functions.parseBodyToArray(positions), functions.parseBodyToArray(skills), avatarPerfil);

    //enviar email confirmación
    // try {
    //     await sgMail.send(functions.sendConfirmationEmailFamily(emailTutor, functions.normalizeName(surname)));
    //     console.log('Message sent');
    // } catch(e) {
    //     console.log(e.response.body)
    //     const emailError = new Error('error al enviar el email');
    //     emailError.status = 400;
    //     next(emailError);
    // }
    console.log('email enviado')
    //res.send();
    res.json(req.file)
}

const login = async (req, res, next) => {
    const {email, password} = req.body;

    //buscar email en bbdd (si no existe, dar un error)
    const user = bd.getUser(email);

    if (!user) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    //comprobar password(si no coinciden, dar un error)
    const passwordIsValid = await bcrypt.compare(password, user.password);  
    if(!passwordIsValid) {
        const passwordInvalidError = new Error('la contraseña no es válida')
        passwordInvalidError.status = 401;
        next(passwordInvalidError)
        return;
    }
    
    const tokenPayload = {
        id: user.id,
        role: user.role,
        email:user.email
    }
    const token = jwt.sign(tokenPayload, process.env.SECRET, { 
        expiresIn: '1d' //el token caduca en 1 dia
    });

    res.json({
        token
    })
}

const searchUsers = (req, res) => {
    const nombre = req.query['nombre'];
    const apellido = req.query['apellido'];
    const genero = req.query['genero'];
    const rol = req.query['rol'];
    const provincia = req.query['provincia'];
    const edadMinima = req.query['edadMinima'];
    const edadMaxima = req.query['edadMaxima'];
    const posicion = req.query['posicion'];
    const categoria = req.query['categoria'];
    const skills = req.query['skills'];
    let listaUsuarios = bd.readList();

    if ( nombre ) { //si existe nombre
        listaUsuarios = listaUsuarios.filter( usuario => (((usuario.name).trim()).toLowerCase()).replace(' ', '-') === nombre);
    }
    if ( apellido ) {
        listaUsuarios = listaUsuarios.filter( usuario => (((usuario.surname).trim()).toLowerCase()).replace(' ', '-') === apellido);
    }
    if ( genero ) {
        listaUsuarios = listaUsuarios.filter( usuario => usuario.gender === genero);
    }
    if ( rol ) {
        listaUsuarios = listaUsuarios.filter( usuario => usuario.role === rol);
    }
    if ( provincia ) {
        listaUsuarios = listaUsuarios.filter( usuario => (usuario.province).toLowerCase() === provincia);
    }
    if ( edadMinima ) {
        listaUsuarios = listaUsuarios.filter( usuario => parseInt(functions.ageDiff(new Date(usuario.birthDate), new Date())) >= parseInt(edadMinima));
    }
    if ( edadMaxima ) {
        listaUsuarios = listaUsuarios.filter( usuario => parseInt(functions.ageDiff(new Date(usuario.birthDate), new Date())) <= parseInt(edadMaxima));
    }
    if ( posicion ) { //teniendo en cuenta que posicion puede o no ser un array (dependiendo del numero de filtros que pase el usuario) y que lista de usuarios también, hice un bucle anidado
        listaUsuarios = listaUsuarios.filter( usuario => {
            if (Array.isArray(posicion)) {
                let count = 0;
                for ( let i = 0; i < (usuario.positions).length; i++ ) {
                    for ( let j = 0; j < posicion.length; j++) {
                        if (((((usuario.positions[i]).trim()).toLowerCase()).replace(' ','-')) === posicion[j]) {
                            count++;
                        }
                    }
                }
                return (count > 0);
            } else {
                let count = 0;
                for ( let i = 0; i < (usuario.positions).length; i++ ) {
                    if (((((usuario.positions[i]).trim()).toLowerCase()).replace(' ','-')) === posicion) {
                        count++;
                    }
                }
                return (count > 0);
            }
        })
    }
    if ( skills ) { //teniendo en cuenta que skills puede o no ser un array (dependiendo del numero de filtros que pase el usuario) y que lista de usuarios también, hice un bucle anidado
        listaUsuarios = listaUsuarios.filter( usuario => {
            if (Array.isArray(skills)) {
                let count = 0;
                for ( let i = 0; i < (usuario.skills).length; i++ ) {
                    for ( let j = 0; j < skills.length; j++) {
                        if (((((usuario.skills[i]).trim()).toLowerCase()).replace(' ','-')) === skills[j]) {
                            count++;
                        }
                    }
                }
                return (count > 0);
            } else {
                let count = 0;
                for ( let i = 0; i < (usuario.skills).length; i++ ) {
                    if (((((usuario.skills[i]).trim()).toLowerCase()).replace(' ','-')) === skills) {
                        count++;
                    }
                }
                return (count > 0);
            }
        })
    }
    if (categoria) { //teniendo en cuenta que categoria puede o no ser un array (dependiendo del numero de filtros que pase el usuario) y que lista de usuarios también, hice un bucle anidado
        listaUsuarios = listaUsuarios.filter( usuario => {
            if (Array.isArray(categoria)) {
                let count = 0;
                for ( let i = 0; i < (usuario.category).length; i++ ) {
                    for ( let j = 0; j < categoria.length; j++) {
                        if (((((usuario.category[i]).trim()).toLowerCase()).replace(' ','-')) === categoria[j]) {
                            count++;
                        }
                    }
                }
                return (count > 0);
            } else {
                let count = 0;
                for ( let i = 0; i < (usuario.category).length; i++ ) {
                    if (((((usuario.category[i]).trim()).toLowerCase()).replace(' ','-')) === categoria) {
                        count++;
                    }
                }
                return (count > 0);
            }
        })
    }

    res.json(listaUsuarios);
}
module.exports = {
    login,
    registerFamily,
    registerScout,
    searchUsers
}
