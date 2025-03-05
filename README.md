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

✅El componente ProtectedRoute estará obteniendo el estado de autenticación actualizado del AuthContext, al guardar el token en localStorage, el usuario permanecerá autenticado incluso después de recargar la página.

# 2.Implementación de IndexedDB 
- Implementa una base de datos con IndexedDB o una biblioteca como PouchDB para manejar datos más complejos o a mayor escala:

- Almacena en IndexedDB datos relevantes como información de citas, doctores o pacientes del hospital.

- Asegúrate de que los datos sean almacenados y recuperados correctamente de IndexedDB.

<img src="https://github.com/camilauxui/Integrac-Completa-CentroMedico-con-ReactJS/blob/M6EP2/src/assets/IdexedDB.png" width="300">