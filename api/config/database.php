<?php
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Configuración de la base de datos
define('DB_HOST', 'mysql'); // Nombre del servicio MySQL en Docker
define('DB_PORT', 3306);    // Puerto por defecto de MySQL
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'juegos_react');

// Configuración de CORS para desarrollo
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

class Database {
    private $host;
    private $port;
    private $db_name;
    private $username;
    private $password;
    private $conn;

    public function __construct() {
        $this->host = DB_HOST;
        $this->port = DB_PORT;
        $this->db_name = DB_NAME;
        $this->username = DB_USER;
        $this->password = DB_PASS;
    }

    public function getConnection() {
        $this->conn = null;

        try {
            // Intentar conexión con un timeout más largo
            $this->conn = mysqli_init();
            $this->conn->options(MYSQLI_OPT_CONNECT_TIMEOUT, 10);
            
            if (!$this->conn->real_connect($this->host, $this->username, $this->password, $this->db_name, $this->port)) {
                throw new Exception("Error de conexión: " . $this->conn->connect_error);
            }
            
            $this->conn->set_charset("utf8");
            return $this->conn;
            
        } catch(Exception $exception) {
            error_log("Error de conexión: " . $exception->getMessage());
            return null;
        }
    }
} 