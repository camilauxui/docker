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

✅ Ejecuta el siguiente comando en tu terminal para iniciar la bbdd:

 json-server --watch db.json --port 3001

http://localhost:3001/doctors

✅ Luego ejecuta en un nuevo terminal para levantar el sitio:   

npm run dev

Local:   http://localhost:5173/

## Datos para iniciar sesión y poder agendar cita mèdica

Ruta protegida: Agendar Cita

✅ Después de iniciar sesión, "Agendar Cita" estará disponible.

✅ En el formulario se carga de  manera dinàmica la lista de doctores que recibe desde la API


## Operaciones CRUD:

Se usa Axios para interactuar con la base de datos del hospital

#### GET: 
La función fetchDoctors está configurada para realizar una solicitud GET y devolver la lista de doctores. 

 
#### POST: 
La función createAppointment utiliza apiRequest para realizar una solicitud POST, lo cual está bien implementado.


#### PUT: 
La función updateAppointment también está correctamente configurada para actualizar citas.


#### DELETE: 
La función deleteAppointment permite eliminar una cita, lo cual es esencial para la gestión de citas.


# 2. Integración de TypeScript en Componentes Clave
Para mejorar la calidad del código y facilitar la depuración, se ha implementado TypeScript
## Pasos realizados:
Instalar TypeScript y las definiciones de tipos necesarias:

npm install typescript @types/react @types/react-dom @types/react-router-dom

✅ cambiar la extensiòn y  adaptar  còdigo a .tsx

Proyecto con archivos actualizados:

EP2/  
├── package.json  
├── db.json  
├── index.html  
├── package-lock.json  
├── server.js  
├── tsconfig.json  
├── vite.config.js  
└── src/  
    ├── assets/  (imágenes)  
    ├── components/  
    │   ├── contexts/  
    │   │   ├── AuthContext.tsx  
    │   │   └── DoctorContext.tsx  
    │   ├── AppointmentForm.tsx  
    │   ├── DoctorCard.tsx  
    │   ├── DoctorList.tsx  
    │   ├── ServiceList.tsx   
    │   ├── ServiceData.tsx 
    │   ├── withForm.tsx      
    │   ├── LoginForm.tsx
    │   ├── Footer.tsx            
    │   ├── Navbar.tsx           
    │   ├── ProtectedRoute.tsx 
    │   └── hooks/  
    │       ├── AuthHooks.tsx  
    │       └── useAppointmentForm.tsx  
    ├── services/  
    │   ├── apiService.ts   
    │   └── DataService.jsx   
    ├── types/  
    │   ├── images.d.ts  
    │   └── interfaces.d.ts  
    ├── views/  
    │   ├── Home.tsx       
    │   └── TeamView.tsx   
    ├── App.tsx  
    ├── main.tsx 
    ├── App.css  
    └── public/  
        └── data/  
            └── doctors.json


# 3. Mejoras de seguridad, implementar la protección de la API con JWT, considerando que la base de datos (db.json) es simulada:
Pasos realizados
Descargar las dependencias: 

npm install jsonwebtoken bcryptjs express cors react-router-dom jwt-decode  

- se corrige server.js
JWT_SECRET = clave_secreta_muy_segura
Este código crea las rutas /register y /login para registrar y autenticar usuarios. También define el middleware authenticateToken para proteger rutas, y proporciona rutas protegidas para doctores y citas.

- se modifica AuthContext.tsx
Este código crea un contexto para manejar el estado de autenticación (token, usuario, isLoggedIn, login, logout). 
Guarda el token en localStorage.

- se modificaLoginForm.tsx
Este código define un formulario de inicio de sesión que llama a la API /login y guarda el token en el contexto de autenticación.

- Se modifica apiService.ts
Este código define un servicio para hacer peticiones a la API, agregando el token de autenticación al encabezado Authorization si requireAuth es true.

- Se modifica App.tsx

### Resumen de los componentes clave y su interacción:

✅ LoginForm.tsx: Maneja el formulario de inicio de sesión, envía las credenciales al backend, recibe el JWT y lo guarda en el contexto de autenticación.

✅ AuthContext.tsx: Proporciona el contexto de autenticación, almacena el token JWT, gestiona el estado de inicio de sesión, y proporciona las funciones login y logout. También sincroniza el token entre el estado del contexto y localStorage.

✅ ProtectedRoute.tsx: Protege las rutas, verifica si el usuario está autenticado y redirige a los usuarios no autenticados a la página de inicio de sesión.

✅ apiService.ts: Encapsula la lógica para hacer peticiones a la API, añade el header Authorization a las peticiones protegidas, y maneja los errores de autenticación.

✅ Backend (API): Recibe las credenciales, verifica las credenciales en la base de datos, genera el JWT, recibe las peticiones con el JWT, verifica el JWT y devuelve los datos solicitados.

______________________________________________

### ✅ USUARIOS PARA LOGIN
Puedes usar cualquiera de estos usuarios para iniciar sesión.


 ✅ username: usuario1

 password: password1

 name: Usuario Test

 *************************** 
  
✅ username: admin

password: password2

name: Administrador
______________________________________________

## Asegura la validación de formularios para evitar XSS y otros ataques comunes.
#### Integra encriptación para proteger la información confidencial antes de enviarla al servidor.

✅ Beneficios Implementados:

#### Prevención de ataques XSS, SQL Injection y entrada de datos inválidos.
Sanidad y limpieza de datos antes de enviarlos al servidor.

#### Confidencialidad de datos sensibles:

✅ Las contraseñas no se envían en texto plano.

✅ La información personal como correos electrónicos y números de teléfono se encripta para evitar exposición ante posibles ataques.

✅ Validaciones robustas y protección de datos antes del envío al servidor garantizan una experiencia más segura para los usuarios.

# 4. Optimización con Hooks y Manejo de Errores

✅ La aplicación utiliza Hooks como useState para manejar el estado local dentro de los componentes, como entradas de formularios, estado de carga, confirmaciones y mensajes de error.

✅ Se emplea useEffect para gestionar efectos secundarios, como la recuperación de datos desde una API externa (por ejemplo, la lista de doctores), y para ejecutar lógica al montar componentes.