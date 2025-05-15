<?php
require_once 'config.php';

// Si no es una petición POST, retornar error
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Obtener datos del cuerpo de la petición
$datos = json_decode(file_get_contents('php://input'), true);

// Validar datos requeridos
if (!isset($datos['usuario_id']) || !isset($datos['juego_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos requeridos']);
    exit;
}

try {
    $db = conectarDB();
    
    // Actualizar progreso del juego
    $stmt = $db->prepare("
        INSERT INTO progreso_juegos 
            (usuario_id, juego_id, palabras_completadas, errores, mejor_racha) 
        VALUES 
            (:usuario_id, :juego_id, :palabras_completadas, :errores, :mejor_racha)
        ON DUPLICATE KEY UPDATE
            palabras_completadas = palabras_completadas + :palabras_completadas,
            errores = errores + :errores,
            mejor_racha = GREATEST(mejor_racha, :mejor_racha),
            ultima_jugada = CURRENT_TIMESTAMP
    ");

    $stmt->execute([
        ':usuario_id' => $datos['usuario_id'],
        ':juego_id' => $datos['juego_id'],
        ':palabras_completadas' => $datos['palabras_completadas'] ?? 0,
        ':errores' => $datos['errores'] ?? 0,
        ':mejor_racha' => $datos['mejor_racha'] ?? 0
    ]);

    // Si hay palabras completadas, guardarlas
    if (isset($datos['palabras']) && is_array($datos['palabras'])) {
        $stmt = $db->prepare("
            INSERT INTO palabras_completadas 
                (usuario_id, palabra, intentos) 
            VALUES 
                (:usuario_id, :palabra, :intentos)
        ");

        foreach ($datos['palabras'] as $palabra) {
            $stmt->execute([
                ':usuario_id' => $datos['usuario_id'],
                ':palabra' => $palabra['texto'],
                ':intentos' => $palabra['intentos'] ?? 1
            ]);
        }
    }

    // Actualizar XP y nivel del usuario
    if (isset($datos['xp_ganada']) && $datos['xp_ganada'] > 0) {
        $stmt = $db->prepare("
            UPDATE usuarios 
            SET xp = xp + :xp_ganada,
                nivel = FLOOR(xp / 100) + 1
            WHERE id = :usuario_id
        ");

        $stmt->execute([
            ':usuario_id' => $datos['usuario_id'],
            ':xp_ganada' => $datos['xp_ganada']
        ]);
    }

    // Obtener datos actualizados del usuario
    $stmt = $db->prepare("
        SELECT id, nombre, nivel, xp 
        FROM usuarios 
        WHERE id = :usuario_id
    ");
    $stmt->execute([':usuario_id' => $datos['usuario_id']]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        'mensaje' => 'Progreso guardado correctamente',
        'usuario' => $usuario
    ]);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar el progreso: ' . $e->getMessage()]);
} 