# M6EP2 Almacenamiento y Análisis de PWA en la Web del Hospital

**Contexto:**
En este ejercicio práctico se van a utilizar opciones de almacenamiento web dentro de la web del hospital convertida en PWA, utilizando
LocalStorage, SessionStorage o IndexedDB. Además, se ejecutarán pruebas con Lighthouse para validar el rendimiento y estado de la PWA.

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



# 1. Implementación de Almacenamiento Web 
✅ Configura un sistema de almacenamiento para la PWA del hospital usando LocalStorage o SessionStorage.

Para poder implementar este requerimiento se crea una versiòn en inglès de la web, asegurando que el idioma se pueda cambiar y almacenar en el localStorage.

**Ajustes realizados:**

Creación del LanguageContext: Para gestionar el estado del idioma a través de toda la aplicación.

Modificación de App.tsx: Para envolver la aplicación en el LanguageProvider.

Actualización de Navbar.tsx: Para usar el contexto de idioma, lo que permite que el menú de navegación y el contenido cambien juntos.

Actualización de Home.tsx: Para que al usar el contexto de idioma, el contenido de la página de inicio se traduzca correctamente según el idioma seleccionado.

✅  De esta manera el idioma seleccionado persiste después de recargar la página.
