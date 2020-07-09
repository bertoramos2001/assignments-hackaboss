const database = require('../database.js');

//obtener el id del usuario
const getIdUser = async (email) => {
    const sql = `SELECT id FROM jugadores WHERE email_tutor=${email}`;
    const connection = await database.connection();
    await connection.execute(sql, [email]);

}

//obtener todos los datos del ojeador
const getScout = async (email) => {
    const sql = 'SELECT rol, nombre, apellidos, email, sexo, provincia, fecha_nacimiento, club_actual, categoria_busca, posicion_principal_busca, pierna_buena_busca, avatar FROM ojeadores WHERE email=?';
    const connection = await database.connection();
    let [rows] = await connection.execute(sql, [email]);
    rows[0]['code'] = 200;
    rows[0]['description'] = 'ojeador encontrado correctamente';

    return(rows[0]);
}

//obtener todos los datos de la familia
const getPlayer = async (email) => {
    const sql = 'SELECT rol, nombre_jugador, apellidos_jugador, nombre_tutor, apellidos_tutor, email_tutor, sexo, provincia, fecha_nacimiento, club_actual, categoria, posicion_principal, pierna_buena, avatar FROM jugadores WHERE email_tutor=?';
    const connection = await database.connection();
    let [rows] = await connection.execute(sql, [email]);
    rows[0]['code'] = 200;
    rows[0]['description'] = 'familia encontrada correctamente';

    return(rows[0]);
}

//comprobamos que el usuario existe tanto en la tabla de jugadores como en la de ojeadores
const checkUserExists = async (email) => {
    const sql = 'SELECT COUNT(*) FROM jugadores JUG, ojeadores OJ WHERE JUG.email_tutor = ? OR OJ.email = ?';
    const connection = await database.connection();
    const [rows] = await connection.execute(sql, [email, email]);

    return (rows[0]['COUNT(*)']);
}

//tanto login scout como login family llaman a esta funcion, la cual dependiendo del rol del usuario, intentará el login en la tabla de jugadores o en la de ojeadores
const login = async (email, password, rol) => {
    let sql = '';
    if (rol === 'familia') {
        sql = 'SELECT id FROM jugadores WHERE email_tutor = ? AND contrasena = SHA1(?)';
    } else if (rol === 'ojeador') {
        sql = 'SELECT id FROM ojeadores WHERE email = ? AND contrasena = SHA1(?)'
    }
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [email, password]);
        let description;
        if (!rows[0]) {
            description = 'Usuario/contraseña incorrectos';
        } else {
            description = 'Login correcto';
        }

        let responseDTO = {
            'code': 200,
            'description': description,
        };

        if (rows[0]) {
            responseDTO['id'] = rows[0].id;
            responseDTO['rol'] = rol;
            responseDTO['email'] = email;
        }

        return responseDTO;
    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        };
    }
}

//comprobamos cuantos jugadores hay registrados con ese mismo email
const checkPlayerCount = async (email) => {
    const sql = 'SELECT COUNT(*) FROM jugadores WHERE email_tutor = ?';
    const connection = await database.connection();
    const [rows] = await connection.execute(sql, [email]);

    return (rows[0]['COUNT(*)']);
}

//comprobamos cuantos ojeadores hay registrados con ese mismo email
const checkScoutCount = async (email) => {
    const sql = 'SELECT COUNT(*) FROM ojeadores WHERE email=?';
    const connection = await database.connection();
    const [rows] = await connection.execute(sql, [email]);

    return (rows[0]['COUNT(*)']);
}

//guardamos la familia en la tabla de jugadores
const saveFamily = async (family) => {
    const sql = 'INSERT INTO jugadores (rol, nombre_jugador, apellidos_jugador, nombre_tutor, apellidos_tutor, email_tutor, sexo, provincia, fecha_nacimiento, club_actual, categoria, posicion_principal, pierna_buena,avatar, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, SHA1(?))'
    const connection = await database.connection();
    await connection.execute(sql, Object.values(family));

    return true;
}

//guardamos el ojeador en la tabla de ojeadores
const saveScout = async (scout) => {
    const sql = 'INSERT INTO ojeadores (rol, nombre, apellidos, email, sexo, provincia, fecha_nacimiento, club_actual, categoria_busca, posicion_principal_busca, pierna_buena_busca, avatar, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, SHA1(?))'
    const connection = await database.connection();
    await connection.execute(sql, Object.values(scout));

    return true;
}




module.exports = {
    checkPlayerCount,
    checkScoutCount,
    checkUserExists,
    getIdUser,
    getPlayer,
    getScout,
    login,
    saveFamily,
    saveScout
}
