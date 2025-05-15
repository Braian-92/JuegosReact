<?php
header('Content-Type: application/json');
echo json_encode([
    'status' => 'ok',
    'message' => 'PHP está funcionando',
    'php_version' => phpversion(),
    'server_path' => __DIR__
]); 