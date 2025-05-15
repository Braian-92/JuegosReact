<?php
require_once 'config.php';

// Si no es una petición GET, retornar error
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Obtener ID del usuario
$usuario_id = $_GET['usuario_id'] ?? null;

if (!$usuario_id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID de usuario requerido']);
    exit;
}

try {
    $db = conectarDB();
    
    // Obtener datos del usuario
    $stmt = $db->prepare("
        SELECT id, nombre, nivel, xp 
        FROM usuarios 
        WHERE id = :usuario_id
    ");
    $stmt->execute([':usuario_id' => $usuario_id]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        http_response_code(404);
        echo json_encode(['error' => 'Usuario no encontrado']);
        exit;
    }

    // Obtener progreso de todos los juegos
    $stmt = $db->prepare("
        SELECT juego_id, palabras_completadas, errores, mejor_racha, ultima_jugada
        FROM progreso_juegos
        WHERE usuario_id = :usuario_id
    ");
    $stmt->execute([':usuario_id' => $usuario_id]);
    $progreso_juegos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Obtener últimas palabras completadas
    $stmt = $db->prepare("
        SELECT palabra, intentos, fecha_completada
        FROM palabras_completadas
        WHERE usuario_id = :usuario_id
        ORDER BY fecha_completada DESC
        LIMIT 10
    ");
    $stmt->execute([':usuario_id' => $usuario_id]);
    $ultimas_palabras = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'usuario' => $usuario,
        'progreso_juegos' => $progreso_juegos,
        'ultimas_palabras' => $ultimas_palabras
    ]);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener el progreso: ' . $e->getMessage()]);
} 