<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 3600");

require_once '../config/database.php';
require_once '../vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

// Manejar solicitud OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["message" => "Método no permitido"]);
    exit();
}

$headers = getallheaders();
$token = null;

if (isset($headers['Authorization'])) {
    $auth_header = $headers['Authorization'];
    $token = str_replace('Bearer ', '', $auth_header);
}

if (!$token) {
    http_response_code(401);
    echo json_encode(["message" => "Token no proporcionado"]);
    exit();
}

try {
    $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
    $user_id = $decoded->data->id;

    $database = new Database();
    $db = $database->getConnection();

    $query = "SELECT u.*, e.xp_total as xp, e.nivel_actual as level 
              FROM usuarios u 
              LEFT JOIN experiencia_usuarios e ON u.id = e.usuario_id 
              WHERE u.id = :id";

    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $user_id);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode([
            "id" => (int)$row['id'],
            "nombre" => $row['nombre'],
            "email" => $row['email'],
            "xp" => (int)$row['xp'],
            "level" => (int)$row['level']
        ]);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Usuario no encontrado"]);
    }
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["message" => "Token inválido"]);
} 