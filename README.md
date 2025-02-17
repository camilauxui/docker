# Mejorando la Web del Hospital con APIs, TypeScript, y Seguridad

**Contexto:**
En este proyecto se aplicarán las herramientas avanzadas para mejorar y optimizar la web del hospital. 
Se utilizarán Fetch API o Axios para gestionar el consumo de datos de APIs, se integrarán TypeScript para asegurar el tipado y estructura del
código, se reforzarán la seguridad del front-end y gestionarán los errores de manera eficiente. 
El objetivo es que la web del hospital funcione de manera fluida, segura y con una estructura bien organizada.

# 1. Consumo de APIs usando Fetch API o Axios

✅Implementa el consumo de datos mediante Fetch API o Axios para interactuar con la base de datos del hospital:
- Gestiona los datos de pacientes, citas y doctores mediante solicitudes GET,POST, PUT, y DELETE.
- Muestra los datos obtenidos en la interfaz React de manera dinámica.
- Maneja correctamente los errores de las peticiones y muestra mensajes claros al usuario si ocurre un problema.

## Pasos realizados:

✅1. Instalar Axios:   npm install axios

✅2.Instalar JSON Server:  npm install -g json-server  

Para crear una API sencilla usando los datos de los médicos

✅ Se crea el archivo db.json

✅ Ejecuta el siguiente comando en tu terminal: json-server --watch db.json --port 3001

### Endpoints:

http://localhost:3001/doctors

✅ Ejecuta en un nuevo terminal:   npm run dev

Local:   http://localhost:5173/

## LOGIN
### Nombre de usuario: usuario

### Contraseña: secret123

Ruta protegida: Agendar Cita

Después de iniciar sesión, "Agendar Cita" estará disponible.