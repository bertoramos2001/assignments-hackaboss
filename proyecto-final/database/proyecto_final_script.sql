-- jugadores (#id, rol, nombre_jugador, apellidos_jugador, nombre_tutor, apellidos_tutor, email_tutor, sexo, provincia, fecha_nacimiento, club_actual, contrasena, avatar)
-- ojeadores (#id, nombre, apellidos, email, sexo, provincia, fecha_nacimiento, club_actual, contrasena, avatar)
-- videos (#id, titulo, descripcion, url_video, -id_jugador)
-- contratos (#id, mensaje, email_receptor, -id_ojeador)
-- experiencias (#id, nombre_equipo, ano_inicio, ano_fin, resumen, -id_ojeador, -id_jugador)
-- categorias (#id, -id_usuario, -id_ojeador, categoria)
-- posiciones (#id, -id_usuario, -id_ojeador, posicion)
-- aptitudes (#id, -id_usuario, -id_ojeador, aptitud)
-- jugador_ojeador (#id, -id_jugador, -id_ojeador)


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
    club_actual VARCHAR(20) NOT NULL,
    contrasena VARCHAR(60) NOT NULL,
    avatar VARCHAR(200)
    
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
    club_actual VARCHAR(20) NOT NULL,
    contrasena VARCHAR(60) NOT NULL,
    avatar VARCHAR(200)
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

CREATE TABLE categorias(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	id_ojeador INT UNSIGNED,
    FOREIGN KEY (id_ojeador) REFERENCES ojeadores(id),
	id_jugador INT UNSIGNED,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id),
    categoria VARCHAR(15) NOT NULL
);

CREATE TABLE posiciones (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	id_ojeador INT UNSIGNED,
    FOREIGN KEY (id_ojeador) REFERENCES ojeadores(id),
	id_jugador INT UNSIGNED,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id),
    posicion VARCHAR(15) NOT NULL
);

CREATE TABLE aptitudes (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	id_ojeador INT UNSIGNED,
    FOREIGN KEY (id_ojeador) REFERENCES ojeadores(id),
	id_jugador INT UNSIGNED,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id),
    aptitud VARCHAR(15) NOT NULL
);

CREATE TABLE jugador_ojeador (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	id_ojeador INT UNSIGNED,
    FOREIGN KEY (id_ojeador) REFERENCES ojeadores(id),
	id_jugador INT UNSIGNED,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id)
);

SET FOREIGN_KEY_CHECKS = 1;
