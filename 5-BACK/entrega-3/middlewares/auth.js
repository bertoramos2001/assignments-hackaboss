require('dotenv').config();
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => { 
    const { authorization } = req. headers; //el objeto req.headers extrae el campo authorization

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        req.auth = decodedToken;
    } catch(e) {
        const authError = new Error('invalid token');
        authError.status = 401;
        next(authError);
    }
    next();
}

module.exports = {
    isAuthenticated
}
