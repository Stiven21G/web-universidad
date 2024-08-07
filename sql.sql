drop database  if exists proyectos;
CREATE DATABASE proyectos;
use proyectos;
CREATE TABLE estudiantes(
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    nombres varchar(255) NOT NULL,
    apellidos varchar(255) NOT NULL,
    correo varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

insert into estudiantes (id,nombres,apellidos,correo,password) values(
UUID_TO_BIN(UUID()),'Uriel Stiven','Garzon Arguello', 'usg200208@gmail.com','123456'
);

select*from estudiantes;
