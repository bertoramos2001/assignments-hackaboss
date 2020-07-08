-- jugadores (#id, rol, nombre_jugador, apellidos_jugador, nombre_tutor, apellidos_tutor, email_tutor, sexo, provincia, fecha_nacimiento, club_actual, contrasena, avatar)
-- ojeadores (#id, nombre, apellidos, email, sexo, provincia, fecha_nacimiento, club_actual, contrasena, avatar)
-- videos (#id, titulo, descripcion, url_video, -id_jugador)
-- contratos (#id, mensaje, email_receptor, -id_ojeador)
-- experiencias (#id, nombre_equipo, ano_inicio, ano_fin, resumen, -id_ojeador, -id_jugador)
-- categorias (#id, -id_usuario, -id_ojeador, categoria)
-- posiciones (#id, -id_usuario, -id_ojeador, posicion)
-- aptitudes (#id, -id_usuario, -id_ojeador, aptitud)
-- jugador_ojeador (#id, -id_jugador, -id_ojeador)


SELECT * FROM ojeadores;
DELETE FROM jugadores WHERE sexo='male';
SELECT id FROM jugadores WHERE email_tutor='randomexample@gmail.com';
SELECT COUNT(*) FROM jugadores WHERE email_tutor='randomexample@gmail.com' UNION SELECT COUNT(*) FROM ojeadores WHERE email='randomexample@gmail.com';
SELECT COUNT(*) FROM jugadores WHERE email_tutor='randomexample@gmail.com';
SELECT COUNT(*) FROM jugadores JUG, ojeadores OJ WHERE JUG.email_tutor='examplerandom@gmail.com' OR OJ.email='examplerandom@gmail.com';
SELECT id FROM jugadores JUG, ojeadores OJ WHERE JUG.email_tutor = ? AND JUG.contrasena = ? OR OJ.email = ? AND OJ.contrasena = ?;

USE proyectoHAB;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE jugadores (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(7),
    nombre_jugador VARCHAR(50) NOT NULL,
    apellidos_jugador VARCHAR(50) NOT NULL,
    nombre_tutor VARCHAR(50) NOT NULL,
    apellidos_tutor VARCHAR(50) NOT NULL,
    email_tutor VARCHAR(50) UNIQUE NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    provincia VARCHAR(20) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    club_actual VARCHAR(50) NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    posicion_principal VARCHAR(30) NOT NULL,
    pierna_buena VARCHAR(10) NOT NULL,
    avatar VARCHAR(200),
    contrasena VARCHAR(200) NOT NULL
    
);

CREATE TABLE ojeadores (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(7),
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    provincia VARCHAR(20) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    club_actual VARCHAR(50) NOT NULL,
	categoria_busca VARCHAR(20) NOT NULL,
    posicion_principal_busca VARCHAR(30) NOT NULL,
    pierna_buena_busca VARCHAR(10) NOT NULL,
    avatar VARCHAR(200),
	contrasena VARCHAR(200) NOT NULL
);

CREATE TABLE videos (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    url_video VARCHAR(200) NOT NULL,
    id_jugador INT UNSIGNED,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id)
);

CREATE TABLE contratos(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    mensaje TEXT NOT NULL,
    email_receptor VARCHAR(50),
    id_ojeador INT UNSIGNED,
    FOREIGN KEY (id_ojeador) REFERENCES ojeadores(id)
);

CREATE TABLE experiencias(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_equipo VARCHAR(50) NOT NULL,
    ano_inicio SMALLINT UNSIGNED NOT NULL,
    ano_fin SMALLINT UNSIGNED NOT NULL,
    resumen TEXT NOT NULL,
	id_ojeador INT UNSIGNED,
    FOREIGN KEY (id_ojeador) REFERENCES ojeadores(id),
	id_jugador INT UNSIGNED,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id)
);

CREATE TABLE jugador_ojeador (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    rating TINYINT UNSIGNED,
	id_ojeador INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_ojeador) REFERENCES ojeadores(id),
	id_jugador INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id)
);

SET FOREIGN_KEY_CHECKS = 1;
