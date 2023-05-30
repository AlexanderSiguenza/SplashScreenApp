<?php
// Establecer variables de conexión a la base de datos
$host = "localhost";
$dbname = "clinica";
$username = "root";
$password = "";

// Establecer credenciales para la autenticación básica
$auth_username = "admin";
$auth_password = "admin123";

// Obtener las credenciales de autenticación del encabezado HTTP
/*
if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])
    || $_SERVER['PHP_AUTH_USER'] != $auth_username || $_SERVER['PHP_AUTH_PW'] != $auth_password) {
    header('HTTP/1.1 401 Unauthorized');
    header('WWW-Authenticate: Basic realm="Acceso restringido"');
    exit;
}
*/

// Conectar a la base de datos
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// Establecer el encabezado de respuesta a JSON
header('Content-Type: application/json');

// Comprobar el método HTTP utilizado
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        // Obtener un paciente específico o todos los pacientes
        if (isset($_GET['id'])) {
            // Obtener un paciente específico
            $stmt = $pdo->prepare("SELECT * FROM pacientes WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $paciente = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($paciente);
        } else {
            // Obtener todos los pacientes
            $stmt = $pdo->query("SELECT * FROM pacientes order by id desc");
            $pacientes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($pacientes);
        }
        break;
    case 'POST':
        // Crear un nuevo paciente
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO pacientes (nombre, apellido, edad, direccion, telefono) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$data['nombre'], $data['apellido'], $data['edad'], $data['direccion'], $data['telefono']]);
        $paciente_id = $pdo->lastInsertId();
        $paciente = [
            'id' => $paciente_id,
            'nombre' => $data['nombre'],
            'apellido' => $data['apellido'],
            'edad' => $data['edad'],
            'direccion' => $data['direccion'],
            'telefono' => $data['telefono']
        ];
        echo json_encode($paciente);
        break;
    case 'PUT':
         $data = json_decode(file_get_contents('php://input'), true);
         if ($data['edad']==-987) {
            $stmt = $pdo->prepare("DELETE FROM pacientes WHERE id = ?");
            $stmt->execute([$data['id']]);
            echo json_encode(['mensaje' => 'El paciente ha sido eliminado correctamente.']);          
         } else {
           // Actualizar un paciente existente              
           $stmt = $pdo->prepare("UPDATE pacientes SET nombre = ?, apellido = ?, edad = ?, direccion = ?, telefono = ? WHERE id = ?");
           $stmt->execute([$data['nombre'], $data['apellido'], $data['edad'], $data['direccion'], $data['telefono'], $data['id']]);					  
			$paciente = [
			'id' => $data['id'],
			'nombre' => $data['nombre'],
			'apellido' => $data['apellido'],
			'edad' => $data['edad'],
			'direccion' => $data['direccion'],
			'telefono' => $data['telefono']
			];
			echo json_encode($paciente);
		}
		break;
	case 'DELETE':
		// Eliminar un paciente existente
		if (isset($_GET['id'])) {
		   $stmt = $pdo->prepare("DELETE FROM pacientes WHERE id = ?");
		   $stmt->execute([$_GET['id']]);
		   echo json_encode(['mensaje' => 'success']);
		  }else {
			// Error: no se ha proporcionado un ID de paciente para actualizar
			header('HTTP/1.1 400 Bad Request');
			echo json_encode(['error' => 'No se proporcionado un ID de paciente para actualizar']);
		  }
		break;
		default:
			// Método HTTP no válido
			header('HTTP/1.1 405 Method Not Allowed');
			echo json_encode(['error' => 'Método HTTP no válido']);
		break;
		}

		//Cerrar la conexión con la base de datos
		$pdo = null;		
		
		?>