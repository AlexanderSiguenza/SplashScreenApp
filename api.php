<?php

// Conexión a la base de datos utilizando PDO
$dbHost = 'localhost';
$dbName = 'clinica';
$dbUser = 'root';
$dbPass = "";

try {
    $db = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
    exit;
}

// Comprobar el método HTTP utilizado
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
   case 'GET':
		// Manejar la solicitud GET
		$requestUri = $_SERVER['REQUEST_URI'];
		$parsedUrl = parse_url($requestUri);
        //echo "requestUri: ";
        //var_dump($requestUri);
		//echo "parsedUrl: ";
        //var_dump($parsedUrl);
		
		if ($_SERVER['REQUEST_URI'] === '/api/login.php/users') {
			// Obtener todos los usuarios de la base de datos
			$query = "SELECT email, password FROM users";
			$stmt = $db->query($query);
			$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

			// Encriptar las contraseñas antes de devolver la respuesta
			foreach ($users as &$user) {
				$user['password_SIN_HASH'] = $user['password'];
				$user['password'] = password_hash($user['password'], PASSWORD_DEFAULT);
			}
			// Devolver la lista de usuarios en formato JSON
			echo json_encode($users);
		} else {
			// Ruta no válida
			header('HTTP/1.1 404 Not Found');
			echo json_encode(['error' => 'Ruta no válida']);
		}
	break;
    case 'POST':
        // Manejar la solicitud POST
        if ($_SERVER['REQUEST_URI'] === '/api/login.php/login') {
            // Obtener los datos enviados desde el cliente
            $data = $_POST;
            $email = $data['email'];
            $password = $data['password'];

            // Verificar las credenciales del usuario
            $query = "SELECT * FROM users WHERE email = :email";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                // Usuario no encontrado
                header('HTTP/1.1 401 Unauthorized');
                echo json_encode(['error' => 'Credenciales inválidas']);
            } else if (!password_verify($password, $user['password'])) {
                // Contraseña incorrecta
                header('HTTP/1.1 401 Unauthorized');
                echo json_encode(['error' => 'Credenciales inválidas']);
            } else {
                // Generar un token de sesión o realizar cualquier otra acción necesaria
                // ...

                // Devolver una respuesta exitosa
                echo json_encode(['message' => 'Inicio de sesión exitoso']);
            }
        } else if ($_SERVER['REQUEST_URI'] === '/api/login.php/register') {
            // Obtener los datos enviados desde el cliente
            $data = $_POST;
            $email = $data['email'];
            $password = $data['password'];

            // Verificar si el usuario ya existe
            $query = "SELECT * FROM users WHERE email = :email";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existingUser) {
                // El usuario ya está registrado
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['error' => 'El usuario ya existe']);
            } else {
                // Hash de la contraseña
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                // Insertar el nuevo usuario en la base de datos
                $insertQuery = "INSERT INTO users (email, password) VALUES (:email, :password)";
                $insertStmt = $db->prepare($insertQuery);
                $insertStmt->bindParam(':email', $email);                
				$insertStmt->bindParam(':password', $hashedPassword);
                $insertStmt->execute();

                // Devolver una respuesta exitosa
                echo json_encode(['message' => 'Registro exitoso']);
            }
        } else {
            // Ruta no válida
            header('HTTP/1.1 404 Not Found');
            echo json_encode(['error' => 'Ruta no válida']);
        }
        break;

    default:
        // Método HTTP no válido
        header('HTTP/1.1 405 Method Not Allowed');
        echo json_encode(['error' => 'Método HTTP no válido']);
        break;
}

// Otros endpoints y rutas de tu API
// ...

?>
