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