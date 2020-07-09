const bd = require('./../controllers/bd_mock');
const databaseFunctions = require('./../controllers/databaseFunctions');

require('dotenv').config();
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => { 
    const { authorization } = req. headers;

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        req.auth = decodedToken;
    } catch(e) {
        const authError = new Error('Token no válido');
        authError.status = 401;
        next(authError);  //ejecutamos el middleware de gestion de errores que tenemos en server
    }
    next();
}

const canUpdateProfile = (req, res, next) => {
    const { authorization } = req.headers;
    const { email } = req.params;


    if (databaseFunctions.checkUserExists(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        req.auth = decodedToken;

        if (decodedToken.role === 'ojeador') {
            if(databaseFunctions.checkScoutCount(email) < 1) {
                const authError = new Error('Token no válido1');
                authError.status = 401;
                next(authError);
                return;
            }
        } else if (decodedToken.role === 'familia') {
            if(databaseFunctions.checkPlayerCount(email) < 1) {
                const authError = new Error('Token no válido2');
                authError.status = 401;
                next(authError);
                return;
            }
        }
        if (email !== decodedToken.email) {
            const authError = new Error('Token no válido3');
            authError.status = 401;
            next(authError);
            return;
        }
    } catch(e) {
        const authError = new Error('Token no válido4');
        console.log(e)
        authError.status = 401;
        next(authError);
        return;
    }
    next();
}

const isScout = (req, res, next) => {
    const { authorization } = req. headers;

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        
        if (decodedToken.role !== 'ojeador') {
            const authError = new Error('invalid role');
            authError.status = 401;
            next(authError);
        }
        req.auth = decodedToken;

    } catch(e) {
        const authError = new Error('invalid token');
        authError.status = 401;
        next(authError)
    }
    next();
}

module.exports = {
    canUpdateProfile,
    isAuthenticated,
    isScout
}