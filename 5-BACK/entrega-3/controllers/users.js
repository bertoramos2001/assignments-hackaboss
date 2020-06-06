const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bd = require('./bd_mock');


const login = async (req,res) => {
    const { email, password } = req.body;

    //buscar email en bbdd (en este caso solo tenemos el usuario por defecto, además, no podemos añadir nuevos usuarios)
    const user = bd.getUser(email);

    if(!user) {  //si el email introducido no es el del usuario por defecto, error 404
        res.status(404).send();
        return;
    }

    //NOTA: la contraseña es 1234
    const passwordIsValid = bcrypt.compare(password, user.hashedPassword); //hace el hash de la contraseña metida por el usuario y la compara con la ya hasheada en la bd
    if(!passwordIsValid) {
        res.status(401).send(); //si la contraseña no es valida, error 401
        return;
    }
    const tokenPayload = {
        id: user.id,
        role: user.role
    }
    const token = jwt.sign(tokenPayload, process.env.SECRET, { 
        expiresIn: '1d' 
    });
    res.json({
        token
    })
}


module.exports = {
    login
}