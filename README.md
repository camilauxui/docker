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

#### Nombre de usuario: usuario

#### Contraseña: secret123

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

Proyecto:

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