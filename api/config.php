<?php
// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'root');     // Cambiar por tu usuario de MySQL
define('DB_PASS', 'Evelyn.4771.4771');         // Cambiar por tu contraseña de MySQL
define('DB_NAME', 'juegos_react');

// Configuración de CORS para desarrollo
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Función para conectar a la base de datos
function conectarDB() {
    $conexion = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conexion->connect_error) {
        http_response_code(500);
        echo json_encode(['error' => 'Error de conexión: ' . $conexion->connect_error]);
        exit;
    }
    
    $conexion->set_charset("utf8");
    return $conexion;
} 