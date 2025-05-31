<?php

require_once dirname(__DIR__) . '/core/TemplateEngine.php';
const BASE_URL = '/';

spl_autoload_register(function ($class) {
    $baseDir = dirname(__DIR__);
    $path = $baseDir . '/' . str_replace('\\', '/', $class) . '.php';

    if (file_exists($path)) {
        require_once $path;
    }
});

// Obtener la ruta
$uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$parts = explode('/', $uri);

// Asignar controlador y método por defecto
$controller = !empty($parts[0]) ? ucfirst($parts[0]) . 'Controller' : 'HomeController';
$method = $parts[1] ?? 'index';

// Namespace completo del controlador
$controllerFQN = "controllers\\$controller";

// Ejecutar
if (class_exists($controllerFQN) && method_exists($controllerFQN, $method)) {
    call_user_func([$controllerFQN, $method]);
} else {
    http_response_code(404);
    echo "Página no encontrada";
}
