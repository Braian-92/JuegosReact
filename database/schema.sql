-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS juegos_react;
USE juegos_react;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Para almacenar el hash de la contraseña
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de experiencia de usuarios
CREATE TABLE IF NOT EXISTS experiencia_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    xp_total INT DEFAULT 0,
    nivel_actual INT DEFAULT 1,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de niveles y experiencia requerida
CREATE TABLE IF NOT EXISTS niveles (
    nivel INT PRIMARY KEY,
    xp_requerida INT NOT NULL,
    descripcion VARCHAR(100)
);

-- Insertar niveles base (del 1 al 10 como ejemplo)
INSERT INTO niveles (nivel, xp_requerida, descripcion) VALUES
(1, 0, 'Principiante'),
(2, 100, 'Aprendiz'),
(3, 250, 'Estudiante'),
(4, 500, 'Practicante'),
(5, 1000, 'Aventurero'),
(6, 2000, 'Explorador'),
(7, 3500, 'Experto'),
(8, 5000, 'Maestro'),
(9, 7500, 'Sabio'),
(10, 10000, 'Legendario');

-- Insertar usuarios de ejemplo
INSERT INTO usuarios (nombre, email, password) VALUES
('Usuario Demo 1', 'demo1@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'), -- password: 'password'
('Usuario Demo 2', 'demo2@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'); -- password: 'password'

-- Insertar experiencia inicial para usuarios demo
INSERT INTO experiencia_usuarios (usuario_id, xp_total, nivel_actual) VALUES
(1, 150, 2),
(2, 50, 1);

-- Tabla de progreso de juegos
CREATE TABLE IF NOT EXISTS progreso_juegos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    juego_id VARCHAR(20) NOT NULL,
    palabras_completadas INT DEFAULT 0,
    errores INT DEFAULT 0,
    mejor_racha INT DEFAULT 0,
    ultima_jugada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de palabras completadas
CREATE TABLE IF NOT EXISTS palabras_completadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    palabra VARCHAR(50) NOT NULL,
    fecha_completada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    intentos INT DEFAULT 1,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Índices para mejor rendimiento
CREATE INDEX idx_usuario_email ON usuarios(email);
CREATE INDEX idx_exp_usuario ON experiencia_usuarios(usuario_id);
CREATE INDEX idx_usuario_juego ON progreso_juegos(usuario_id, juego_id);
CREATE INDEX idx_palabras_usuario ON palabras_completadas(usuario_id); 