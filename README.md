# Centro Médico  

**Contexto:**
Contexto: En este proyecto, se van a aplicar medidas de seguridad avanzadas en la web del hospital desarrollada en ReactJS. Se integrará protección contra ataques comunes, se asegurarán las rutas de la aplicación y protegerán el consumo de APIs utilizando API Key y JWT. Además, se implementará seguridad por roles y autenticación de usuarios para restringir el acceso a áreas específicas de la aplicación.

# 1. Protección de Rutas con React Router DOM
Para restringir el acceso a ciertas rutas en la aplicación, se crea el componente ProtectedRoute que envuelve las rutas que queremos proteger (recibe como prop la ruta que queremos proteger). Este componente verifica si el usuario está autenticado antes de permitirle acceder a la ruta protegida. Si el usuario no está autenticado, lo redirige a una página de inicio de sesión.