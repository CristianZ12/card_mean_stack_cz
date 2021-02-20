-- Crear Base de Datos
CREATE DATABASE card_mean_stack_cristian_zamora_1 WITH OWNER cristian12t;

-- Asignarle todos los privilegios a la Base de Datos
GRANT ALL PRIVILEGES ON DATABASE card_mean_stack_cristian_zamora_1 TO cristian12t;

--Crear Table Card
CREATE TABLE Card1 (
    idCard SERIAL,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    numTargeta VARCHAR(200) NOT NULL,
    cvTarget INTEGER NOT NULL,
    typeT INTEGER NOT NULL,
    colorT INTEGER NOT NULL,
    dateExp TIMESTAMP NOT NULL
);

ALTER TABLE Card1
    ADD CONSTRAINT card1_primary_key PRIMARY KEY(idCard);

ALTER TABLE Card1
    ADD CONSTRAINT card1_numT_UK UNIQUE(numTargeta);

-- Describir Tablas
-- /d+ Card1;