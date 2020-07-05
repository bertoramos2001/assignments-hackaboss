-- usuarios (#id, nombre, apellidos, contraseña, direccion, email)
--  reservas (#id, tiempo, codigo_reserva, dia, hora, -id_usuario, -id_encargado)
-- encargados (#id, nombre, apellidos, contraseña, direccion, email, -id_restaurante)
-- restaurantes (#id, nombre, direccion, capacidad_maxima)
-- acompañantes (#id, nombre, apellidos, dni)
-- reserva_acompañante (#id, -id_reserva, id_acompañante)

USE entregaSQL;

SET FOREIGN_KEY_CHECKS = 0;

CREATE  TABLE usuarios (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
	apellidos VARCHAR(50),
    contrasena VARCHAR(40) NOT NULL,
    direccion VARCHAR(40),
    email VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE reservas (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tiempo INT UNSIGNED NOT NULL,
    cogigo_reserva VARCHAR(50),
    dia DATE,
    hora TIME,
    id_usuario INT UNSIGNED,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    id_encargado INT UNSIGNED,
    FOREIGN KEY (id_encargado) REFERENCES encargados(id)
    
);

CREATE TABLE encargados (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
	apellidos VARCHAR(50),
    contrasena VARCHAR(40) NOT NULL,
    direccion VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
	id_restaurante INT UNSIGNED,
    FOREIGN KEY (id_restaurante) REFERENCES restaurantes(id)
    );

CREATE TABLE restaurantes (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    direccion VARCHAR(50),
    capacidad_maxima INT UNSIGNED DEFAULT 0,
);

CREATE TABLE acompanantes (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
	apellidos VARCHAR(50),
    dni VARCHAR(9) UNIQUE
);

CREATE TABLE reserva_acompanante (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT UNSIGNED,
    FOREIGN KEY (id_reserva) REFERENCES reservas(id),
    id_acompanante INT UNSIGNED,
    FOREIGN KEY (id_acompanante) REFERENCES acompanantes(id)
);

SET FOREIGN_KEY_CHECKS = 1;
