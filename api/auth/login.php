<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../vendor/autoload.php';

use \Firebase\JWT\JWT;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Método no permitido"]);
    exit();
}

// Crear conexión usando la clase Database
$database = new Database();
$conexion = $database->getConnection();

if (!$conexion) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión a la base de datos']);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(["message" => "Datos incompletos"]);
    exit();
}

$query = "SELECT u.*, e.xp_total as xp, e.nivel_actual as level 
          FROM usuarios u 
          LEFT JOIN experiencia_usuarios e ON u.id = e.usuario_id 
          WHERE u.email = ?";

$stmt = $conexion->prepare($query);
$stmt->bind_param("s", $data->email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    if (password_verify($data->password, $row['password'])) {
        $token = [
            "iat" => time(),
            "exp" => time() + (24 * 60 * 60), // 24 horas
            "data" => [
                "id" => $row['id'],
                "email" => $row['email']
            ]
        ];

        $jwt = JWT::encode($token, 'tu_clave_secreta_aqui', 'HS256');

        http_response_code(200);
        echo json_encode([
            "message" => "Login exitoso",
            "token" => $jwt,
            "user" => [
                "id" => $row['id'],
                "nombre" => $row['nombre'],
                "email" => $row['email'],
                "xp" => (int)$row['xp'],
                "level" => (int)$row['level']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Credenciales inválidas"]);
    }
} else {
    http_response_code(401);
    echo json_encode(["message" => "Credenciales inválidas"]);
}

$stmt->close();
$conexion->close(); 