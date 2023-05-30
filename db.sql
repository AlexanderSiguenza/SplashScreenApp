-- Crear la base de datos "clinica"
CREATE DATABASE clinica;

-- Usar la base de datos "clinica"
USE clinica;

-- Crear la tabla "users"
CREATE TABLE users (
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Insertar los registros en la tabla "users"
INSERT INTO users (email, password) VALUES
('johndoe@example.com', '5F78#hK3a$D2@Q1!'),
('janedoe@example.com', '7G9@iL#6F1$P4zE*'),
('alexsmith@example.com', '2M4@pN#5G8!W7aR*'),
('sarahjones@example.com', '9L5$zE#6Q7*M3@pN'),
('michaelbrown@example.com', '4K8@pJ!7D5$G9#iL'),
('emilywilson@example.com', '1Q4$pK@7G3*L9#iL'),
('davidthomas@example.com', '8M3$zR#6Q2@K7!iL'),
('jessicawilliams@example.com', '6D9#jL7!N4@R5zE*'),
('matthewjohnson@example.com', '3A6!hK2@L7$P9#zE'),
('olivertaylor@example.com', '7Q3$gM#9R6@P2!kL'),
('ameliajackson@example.com', '4D5@fK#8J3$H9!mL'),
('ethanharris@example.com', '9H6@dM#5L8!S3fK'),
('sophiasanchez@example.com', '2K7#sL6!H9@D5!hM'),
('williamlee@example.com', '6N3#hJ9@L7!K5!fM'),
('victorlopez@example.com', '3G7@hM#4D8!L5!jK'),
('madisonmartinez@example.com', '8K2@nR#5P7!W4!gM'),
('danielrodriguez@example.com', '5M4#jK2@N7!H3!fL'),
('chloecarter@example.com', '1H4!sE#6J7@M5!lR'),
('noahwright@example.com', '7W3#fL6!S2@M9!nR'),
('gracegreen@example.com', '4D5@hN#8K3!J7!fL'),
('samueladams@example.com', '9J6@rL#5D2!M7!hN'),
('lucygarcia@example.com', '2M7!gK8@N3$R5#hJ'),
('andrewbell@example.com', '6N3@hM#9S7$J5#fK'),
('hannahhill@example.com', '3J7!hK#4F8$M5@nR'),
('sebastianyoung@example.com', '8Y2#gH!5S7$M4@nR');
