# M6EP3 Implementación Completa de PWA en la Web del Hospital

**Contexto:**
implementar
una PWA completa para la web del hospital. El proyecto deberá hacer uso de ReactJS y
aprovechar al máximo las características de PWA, incluyendo almacenamiento web avanzado,
estrategias de Service Worker, y análisis de rendimiento y accesibilidad con Lighthouse. A su
vez, se integrarán nuevas funcionalidades de uso de periféricos del sistema operativo,
accesos a APIs externas, y una estrategia avanzada de despliegue en un servidor.

___________________________________________________________________________

✅ USUARIOS PARA LOGIN
Puedes usar cualquiera de estos usuarios para iniciar sesión.

✅ username: usuario1

password: password1

name: Usuario Test
_______________________

✅ username: admin

password: password2

name: Administrador



# 1. Creación del Manifiesto y Configuración Inicial
✅ Crear el archivo de manifiesto de la aplicación que permita su instalación en dispositivos móviles:
- El manifest cumple con lo requerido: Incluir el nombre, iconos adaptativos en varias resoluciones, tema de color modo pantalla (fullscreen/standalone).
- Asegurar que la aplicación sea reconocida como PWA y se pueda instalar.

**Ajustes realizados al manifest, archivo vite.config.js:**

✅ Agregado scope: Esta propiedad define el ámbito de la aplicación. En este caso, se establece en "./" para que la aplicación opere dentro del directorio raíz.

✅ Añadido orientation: Se puede especificar la orientación preferida de la aplicación. He utilizado "portrait" porque el diseño funciona mejor en sentido vertical

✅Service Worker: Se está registrando correctamente, lo que permite funcionalidades como el funcionamiento offline y la gestión de caché.

✅Los usuarios pueden ver el ícono de instalación en el navegador y completar el proceso para instalarlo o desinstalarlo como aplicaciòn.


# 2. Integración de Service Worker para Gestión Avanzada de Caché
- Configurar un Service Worker avanzado:
- Precaching para los recursos principales de la PWA (HTML, CSS, JS).

**Cambios Realizados:**
- Archivo sw.js

✅Precaching de Recursos Clave: He reorganizado la sección de precaching para incluir explícitamente los recursos principales claves (por ejemplo, /index.html, /style.css, y /main.js). Esto garantiza que estos archivos fundamentales estén disponibles en el caché desde el principio.

En el archivo original, el evento 'install' estaba duplicado, lo corregì.

- Implementar al menos tres estrategias de almacenamiento en caché 

✅ Estrategia Cache First:

Se implementa para archivos estáticos como HTML, CSS, y JS. Si existe una respuesta en caché, se devuelve, de lo contrario, se realiza una solicitud a la red.

✅ Estrategia Network First:

Se implementa para solicitudes a datos dinámicos, como APIs. Se intenta primero hacer la solicitud a la red. Si tiene éxito, se almacena en caché, y si falla, se busca en la caché.

✅ Estrategia Stale-While-Revalidate:

Se utiliza para imágenes, donde primero se intenta devolver la respuesta en caché si existe, mientras que se realiza una solicitud a la red en segundo plano para actualizar la caché. Esto asegura que se muestra rápidamente el contenido mientras se actualiza.

- Implementar la gestión del ciclo de vida del Service Worker, garantizando la ctualización de la caché cuando se publiquen nuevas versiones de la PWA.

✅ self.clients.claim(): Se añadió esta línea para asegurar de que el nuevo Service Worker controla inmediatamente todas las páginas (clientes) abiertas después de activarse. Esto permite que los usuarios comiencen a usar la nueva caché sin necesidad de refrescar.

Al usar caches.match y fetch, el código ya maneja una estrategia de actualización en cache. Si un recurso está cacheado y el archivo en la red ha cambiado, fetch actualizará automáticamente la caché con la nueva versión.

✅  Detectar una Nueva Versión en el Service Worker: 

Necesitamos verificar cuando se activa un nuevo Service Worker y, si hay uno nuevo, notificar al usuario.

✅ Mostrar Mensaje a los Usuarios: 
que informe que hay una nueva versión de la PWA disponible y que pueden refrescar para obtenerla.

En el sw.js:

Se añadió self.skipWaiting() para que los nuevos Service Workers activen inmediatamente.


En el main.tsx:

Se añadió lógica para escuchar los cambios en el Service Worker y notificar al usuario cuando hay una nueva versión disponible. 
Se muestra una 

# Acceso a Periféricos del Sistema Operativo 

- Cámara: Permitir la captura de imágenes 
✅ En mi App añadi en el popup para en login la captura de imagen que luego aparece en el navbar junto al nombre del usuario como su avatar.

apiService.ts: Se mejoró el manejo de errores y se implementó la función fetchDoctors.
DoctorContext.tsx: Se configuró para cargar doctores desde la API y manejar errores.
DoctorList.tsx: Se añadió la lógica para mostrar un mensaje de error si ocurre un problema al cargar los doctores

# 4. Consumo de API Externa para Datos Médicos
Axios o Fetch API para consumir la API.
Dentro de apiService.ts, las llamadas a la API se realizan utilizando fetch.

// Función para obtener la lista de doctores  
export const fetchDoctors = async () => {  
    const endpoint = '/doctors'; // Endpoint para obtener doctores  
    return get<any[]>(endpoint, true);  
};  

## Manejo de Errores en apiService.ts

**El archivo apiService.ts implementa un manejo de errores para las solicitudes a la API.** 

✅ Detección de Errores HTTP: Se verifica el estado de la respuesta. Si no es exitoso (códigos 401 o 403), se muestra una alerta y se elimina el token de sesión.

✅  Análisis de JSON: Se maneja de manera específica cualquier error que ocurra al intentar parsear la respuesta JSON. Se captura el error y se muestra un mensaje al usuario.

✅  Uso de Alertas: se utiliza alert para informar a los usuarios sobre errores de conexión

✅ Registro de Errores: Cada error se registra en la consola para facilitar la depuración y el seguimiento de problemas en la aplicación.


# Pruebas de Rendimiento y Optimización con Lighthouse
EP2/src/assets/report_lighthouse2.png