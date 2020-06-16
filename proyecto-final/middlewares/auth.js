const bd = require('./../controllers/bd_mock')

require('dotenv').config();
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => { 
    const { authorization } = req. headers;

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        req.auth = decodedToken;
    } catch(e) {
        const authError = new Error('invalid token');
        authError.status = 401;
        next(authError);  //ejecutamos el middleware de gestion de errores que tenemos en server
    }
    next();
}

const canUpdateProfile = (req, res, next) => {
    const { authorization } = req. headers;
    const { email } = req.params;
    const user = bd.getUser(email);

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        if (user.id === decodedToken.id) {
            req.auth = decodedToken;
        }
    } catch(e) {
        const authError = new Error('invalid token');
        authError.status = 401;
        next(authError);  //ejecutamos el middleware de gestion de errores que tenemos en server
    }
    next();

}

module.exports = {
    canUpdateProfile,
    isAuthenticated
}