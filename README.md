# Centro Médico  

**Contexto:**
Contexto: En este proyecto, se van a aplicar medidas de seguridad avanzadas en la web del hospital desarrollada en ReactJS. Se integrará protección contra ataques comunes, se asegurarán las rutas de la aplicación y protegerán el consumo de APIs utilizando API Key y JWT. Además, se implementará seguridad por roles y autenticación de usuarios para restringir el acceso a áreas específicas de la aplicación.

# 1. Protección de Rutas con React Router DOM
Para restringir el acceso a ciertas rutas en la aplicación, se crea el componente ProtectedRoute que envuelve las rutas que queremos proteger (recibe como prop la ruta que queremos proteger). Este componente verifica si el usuario está autenticado antes de permitirle acceder a la ruta protegida. Si el usuario no está autenticado, lo redirige a una página de inicio de sesión.

# 2. Implementación de Autenticación de Usuarios y Roles
Instrucciones de uso:
Iniciar sesión:
Haz clic en el botón "Iniciar Sesión", ingresa:

Nombre de usuario: usuario
Contraseña: secret123

Ruta protegida: Agendar Cita
Después de iniciar sesión, Agendar Cita estará disponible.

# 3. Consumo de APIs Protegido con API Key y JWT
Para un consumo protegido de APIs, utilicé API Key para verificar la autenticidad del cliente que envía la solicitud y JWT (JSON Web Token) para autenticar usuarios, asegurando que solo clientes autorizados con un token válido puedan acceder a los endpoints.
Pasos para ejecutar:

Inicia tu servidor introduciendo el comando:
node server.js  
Agrega el API Key en el encabezado de la solicitud HTTP:
{  
    "x-api-key": "tu-api-key-aquí"  
}  
Usa una herramienta como Postman o cURL para enviar solicitudes a los endpoints protegidos.
Genera un JWT (tras autenticar al usuario) y envíalo como un encabezado Authorization en forma de Bearer token:
{  
    "Authorization": "Bearer <jwt-token-generado>"  
}  


# 4 Prevención de Vulnerabilidades Comunes
Para prevenir Clickjacking, configuré encabezados HTTP X-Frame-Options en el servidor, estableciéndolos en DENY. Esto bloquea la carga del sitio dentro de iframes externos, evitando intentos de Clickjacking.

Pasos para verificar:

Asegúrate de que el servidor tenga configurado el encabezado X-Frame-Options en el middleware o configuración:
res.setHeader("X-Frame-Options", "DENY");  
Ejecuta el servidor (node server.js) e intenta incrustar el sitio en un iframe desde otro dominio.
El navegador debería bloquear la carga del sitio y evitar la vulnerabilidad de Clickjacking.


# 5. Encriptación de Datos en el Front-End
Usa CryptoJS para encriptar datos sensibles antes de enviarlos al backend.

import CryptoJS from "crypto-js";  

const secretKey = "clave-secreta";  
const password = "123456";  

const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();  
console.log(`Contraseña encriptada: ${encryptedPassword}`);  
Envía los datos encriptados como parte del cuerpo de la solicitud desde el frontend.
En el backend, usa CryptoJS para desencriptar la información con la misma clave secreta y procesar los datos.
